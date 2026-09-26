import type { WorldTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/world-tree/world-tree.code-editor-data-interface.code.ts"
import {
  filterTree,
  textMatches,
} from "akasha/code/editor/extension/modules/tree-filter/tree-filter.module.code.ts"
import { OPEN_COMMAND } from "akasha/code/editor/extension/modules/world-tree-ids/world-tree-ids.module.code.ts"
import * as vscode from "vscode"

interface WorldTreeView {
  readonly provider: vscode.TreeDataProvider<WorldTreeRow>
  readonly replace: (roots: readonly WorldTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

export function createWorldTree(): WorldTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly WorldTreeRow[] = []
  let pattern = ""
  let narrowed: readonly WorldTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<WorldTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.label),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<WorldTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: WorldTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: WorldTreeRow) =>
      buildTreeItem(element, narrowed !== undefined, (narrowed ?? held).includes(element)),
  }

  return {
    provider,
    replace: (next: readonly WorldTreeRow[]) => {
      held = next
      narrow()
      emitter.fire(undefined)
      return undefined
    },
    filter: (next: string) => {
      if (next === pattern) return undefined
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

function buildTreeItem(element: WorldTreeRow, filtering: boolean, atTop: boolean): vscode.TreeItem {
  const item = new vscode.TreeItem(
    element.label,
    element.children.length === 0
      ? vscode.TreeItemCollapsibleState.None
      : atTop || filtering
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.Collapsed
  )
  item.id = filtering ? `filtered:${element.key}` : element.key
  item.count = element.children.length === 0 ? undefined : element.children.length
  item.tooltip = `${element.label}\n${element.url}`
  item.command = {
    command: OPEN_COMMAND,
    title: "Open this page in the browser",
    arguments: [element.url],
  }
  return item
}
