import { launchFrom } from "akasha/agents/seats/modules/flex/seat-flex.module.code.ts"
import { akashaSeatIdForName } from "akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { pageValuesOf } from "akasha/seat-system/seat-page-values/seat-page-values.module.code.ts"
import { seatNameForAgent } from "akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import { principalOf } from "akasha/seat-system/seat-principal/seat-principal.module.code.ts"
import {
  createAgent,
  type RowAgentLaunch,
} from "akasha/seat-system/supervising/supervisor-agent-create/supervisor-agent-create.module.code.ts"
import {
  keepSeatSession,
  takeSeatPage,
} from "akasha/seat-system/supervising/supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

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

async function readPredecessor(agentId: string): Promise<{
  name: string | null
  title: string | null
  launch: string | null
  parent: string | null
  role: string | null
  persona: string | null
  principal: string | null
} | null> {
  const stated = pageValuesOf(agentId)
  if (stated === null) return null
  const name = nameOf(agentId)
  if (name === null) return null
  const above = textAt(stated, PRINCIPAL_KEY)
  return {
    name,
    title: textAt(stated, "title") ?? name,
    launch: launchFrom(stated),
    parent: above === null ? null : akashaSeatIdForName(above),
    role: textAt(stated, "role-slug"),
    persona: textAt(stated, "persona-slug"),
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
