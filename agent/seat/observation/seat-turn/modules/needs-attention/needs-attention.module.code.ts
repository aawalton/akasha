import { akashaObservedOf } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import { keepBeside } from "akasha/agent/seat/modules/beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"

const KEY = "needs-attention"

export function needsAttentionOf(agent: string): boolean {
  if (agent === "") return false
  return akashaObservedOf(agent)?.[KEY] === true
}

export function setNeedsAttention(agent: string, value: boolean): boolean {
  if (agent === "") return false
  if (needsAttentionOf(agent) === value) return false
  const seat = seatNameForAgent(agent)
  if (seat === null) return false
  keepBeside(seat, { [KEY]: value })
  return true
}
