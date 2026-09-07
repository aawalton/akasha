import * as vscode from "vscode"
import { filterTree, textMatches } from "../tree-filter/tree-filter.module.code.ts"

const OPEN_COMMAND = "vscode.open"

export interface CommandTreeView {
  readonly provider: vscode.TreeDataProvider<CommandTreeRow>
  readonly replace: (roots: readonly CommandTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

export function createCommandTree(): CommandTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly CommandTreeRow[] = []
  let pattern = ""
  let narrowed: readonly CommandTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<CommandTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.called, node.detail),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<CommandTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: CommandTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: CommandTreeRow) => buildTreeItem(element, narrowed !== undefined),
  }

  return {
    provider,
    replace: (next: readonly CommandTreeRow[]) => {
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

function buildTreeItem(element: CommandTreeRow, filtering: boolean): vscode.TreeItem {
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
  item.contextValue = element.kind
  item.tooltip = [`akasha ${element.called}`, element.detail, element.at]
    .filter((line): line is string => line !== null)
    .join("\n")
  if (element.at !== null) {
    item.command = {
      command: OPEN_COMMAND,
      title: "Open this page",
      arguments: [vscode.Uri.file(element.at), { preview: true }],
    }
  }
  return item
}
