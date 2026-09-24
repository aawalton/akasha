import type { SeatClick } from "akasha/code/editor/extension/modules/agent-row/agent-row.module.code.ts"
import { seatContextValue } from "akasha/code/editor/extension/modules/seat-toggles/seat-toggles.module.code.ts"
import { subagentContextValue } from "akasha/code/editor/extension/modules/subagent-stopping/subagent-stopping.module.code.ts"
import {
  filterTree,
  textMatches,
} from "akasha/code/editor/extension/modules/tree-filter/tree-filter.module.code.ts"
import {
  colorTallyIn,
  turnColorIn,
  turnStateSaid,
} from "akasha/code/editor/extension/modules/turn-color-scheme/turn-color-scheme.module.code.ts"
import * as vscode from "vscode"
import "akasha/alan/harness/code-editor/data-interface/pages/agent-tree/agent-tree.code-editor-data-interface.d.ts"

export const REVEAL_TERMINAL_COMMAND = "opsAgentTree.revealTerminal"

export const OPEN_SEAT_PAGE_COMMAND = "opsAgentTree.openSeatPage"

const OPEN_COMMAND = "vscode.open"

export const AGENT_SCHEME = "ops-agent"

export interface AgentTree {
  readonly provider: vscode.TreeDataProvider<AgentTreeRow>
  readonly replace: (roots: readonly AgentTreeRow[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

function buildTreeItem(element: AgentTreeRow, filtering: boolean, atTop: boolean): vscode.TreeItem {
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
  item.iconPath = new vscode.ThemeIcon("blank")
  item.tooltip = (
    element.kind === "root"
      ? [element.label]
      : element.kind === "subagent"
        ? [
            element.label,
            element.stopped ? "Stopped from the agents panel" : undefined,
            element.at ?? "akasha holds no page for this subagent",
          ]
        : [
            element.label,
            `${element.live ? "Running" : "Stopped"}, ${element.place ?? "headless"}`,
            turnStateSaid(element.state ?? undefined, element.waitingOn ?? undefined),
            element.at ?? "akasha holds no page for this seat",
          ]
  )
    .filter((line): line is string => line !== undefined)
    .join("\n")
  if (element.kind === "subagent") {
    item.resourceUri = vscode.Uri.from({
      scheme: AGENT_SCHEME,
      path:
        element.color === null
          ? `/subagent/${element.key}`
          : `/subagent/${element.color}/${element.key}`,
    })
  } else if (element.kind === "seat" && !element.live) {
    item.resourceUri = vscode.Uri.from({
      scheme: AGENT_SCHEME,
      path:
        element.color === null
          ? `/stopped/${element.key}`
          : `/stopped/${element.color}/${element.key}`,
    })
  } else if (element.kind === "seat" && element.color !== null) {
    item.resourceUri = vscode.Uri.from({
      scheme: AGENT_SCHEME,
      path: `/turn/${element.color}/${element.key}`,
    })
  }
  item.contextValue =
    element.kind === "seat"
      ? seatContextValue(element.live, element.place ?? "headless")
      : element.kind === "subagent"
        ? subagentContextValue(element.stopped)
        : element.kind
  if (element.kind === "seat") {
    const clicked: SeatClick = { id: element.key, name: element.label }
    item.command = {
      command: OPEN_SEAT_PAGE_COMMAND,
      title: "Open this seat's page in the browser",
      arguments: [clicked],
    }
  } else if (element.at !== null) {
    item.command = {
      command: OPEN_COMMAND,
      title: "Open this document",
      arguments: [vscode.Uri.file(element.at), { preview: true }],
    }
  }
  return item
}

export function createAgentTree(): AgentTree {
  const emitter = new vscode.EventEmitter<undefined>()
  let roots: readonly AgentTreeRow[] = []
  let pattern = ""
  let narrowed: readonly AgentTreeRow[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<AgentTreeRow>(
      roots,
      (node) => node.children,
      (node) => textMatches(pattern, node.label),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<AgentTreeRow> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: AgentTreeRow) => [
      ...(element === undefined ? (narrowed ?? roots) : element.children),
    ],
    getTreeItem: (element: AgentTreeRow) =>
      buildTreeItem(element, narrowed !== undefined, (narrowed ?? roots).includes(element)),
  }

  return {
    provider,
    replace: (next: readonly AgentTreeRow[]) => {
      roots = next
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

export function createAgentDecorationProvider(): vscode.FileDecorationProvider {
  return {
    provideFileDecoration: (uri: vscode.Uri) => {
      if (uri.scheme !== AGENT_SCHEME) {
        return undefined
      }
      const said = uri.path.startsWith("/subagent/")
        ? "Subagent"
        : uri.path.startsWith("/stopped/")
          ? "Stopped"
          : undefined
      const turn = turnColorIn(uri.path)
      return new vscode.FileDecoration(
        undefined,
        said,
        turn === undefined ? undefined : new vscode.ThemeColor(turn)
      )
    },
  }
}
