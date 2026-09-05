import { AKASHA, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import type { Args } from "../../seat-args/seat-args.module.code.ts"
import { attributesOf, recordedModeOf } from "../../seat-attributes/seat-attributes.module.code.ts"
import { onCallOf } from "../../seat-on-call/seat-on-call.module.code.ts"
import { defaultSlots } from "../../seat-resolve/seat-resolve.module.code.ts"
import { run } from "../../seat-running/seat-running.module.code.ts"

export type SeatMode = "interactive" | "headless"

export const AGENT_MODE_INTERACTIVE: SeatMode = "interactive"

export const AGENT_MODE_HEADLESS: SeatMode = "headless"

// THE DEFAULTS A SEAT IS GIVEN ARE STATED AS VALUES. A supervisor holds the agent id and the mode
// already, so nothing writes them out as a payload for a second process to read back in.
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
    await run(defaultStating(opts.agentId, opts.mode))
  } catch {}
}
