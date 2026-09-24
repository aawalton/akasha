import type {
  AgentNode,
  SeatClick,
} from "akasha/code/editor/extension/modules/agent-row/agent-row.module.code.ts"
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

export const REVEAL_TERMINAL_COMMAND = "opsAgentTree.revealTerminal"

export const OPEN_SEAT_PAGE_COMMAND = "opsAgentTree.openSeatPage"

const OPEN_COMMAND = "vscode.open"

export const AGENT_SCHEME = "ops-agent"

export interface AgentTree {
  readonly provider: vscode.TreeDataProvider<AgentNode>
  readonly replace: (roots: readonly AgentNode[]) => undefined
  readonly filter: (pattern: string) => undefined
  readonly matchCount: () => number | undefined
  readonly dispose: () => undefined
}

function buildTreeItem(element: AgentNode, filtering: boolean, atTop: boolean): vscode.TreeItem {
  const item = new vscode.TreeItem(
    element.name,
    element.children.length === 0
      ? vscode.TreeItemCollapsibleState.None
      : atTop || filtering
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.Collapsed
  )
  item.id = filtering ? `filtered:${element.id}` : element.id
  item.count = element.children.length === 0 ? undefined : element.children.length
  const tally = colorTallyIn(element.children)
  item.colorCounts =
    tally.length === 0
      ? undefined
      : tally.map((one) => ({ count: one.count, color: new vscode.ThemeColor(one.colorId) }))
  item.iconPath = new vscode.ThemeIcon("blank")
  item.tooltip = (
    element.kind === "root"
      ? [element.name]
      : element.kind === "subagent"
        ? [
            element.name,
            element.stopped === true ? "Stopped from the agents panel" : undefined,
            element.at ?? "akasha holds no page for this subagent",
          ]
        : [
            element.name,
            `${element.live ? "Running" : "Stopped"}, ${element.place ?? "headless"}`,
            turnStateSaid(element.state, element.waitingOn),
            element.at ?? "akasha holds no page for this seat",
          ]
  )
    .filter((line): line is string => line !== undefined)
    .join("\n")
  if (element.kind === "subagent") {
    item.resourceUri = vscode.Uri.from({
      scheme: AGENT_SCHEME,
      path:
        element.color === undefined
          ? `/subagent/${element.id}`
          : `/subagent/${element.color}/${element.id}`,
    })
  } else if (element.kind === "seat" && !element.live) {
    item.resourceUri = vscode.Uri.from({
      scheme: AGENT_SCHEME,
      path:
        element.color === undefined
          ? `/stopped/${element.id}`
          : `/stopped/${element.color}/${element.id}`,
    })
  } else if (element.kind === "seat" && element.color !== undefined) {
    item.resourceUri = vscode.Uri.from({
      scheme: AGENT_SCHEME,
      path: `/turn/${element.color}/${element.id}`,
    })
  }
  item.contextValue =
    element.kind === "seat"
      ? seatContextValue(element.live, element.place ?? "headless")
      : element.kind === "subagent"
        ? subagentContextValue(element.stopped === true)
        : element.kind
  if (element.kind === "seat") {
    const clicked: SeatClick = { id: element.id, name: element.name }
    item.command = {
      command: OPEN_SEAT_PAGE_COMMAND,
      title: "Open this seat's page in the browser",
      arguments: [clicked],
    }
  } else if (element.at !== undefined) {
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
  let roots: readonly AgentNode[] = []
  let pattern = ""
  let narrowed: readonly AgentNode[] | undefined
  let matched: number | undefined

  const narrow = (): undefined => {
    if (pattern.trim() === "") {
      narrowed = undefined
      matched = undefined
      return undefined
    }
    const result = filterTree<AgentNode>(
      roots,
      (node) => node.children,
      (node) => textMatches(pattern, node.name),
      (node, children) => ({ ...node, children })
    )
    narrowed = result.roots
    matched = result.matchCount
    return undefined
  }

  const provider: vscode.TreeDataProvider<AgentNode> = {
    onDidChangeTreeData: emitter.event,
    getChildren: (element?: AgentNode) => [
      ...(element === undefined ? (narrowed ?? roots) : element.children),
    ],
    getTreeItem: (element: AgentNode) =>
      buildTreeItem(element, narrowed !== undefined, (narrowed ?? roots).includes(element)),
  }

  return {
    provider,
    replace: (next: readonly AgentNode[]) => {
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
