import { relative } from "node:path"
import {
  filterTree,
  textMatches,
} from "akasha/code/editor/extension/modules/tree-filter/tree-filter.module.code.ts"
import * as vscode from "vscode"
import "akasha/alan/harness/code-editor/data-interface/pages/refusal-tree/refusal-tree.code-editor-data-interface.d.ts"

const OPEN_COMMAND = "vscode.open"

const NO_DOCUMENT = "this row opens no document"

const ONE = "1 refusal beneath"

interface RefusalTreeView {
  readonly provider: vscode.TreeDataProvider<RefusalTreeRow>
  readonly replace: (roots: readonly RefusalTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

export function createRefusalTree(root: string): RefusalTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly RefusalTreeRow[] = []
  let pattern = ""
  let narrowed: readonly RefusalTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<RefusalTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.label),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<RefusalTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: RefusalTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: RefusalTreeRow) =>
      buildTreeItem(element, root, narrowed !== undefined, (narrowed ?? held).includes(element)),
  }

  return {
    provider,
    replace: (next: readonly RefusalTreeRow[]) => {
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

function beneath(refusals: number): string {
  return refusals === 1 ? ONE : `${refusals} refusals beneath`
}

function buildTreeItem(
  element: RefusalTreeRow,
  root: string,
  filtering: boolean,
  atTop: boolean
): vscode.TreeItem {
  const item = new vscode.TreeItem(
    element.label,
    element.children.length === 0
      ? vscode.TreeItemCollapsibleState.None
      : atTop || filtering
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.Collapsed
  )
  item.id = filtering ? `filtered:${element.key}` : element.key
  item.count = element.refusals === 0 ? undefined : element.refusals
  item.tooltip = [
    element.label,
    element.refusals === 0 ? element.key : beneath(element.refusals),
    element.at === null ? NO_DOCUMENT : relative(root, element.at),
  ].join("\n")
  if (element.at !== null) {
    item.command = {
      command: OPEN_COMMAND,
      title: "Open the page whose definition is refused",
      arguments: [vscode.Uri.file(element.at), { preview: true }],
    }
  }
  return item
}
