import { akashaSeatIdForName } from "@tools/lib/seat-akasha-beside"
import { launchFrom } from "@tools/lib/seat-flex"
import { pageValuesOf } from "@tools/lib/seat-page-values"
import { seatNameForAgent } from "@tools/lib/seat-presence-read"
import { principalOf } from "@tools/lib/seat-principal"
import {
  createAgent,
  type RowAgentLaunch,
} from "../supervisor-agent-create/supervisor-agent-create.module.code.ts"
import {
  keepSeatSession,
  takeSeatPage,
} from "../supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"

// A seat's name is its page's stem while that page stands, and the slug its akasha page is named
// for once it does not. Both spell the same name.
function nameOf(agentId: string): string | null {
  return seatNameForAgent(agentId)
}

const PRINCIPAL_KEY = "principal-seat-name"

export interface StatedAgentSlots {
  readonly role?: string
  readonly domain?: string
  readonly persona?: string
  readonly mode?: string
  readonly principal?: string
}

export interface ClearRebindDeps {
  readPredecessor: (agentId: string) => Promise<{
    name?: string | null
    title?: string | null
    launch?: string | null
    parent?: string | null
    role?: string | null
    domain?: string | null
    persona?: string | null
    mode?: string | null
    principal?: string | null
  } | null>
  markStopped: (agentId: string) => Promise<void>
  createSuccessor: (
    account: string,
    launch: RowAgentLaunch,
    parent: string | null
  ) => Promise<string>
  setSessionId: (agentId: string, sessionId: string) => Promise<void>
  bindAgentName: (
    agentId: string,
    name: string,
    displayTitle?: string,
    stated?: StatedAgentSlots
  ) => Promise<void>
}

function slugAt(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  return typeof held === "string" && held !== "" ? held : null
}

async function readPredecessor(agentId: string): Promise<{
  name: string | null
  title: string | null
  launch: string | null
  parent: string | null
  role: string | null
  persona: string | null
  principal: string | null
} | null> {
  // Through the funnel rather than off the old page. A rebind reads a seat in order to stand a
  // successor up in its place, so a seat read as stating nothing is a rebind that loses the name,
  // the role and the persona it was meant to carry over.
  const stated = pageValuesOf(agentId)
  if (stated === null) return null
  const name = nameOf(agentId)
  if (name === null) return null
  const above = slugAt(stated, PRINCIPAL_KEY)
  return {
    name,
    title: slugAt(stated, "title") ?? name,
    launch: launchFrom(stated),
    // The seat above is named rather than identified, and akasha says who holds that name. Both
    // systems were asked, the old pages first; there is one system to ask now.
    parent: above === null ? null : akashaSeatIdForName(above),
    role: slugAt(stated, "role-slug"),
    persona: slugAt(stated, "persona-slug"),
    principal: principalOf(agentId)?.value ?? null,
  }
}

async function markStopped(agentId: string): Promise<void> {
  const taken = takeSeatPage(agentId, "it was rebound and a successor takes its place")
  if (taken.kind === "refused") {
    throw new Error(`the seat page for ${agentId} did not go: ${taken.detail}`)
  }
}

async function setSessionId(agentId: string, sessionId: string): Promise<void> {
  keepSeatSession(agentId, sessionId)
}

export function liveRebindDepsWith(
  bindAgentName: ClearRebindDeps["bindAgentName"]
): ClearRebindDeps {
  return {
    readPredecessor,
    markStopped,
    createSuccessor: createAgent,
    setSessionId,
    bindAgentName,
  }
}
