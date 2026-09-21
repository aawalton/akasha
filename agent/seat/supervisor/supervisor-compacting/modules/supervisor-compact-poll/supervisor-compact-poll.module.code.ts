import { sendLineToSeatPane } from "akasha/agent/seat/launching/modules/launch-seat-tmux/launch-seat-tmux.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import { pendingOf } from "akasha/agent/seat/observation/seat-turn/modules/pending/seat-turn-pending.module.code.ts"
import {
  shouldCompact,
  stillAsked,
  worthProbing,
} from "akasha/agent/seat/supervisor/supervisor-compacting/modules/supervisor-compact-decide/supervisor-compact-decide.module.code.ts"
import type { IdleObservation } from "akasha/agent/seat/supervisor/supervisor-idleness/modules/supervisor-idle-decide/supervisor-idle-decide.module.code.ts"
import { observeIdle } from "akasha/agent/seat/supervisor/supervisor-idleness/modules/supervisor-idle-observe/supervisor-idle-observe.module.code.ts"
import type { IdleRuleSource } from "akasha/agent/seat/supervisor/supervisor-idleness/modules/supervisor-idle-rule/supervisor-idle-rule.module.code.ts"
import type { HeartbeatPoll } from "akasha/agent/seat/supervisor/supervisor-ticking/modules/supervisor-heartbeat/supervisor-heartbeat.module.code.ts"
import { contextTokensOf } from "akasha/agent/seat/usage/seat-usage.module.code.ts"

const POLL_NAME = "auto-compact"

const COMPACT_LINE = "/compact"

function tokensOf(agentId: string): number | null {
  const held = contextTokensOf(agentId)
  if (held === null) return null
  const count = Number.parseInt(held.value, 10)
  return Number.isSafeInteger(count) ? count : null
}

function compactingOf(agentId: string): boolean {
  return pendingOf(agentId).compacting?.value === true
}

export function autoCompactPoll(args: {
  getAgentId: () => string | null
  getClaudePid: () => number | null
  getProxyPort: () => number | null
  idleRule: IdleRuleSource
  log: (line: string) => void
  readTokens?: (agentId: string) => number | null
  readCompacting?: (agentId: string) => boolean
  readSeatName?: (agentId: string) => string | null
  sendLine?: (seatName: string, line: string) => Promise<boolean>
  observe?: () => Promise<IdleObservation>
}): HeartbeatPoll {
  const readTokens = args.readTokens ?? tokensOf
  const readCompacting = args.readCompacting ?? compactingOf
  const readSeatName = args.readSeatName ?? seatNameForAgent
  const sendLine = args.sendLine ?? sendLineToSeatPane
  const observe =
    args.observe ??
    (() =>
      observeIdle({
        getClaudePid: args.getClaudePid,
        getProxyPort: args.getProxyPort,
        getAgentId: args.getAgentId,
        idleRule: args.idleRule,
      }))
  let asked = false
  let beatInFlight = false

  const beat = async (): Promise<void> => {
    if (beatInFlight) return
    beatInFlight = true
    try {
      const agentId = args.getAgentId()
      if (agentId === null) {
        asked = false
        return
      }
      const contextTokens = readTokens(agentId)
      asked = stillAsked(asked, contextTokens)
      const compacting = readCompacting(agentId)
      if (!worthProbing({ compacting, contextTokens }, asked)) return
      const { value: verdict } = await args.idleRule.preservingRestart(await observe())
      if (!shouldCompact({ idle: verdict.idle, compacting, contextTokens }, asked)) return
      const seatName = readSeatName(agentId)
      if (seatName === null) return
      asked = await sendLine(seatName, COMPACT_LINE)
      if (asked) {
        args.log(`${POLL_NAME}: ${seatName} idle at ${contextTokens} tokens — asked it to compact`)
      }
    } finally {
      beatInFlight = false
    }
  }

  return { name: POLL_NAME, run: beat }
}
