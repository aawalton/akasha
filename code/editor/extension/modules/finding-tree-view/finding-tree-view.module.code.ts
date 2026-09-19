import { relative } from "node:path"
import {
  filterTree,
  textMatches,
} from "akasha/code/editor/extension/modules/tree-filter/tree-filter.module.code.ts"
import * as vscode from "vscode"

const OPEN_COMMAND = "vscode.open"

const NO_DOCUMENT = "this row opens no document"

const ONE = "1 finding beneath"

const FINDING = "finding"

const DOMAIN = "domain"

export interface FindingTreeView {
  readonly provider: vscode.TreeDataProvider<FindingTreeRow>
  readonly replace: (roots: readonly FindingTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

export function createFindingTree(root: string): FindingTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly FindingTreeRow[] = []
  let pattern = ""
  let narrowed: readonly FindingTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<FindingTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.label),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<FindingTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: FindingTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: FindingTreeRow) =>
      buildTreeItem(element, root, narrowed !== undefined, (narrowed ?? held).includes(element)),
  }

  return {
    provider,
    replace: (next: readonly FindingTreeRow[]) => {
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

function beneath(findings: number): string {
  return findings === 1 ? ONE : `${findings} findings beneath`
}

function buildTreeItem(
  element: FindingTreeRow,
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
  item.count = element.findings === 0 ? undefined : element.findings
  item.contextValue = element.findings === 0 ? FINDING : DOMAIN
  item.tooltip = [
    element.label,
    element.findings === 0 ? element.key : beneath(element.findings),
    element.at === null ? NO_DOCUMENT : relative(root, element.at),
  ].join("\n")
  if (element.at !== null) {
    item.command = {
      command: OPEN_COMMAND,
      title: "Open this finding",
      arguments: [vscode.Uri.file(element.at), { preview: true }],
    }
  }
  return item
}
