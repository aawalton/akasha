export const SUBAGENT_MARK = "--"

function said(name: string): string {
  return (process.env[name] ?? "").trim()
}

function identifier(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null
}

export function seatId(): string | null {
  const seat = said("AGENT_ID") !== "" ? said("AGENT_ID") : said("CLAUDE_CODE_SESSION_ID")
  return seat === "" ? null : seat
}

export function writerId(): string | null {
  const seat = seatId()
  if (seat === null) return null
  const acting = said("ACTING_AGENT_ID")
  return acting.startsWith(`${seat}${SUBAGENT_MARK}`) ? acting : seat
}

export function writerIn(payload: Readonly<Record<string, unknown>>): string | null {
  const seat = seatId() ?? identifier(payload.session_id)
  if (seat === null) return null
  const subagent = identifier(payload.agent_id)
  return subagent === null ? seat : `${seat}${SUBAGENT_MARK}${subagent}`
}
