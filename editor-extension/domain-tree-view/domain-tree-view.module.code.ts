import { relative } from "node:path"
import * as vscode from "vscode"
import { filterTree, textMatches } from "../tree-filter/tree-filter.module.code.ts"

const OPEN_COMMAND = "vscode.open"

const NO_DOCUMENT = "this row opens no document"

export interface DomainTreeView {
  readonly provider: vscode.TreeDataProvider<DomainTreeRow>
  readonly replace: (roots: readonly DomainTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

// THE ROW THE FILE CARRIES IS THE ROW DRAWN, WITH NOTHING SPELLED AGAIN BETWEEN THE TWO.
//
// The row already names its document by a whole path, so the checkout is wanted for one thing
// only: shortening that path for the tooltip, which is done for the rows drawn rather than for
// every row held. Ten thousand domains were being walked to take the checkout off every path and
// walked again to put it back, on the thread that draws them, each time the file moved.
export function createDomainTree(root: string): DomainTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly DomainTreeRow[] = []
  let pattern = ""
  let narrowed: readonly DomainTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<DomainTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.label, node.persona),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<DomainTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: DomainTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: DomainTreeRow) => buildTreeItem(element, root, narrowed !== undefined),
  }

  return {
    provider,
    replace: (next: readonly DomainTreeRow[]) => {
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

function buildTreeItem(element: DomainTreeRow, root: string, filtering: boolean): vscode.TreeItem {
  const label = element.position === null ? element.label : `${element.position}-${element.label}`
  const item = new vscode.TreeItem(
    label,
    element.children.length === 0
      ? vscode.TreeItemCollapsibleState.None
      : filtering
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.Collapsed
  )
  item.id = filtering ? `filtered:${element.key}` : element.key
  item.count = element.children.length === 0 ? undefined : element.children.length
  item.description = element.persona ?? undefined
  item.tooltip = [
    element.label,
    element.persona === null ? "no persona answers for this domain" : `Owned by ${element.persona}`,
    element.at === null ? NO_DOCUMENT : relative(root, element.at),
  ].join("\n")
  // A ROW NAMING NO DOCUMENT OPENS NONE. Joining the checkout to an empty path opened the checkout
  // itself, which is what a row carrying no path used to do.
  if (element.at !== null) {
    item.command = {
      command: OPEN_COMMAND,
      title: "Open this domain document",
      arguments: [vscode.Uri.file(element.at), { preview: true }],
    }
  }
  return item
}
