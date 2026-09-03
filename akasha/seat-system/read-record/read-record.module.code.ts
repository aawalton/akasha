import { SUBAGENT_MARK } from "../subagent-naming/subagent-naming.module.code.ts"

// WHO IS ACTING, READ OFF THE ENVIRONMENT AND THE HOOK'S PAYLOAD. This module was the way to the
// read record kept beside a seat's old page, and these four answers rode along in it because every
// caller of that record needed to name a writer first.
//
// The record has gone and they have not. Nothing here opens a file or knows where a reading is
// kept: an id is what the environment says it is, and a subagent's id is its seat's with its own
// spelled after it.
function identifier(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null
}

export function seatId(): string | null {
  return identifier(process.env.AGENT_ID) ?? identifier(process.env.CLAUDE_CODE_SESSION_ID)
}

export function agentId(): string | null {
  const seat = seatId()
  if (seat === null) return null
  const acting = identifier(process.env.ACTING_AGENT_ID)
  return acting !== null && acting.startsWith(`${seat}${SUBAGENT_MARK}`) ? acting : seat
}

export function hookAgentId(payload: Record<string, unknown>): string | null {
  return seatId() ?? identifier(payload.session_id)
}

export function recordingAgentId(payload: Record<string, unknown>): string | null {
  const seat = hookAgentId(payload)
  if (seat === null) return null
  const subagent = identifier(payload.agent_id)
  return subagent === null ? seat : `${seat}${SUBAGENT_MARK}${subagent}`
}
