import { expect, mock, test } from "bun:test"
import type { AgentNode } from "akasha/code/editor/extension/modules/agent-row/agent-row.module.code.ts"
import type * as vscode from "vscode"

type Held = Record<string, unknown>

function identified(this: Held, id: string): undefined {
  this.id = id
  return undefined
}

function treeItem(this: Held, label: string, collapsibleState: number): undefined {
  this.label = label
  this.collapsibleState = collapsibleState
  return undefined
}

function decoration(
  this: Held,
  badge: string | undefined,
  tooltip: string | undefined,
  color: unknown
): undefined {
  this.badge = badge
  this.tooltip = tooltip
  this.color = color
  return undefined
}

function emitter(this: Held): undefined {
  this.event = () => ({ dispose: () => undefined })
  this.fire = () => undefined
  this.dispose = () => undefined
  return undefined
}

mock.module("vscode", () => ({
  EventEmitter: emitter,
  FileDecoration: decoration,
  ThemeColor: identified,
  ThemeIcon: identified,
  TreeItem: treeItem,
  TreeItemCollapsibleState: { None: 0, Collapsed: 1, Expanded: 2 },
  Uri: {
    from: (said: { scheme: string; path: string }) => ({ scheme: said.scheme, path: said.path }),
    file: (at: string) => ({ scheme: "file", path: at }),
  },
}))

const { AGENT_SCHEME, createAgentDecorationProvider, createAgentTree } = await import(
  "akasha/code/editor/extension/modules/agent-tree-drawing/agent-tree-drawing.module.code.ts"
)

const NEVER_CANCELLED: vscode.CancellationToken = {
  isCancellationRequested: false,
  onCancellationRequested: () => ({ dispose: () => undefined }),
}

const seat = (over: Partial<AgentNode>): AgentNode => ({
  id: "s1",
  name: "nimue",
  kind: "seat",
  place: "interactive",
  live: true,
  children: [],
  ...over,
})

async function decorationOf(node: AgentNode): Promise<{
  readonly path: string
  readonly said: string | undefined
  readonly color: string | undefined
}> {
  const tree = createAgentTree()
  tree.replace([node])
  const item = await tree.provider.getTreeItem(node)
  tree.dispose()
  const uri = item.resourceUri
  if (uri === undefined) throw new Error(`${node.name} took no resource uri`)
  expect(uri.scheme).toBe(AGENT_SCHEME)
  const drawn = await createAgentDecorationProvider().provideFileDecoration(uri, NEVER_CANCELLED)
  if (drawn === undefined || drawn === null) throw new Error(`${node.name} took no decoration`)
  return { path: uri.path, said: drawn.tooltip, color: drawn.color?.id }
}

test("a stopped seat's row is drawn in the text color and still says it stopped", async () => {
  expect(await decorationOf(seat({ live: false, state: "stopped", color: "text" }))).toEqual({
    path: "/stopped/text/s1",
    said: "Stopped",
    color: "ops.color.text",
  })
})

test("a stopped seat naming no color still says it stopped", async () => {
  expect(await decorationOf(seat({ live: false, state: "stopped" }))).toEqual({
    path: "/stopped/s1",
    said: "Stopped",
    color: undefined,
  })
})

test("a running seat's row is drawn in the color its turn state names and says nothing", async () => {
  expect(await decorationOf(seat({ state: "working", color: "green" }))).toEqual({
    path: "/turn/green/s1",
    said: undefined,
    color: "ops.color.green",
  })
})

test("a subagent's row is drawn in its color and says it is a subagent", async () => {
  expect(
    await decorationOf(seat({ id: "t1", name: "writing", kind: "subagent", color: "blue" }))
  ).toEqual({
    path: "/subagent/blue/t1",
    said: "Subagent",
    color: "ops.color.blue",
  })
})
