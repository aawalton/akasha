import {
  attributesOf,
  recordedModeOf,
} from "akasha/agents/attributes/agent-attributes.module.code.ts"
import type { Args } from "akasha/agents/seats/modules/args/seat-args.module.code.ts"
import { onCallOf } from "akasha/agents/seats/modules/on-call/seat-on-call.module.code.ts"
import { nameFromHistory } from "akasha/agents/seats/modules/page-history/seat-page-history.module.code.ts"
import { seatNameForAgent } from "akasha/agents/seats/modules/presence-read/seat-presence-read.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { defaultSlots } from "akasha/seat-system/seat-resolve/seat-resolve.module.code.ts"
import { run } from "akasha/seat-system/seat-running/seat-running.module.code.ts"
import { LOG } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import { keepSeatPage } from "akasha/seat-system/supervising/supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"

export type SeatMode = "interactive" | "headless"

export const AGENT_MODE_INTERACTIVE: SeatMode = "interactive"

export const AGENT_MODE_HEADLESS: SeatMode = "headless"

export function defaultStating(agentId: string, mode: SeatMode): Args {
  return {
    set: {},
    initiative: null,
    flex: null,
    tokens: [],
    clear: [],
    mode,
    principal: null,
    onCall: mode === AGENT_MODE_INTERACTIVE,
    takeLiveName: false,
    resolve: false,
    name: false,
    fromHistory: false,
    asDefault: true,
    agent: agentId,
    parentName: null,
    registration: null,
  }
}

export function seatDefaultsStand(agentId: string, mode: SeatMode): boolean {
  if (mode !== AGENT_MODE_INTERACTIVE) return false
  if (seatNameForAgent(agentId) === null) return false
  if (!onCallOf(agentId)) return false
  if (recordedModeOf(agentId) === null) return false
  const held = attributesOf(agentId)
  return defaultSlots(rootFor(resolveRoots(), AKASHA)).every((slot) => held[slot] !== undefined)
}

export async function stateSeatDefaults(opts: {
  readonly agentId: string
  readonly mode: SeatMode
}): Promise<void> {
  if (seatDefaultsStand(opts.agentId, opts.mode)) return
  try {
    const said = await run(defaultStating(opts.agentId, opts.mode))
    if (said.kind === "refused") {
      console.error(
        `${LOG} stating the defaults of seat ${opts.agentId} was refused, so this boot carries ` +
          "whatever its page already said, and a boot that has no page carries no seat name: " +
          said.said.trim()
      )
    }
  } catch (err) {
    console.error(
      `${LOG} stating the defaults of seat ${opts.agentId} failed, so this boot carries ` +
        "whatever its page already said, and a boot that has no page carries no seat name:",
      err
    )
  }
  await takeUpPageInHistory(opts.agentId)
}

export async function takeUpPageInHistory(agentId: string): Promise<void> {
  if (seatNameForAgent(agentId) !== null) return
  const held = nameFromHistory(agentId, resolveRoots())
  if (held === null) return
  await keepSeatPage(agentId, held)
}
