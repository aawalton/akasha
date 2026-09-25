import {
  attributesOf,
  recordedModeOf,
} from "akasha/agent/modules/attributes/agent-attributes.module.code.ts"
import type { Args } from "akasha/agent/seat/declaration/modules/seat-args/seat-args.module.code.ts"
import { onCallOf } from "akasha/agent/seat/declaration/modules/seat-on-call/seat-on-call.module.code.ts"
import { defaultSlots } from "akasha/agent/seat/declaration/modules/seat-resolve/seat-resolve.module.code.ts"
import { run } from "akasha/agent/seat/declaration/modules/seat-running/seat-running.module.code.ts"
import { nameFromHistory } from "akasha/agent/seat/modules/page-history/seat-page-history.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { keepSeatPage } from "akasha/agent/seat/supervisor/supervisor-timer/modules/supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

type SeatMode = "interactive" | "headless"

export const AGENT_MODE_INTERACTIVE: SeatMode = "interactive"

export const AGENT_MODE_HEADLESS: SeatMode = "headless"

function defaultStating(agentId: string, mode: SeatMode): Args {
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

function seatDefaultsStand(agentId: string, mode: SeatMode): boolean {
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

async function takeUpPageInHistory(agentId: string): Promise<void> {
  if (seatNameForAgent(agentId) !== null) return
  const held = nameFromHistory(agentId, resolveRoots())
  if (held === null) return
  await keepSeatPage(agentId, held)
}
