import * as vscode from "vscode"
import { filterTree, textMatches } from "../tree-filter/tree-filter.module.code.ts"

const OPEN_COMMAND = "vscode.open"

export interface PageTreeView {
  readonly provider: vscode.TreeDataProvider<PageTreeRow>
  readonly replace: (roots: readonly PageTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

// THE ROW THE FILE CARRIES IS THE ROW DRAWN, WITH NOTHING SPELLED AGAIN BETWEEN THE TWO. The file
// and the panel once differed over one field name, and five thousand rows were built again on the
// thread that draws them to rename it.
export function createPageTree(): PageTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly PageTreeRow[] = []
  let pattern = ""
  let narrowed: readonly PageTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<PageTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.label, node.detail),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<PageTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: PageTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: PageTreeRow) => buildTreeItem(element, narrowed !== undefined),
  }

  return {
    provider,
    replace: (next: readonly PageTreeRow[]) => {
      held = next
      narrow()
      emitter.fire(undefined)
      return undefined
    },
    filter: (next: string) => {
      if (next === pattern) {
        return undefined
      }
      pattern = next
      narrow()
      emitter.fire(undefined)
      return undefined
    },
    matchCount: () => matched,
    dispose: () => {
      emitter.dispose()
      return undefined
    },
  }
}

function buildTreeItem(element: PageTreeRow, filtering: boolean): vscode.TreeItem {
  const item = new vscode.TreeItem(
    element.label,
    element.children.length === 0
      ? vscode.TreeItemCollapsibleState.None
      : filtering
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.Collapsed
  )
  item.id = filtering ? `filtered:${element.key}` : element.key
  item.count = element.children.length === 0 ? undefined : element.children.length
  item.description = element.detail ?? undefined
  item.tooltip = [element.label, element.detail, element.at]
    .filter((line): line is string => line !== null)
    .join("\n")
  if (element.at !== null) {
    item.command = {
      command: OPEN_COMMAND,
      title: "Open this document",
      arguments: [vscode.Uri.file(element.at), { preview: true }],
    }
  }
  return item
}
