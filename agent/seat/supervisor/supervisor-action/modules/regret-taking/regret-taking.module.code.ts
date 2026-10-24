import {
  markInjected,
  takeMessage,
} from "akasha/agent/message/modules/file/agent-message-file.module.code.ts"
import { akashaObservedOf } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import { keepBesideUnder } from "akasha/agent/seat/modules/beside/seat-beside.module.code.ts"
import { seatNameForAgent } from "akasha/agent/seat/observation/modules/seat-presence-read/seat-presence-read.module.code.ts"
import {
  cutTranscript,
  type RegretCut,
  regretCutOf,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/regret-cut/regret-cut.module.code.ts"

const TRANSCRIPT_KEY = "transcript-path"

const WORKING_KEY = "turn-working"

let held = false

export function repliesHeld(): boolean {
  return held
}

export function holdReplies(holding: boolean): undefined {
  held = holding
}

function transcriptOf(agentId: string): string | null {
  const said = akashaObservedOf(agentId)?.[TRANSCRIPT_KEY]
  return typeof said === "string" && said !== "" ? said : null
}

export function regretFor(agentId: string, messageId: string): RegretCut {
  const path = transcriptOf(agentId)
  return path === null ? { refused: "absent" } : regretCutOf(path, messageId)
}

export async function takenBack(
  agentId: string,
  messageId: string,
  cut: number
): Promise<RegretCut> {
  const path = transcriptOf(agentId)
  if (path === null) return { refused: "absent" }
  const again = regretCutOf(path, messageId)
  if ("refused" in again && again.refused !== "finished") return again
  const at = "cut" in again ? again.cut : cut
  cutTranscript(path, at)
  const seat = seatNameForAgent(agentId)
  if (seat === null) return { cut: at }
  keepBesideUnder(seat, WORKING_KEY, {})
  markInjected(seat, messageId)
  await takeMessage(seat, messageId)
  return { cut: at }
}
