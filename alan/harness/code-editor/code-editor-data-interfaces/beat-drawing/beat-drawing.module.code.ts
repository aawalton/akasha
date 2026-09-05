// THE AGENTS PANEL AND THE STATUS BAR, NEITHER OF WHICH ANY FILE CHANGE ANNOUNCES.
//
// A transcript grows without a page moving, and a readout is written by a relay elsewhere, so
// these two are taken again on a beat rather than followed. What that buys is not fewer reads but
// fewer readers: every open window was paying the whole fleet read once a second, and the fleet
// does not differ between windows.
//
// The reading itself is the editor's own, imported rather than written again. `readAgentForest`
// holds no editor in it: what it reaches is the harness, a transcript and the seat pages.

import { colorOfState } from "@akasha/seat-system/seat-turn-color"
import { readAgentForest } from "../../../../../editor-extension/agent-forest-reading/agent-forest-reading.module.code.ts"
import { drawGroup } from "../../../../../editor-extension/group-stoplights/group-stoplights.module.code.ts"
import { readUsage } from "../../../../../editor-extension/status-bar-usage/status-bar-usage.module.code.ts"
import { createSubagentReader } from "../../../../../editor-extension/subagent-reading/subagent-reading.module.code.ts"

const INBOX_GROUP = "inboxes"
const UPKEEP_GROUP = "upkeep"
const ATTRIBUTES_GROUP = "attributes"

type AgentNodeIn = {
  readonly id: string
  readonly name: string
  readonly kind: string
  readonly place?: string
  readonly live: boolean
  readonly state?: string
  readonly waitingOn?: string
  readonly color?: string
  readonly at?: string
  readonly children: readonly AgentNodeIn[]
}

// A value that is absent is null rather than missing, so a reader tells one case from the other
// without knowing which keys this tree happens to carry.
function agentRow(node: AgentNodeIn): AgentTreeRow {
  return {
    key: node.id,
    label: node.name,
    at: node.at ?? null,
    color: node.color ?? null,
    kind: node.kind === "subagent" ? "subagent" : "seat",
    live: node.live,
    place: node.place === "interactive" || node.place === "headless" ? node.place : null,
    state: node.state ?? null,
    waitingOn: node.waitingOn ?? null,
    children: node.children.map(agentRow),
  }
}

// THE WORKING TURN'S COLOR, READ OFF ITS PAGE ON EVERY BEAT. Reading it opens one small file, so
// there is nothing worth holding: a color held for the life of the service goes on being drawn
// after Alan has rewritten the page stating it, and nothing would say so.
export async function agentTreeLine(): Promise<string> {
  const read = await readAgentForest(createSubagentReader(), colorOfState("working") ?? undefined)
  return JSON.stringify({
    roots: read.roots.map((node) => agentRow(node as AgentNodeIn)),
    alanPrincipalCount: read.alanPrincipalCount,
    runningCount: read.runningCount,
    unreadSeats: read.unreadSeats,
  } satisfies AgentTreeState)
}

// Four reads, none of which is allowed to lose the other three. A section that threw is null, and
// the editor keeps what it last drew there rather than blanking it.
async function stoplightsOf(group: string): Promise<StatusBarStoplights | null> {
  try {
    const drawn = await drawGroup(group)
    // A store that cannot be reached answers no stoplights rather than throwing, so an empty
    // group is a read that failed rather than a group that is well. Every group names at least
    // one readout, and answering null here is what keeps the last good glyphs on the screen.
    if (drawn.glyphs === "") return null
    return { glyphs: drawn.glyphs, legend: drawn.legend }
  } catch {
    return null
  }
}

export async function statusBarLine(): Promise<string> {
  const [inbox, upkeep, attributes, usage] = await Promise.all([
    stoplightsOf(INBOX_GROUP),
    stoplightsOf(UPKEEP_GROUP),
    stoplightsOf(ATTRIBUTES_GROUP),
    readUsage().catch(() => null),
  ])
  return JSON.stringify({
    usage,
    inbox,
    upkeep,
    attributes,
  } satisfies StatusBarState)
}
