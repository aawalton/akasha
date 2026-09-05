import { relative } from "node:path"
import * as vscode from "vscode"
import { filterTree, textMatches } from "../tree-filter/tree-filter.module.code.ts"
import {
  TURN_SCHEME_PATH,
  turnColorIn,
} from "../turn-color-scheme/turn-color-scheme.module.code.ts"

const WORK_SCHEME = "ops-work"

const OPEN_COMMAND = "vscode.open"

const NO_DOCUMENT = "a sentinel, representing what declared nothing — it opens no document"

export interface WorkTreeView {
  readonly provider: vscode.TreeDataProvider<WorkTreeRow>
  readonly replace: (roots: readonly WorkTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

// THE ROW THE FILE CARRIES IS THE ROW DRAWN, WITH NOTHING SPELLED AGAIN BETWEEN THE TWO.
//
// The row already names its document by a whole path, so the checkout is wanted for one thing
// only: shortening that path for the tooltip, which is done for the rows drawn rather than for
// every row held.
export function createWorkTree(root: string): WorkTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly WorkTreeRow[] = []
  let pattern = ""
  let narrowed: readonly WorkTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<WorkTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.label, node.detail, node.note),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<WorkTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: WorkTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: WorkTreeRow) => buildTreeItem(element, root, narrowed !== undefined),
  }

  return {
    provider,
    replace: (next: readonly WorkTreeRow[]) => {
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

function buildTreeItem(element: WorkTreeRow, root: string, filtering: boolean): vscode.TreeItem {
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
  item.iconPath = new vscode.ThemeIcon("blank")
  if (element.color !== null) {
    item.resourceUri = vscode.Uri.from({
      scheme: WORK_SCHEME,
      path: `/${TURN_SCHEME_PATH}/${element.color}/${element.key}`,
    })
  }
  item.tooltip = [
    element.label,
    element.detail,
    element.note,
    element.at === null ? NO_DOCUMENT : relative(root, element.at),
  ]
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

// A ROW IS COLORED THROUGH A URI RATHER THAN DIRECTLY. A tree item takes no color of its own, so a
// row carrying one sits under a scheme of this panel's making and the decoration answering that
// scheme is what the editor draws the color from.
export function createWorkDecorationProvider(): vscode.FileDecorationProvider {
  return {
    provideFileDecoration: (uri: vscode.Uri) => {
      if (uri.scheme !== WORK_SCHEME) {
        return undefined
      }
      const color = turnColorIn(uri.path)
      return color === undefined
        ? undefined
        : new vscode.FileDecoration(undefined, undefined, new vscode.ThemeColor(color))
    },
  }
}
