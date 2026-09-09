import { SUBAGENT_MARK } from "../subagent-naming/subagent-naming.module.code.ts"

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
  return acting?.startsWith(`${seat}${SUBAGENT_MARK}`) ? acting : seat
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
