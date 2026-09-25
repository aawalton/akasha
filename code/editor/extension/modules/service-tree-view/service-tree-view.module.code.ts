import { relative } from "node:path"
import {
  filterTree,
  textMatches,
} from "akasha/code/editor/extension/modules/tree-filter/tree-filter.module.code.ts"
import {
  colorTallyIn,
  TURN_SCHEME_PATH,
  turnColorIn,
} from "akasha/code/editor/extension/modules/turn-color-scheme/turn-color-scheme.module.code.ts"
import * as vscode from "vscode"
import "akasha/alan/harness/code-editor/data-interface/pages/service-tree/service-tree.code-editor-data-interface.d.ts"

const SERVICE_SCHEME = "ops-service"

const OPEN_COMMAND = "vscode.open"

const NO_DOCUMENT = "a sentinel, representing what declared nothing — it opens no document"

interface ServiceTreeView {
  readonly provider: vscode.TreeDataProvider<ServiceTreeRow>
  readonly replace: (roots: readonly ServiceTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

export function createServiceTree(root: string): ServiceTreeView {
  const emitter = new vscode.EventEmitter<undefined>()
  let held: readonly ServiceTreeRow[] = []
  let pattern = ""
  let narrowed: readonly ServiceTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<ServiceTreeRow>(
      held,
      (node) => node.children,
      (node) => textMatches(pattern, node.label, node.detail),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<ServiceTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: ServiceTreeRow) => [
      ...(element === undefined ? (narrowed ?? held) : element.children),
    ],
    getTreeItem: (element: ServiceTreeRow) =>
      buildTreeItem(element, root, narrowed !== undefined, (narrowed ?? held).includes(element)),
  }

  return {
    provider,
    replace: (next: readonly ServiceTreeRow[]) => {
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

function buildTreeItem(
  element: ServiceTreeRow,
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
  item.count = element.children.length === 0 ? undefined : element.children.length
  const tally = colorTallyIn(element.children)
  item.colorCounts =
    tally.length === 0
      ? undefined
      : tally.map((one) => ({ count: one.count, color: new vscode.ThemeColor(one.colorId) }))
  item.description = element.detail ?? undefined
  item.iconPath = new vscode.ThemeIcon("blank")
  item.contextValue = element.kind
  if (element.color !== null) {
    item.resourceUri = vscode.Uri.from({
      scheme: SERVICE_SCHEME,
      path: `/${TURN_SCHEME_PATH}/${element.color}/${element.key}`,
    })
  }
  item.tooltip = [
    element.label,
    element.detail,
    element.at === null ? NO_DOCUMENT : relative(root, element.at),
  ]
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

export function createServiceDecorationProvider(): vscode.FileDecorationProvider {
  return {
    provideFileDecoration: (uri: vscode.Uri) => {
      if (uri.scheme !== SERVICE_SCHEME) {
        return undefined
      }
      const color = turnColorIn(uri.path)
      return color === undefined
        ? undefined
        : new vscode.FileDecoration(undefined, undefined, new vscode.ThemeColor(color))
    },
  }
}
