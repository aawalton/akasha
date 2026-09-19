import { relative } from "node:path"
import {
  filterTree,
  textMatches,
} from "akasha/code/editor/extension/modules/tree-filter/tree-filter.module.code.ts"
import * as vscode from "vscode"

const OPEN_COMMAND = "vscode.open"

const NO_DOCUMENT = "this row opens no document"

const ONE = "1 gap beneath"

export interface GapTreeView {
  readonly provider: vscode.TreeDataProvider<GapTreeRow>
  readonly replace: (roots: readonly GapTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

export function createGapTree(root: string): GapTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly GapTreeRow[] = []
  let pattern = ""
  let narrowed: readonly GapTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<GapTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.label),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<GapTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: GapTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: GapTreeRow) =>
      buildTreeItem(element, root, narrowed !== undefined, (narrowed ?? held).includes(element)),
  }

  return {
    provider,
    replace: (next: readonly GapTreeRow[]) => {
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

function beneath(gaps: number): string {
  return gaps === 1 ? ONE : `${gaps} gaps beneath`
}

function buildTreeItem(
  element: GapTreeRow,
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
  item.count = element.gaps === 0 ? undefined : element.gaps
  item.tooltip = [
    element.label,
    element.gaps === 0 ? element.key : beneath(element.gaps),
    element.at === null ? NO_DOCUMENT : relative(root, element.at),
  ].join("\n")
  if (element.at !== null) {
    item.command = {
      command: OPEN_COMMAND,
      title: "Open the page this gap is stated on",
      arguments: [vscode.Uri.file(element.at), { preview: true }],
    }
  }
  return item
}
