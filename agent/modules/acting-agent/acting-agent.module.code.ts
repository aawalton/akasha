function parseIdentifier(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null
}

export function seatId(): string | null {
  return (
    parseIdentifier(process.env.AGENT_ID) ?? parseIdentifier(process.env.CLAUDE_CODE_SESSION_ID)
  )
}

export function hookAgentId(payload: Record<string, unknown>): string | null {
  return seatId() ?? parseIdentifier(payload.session_id)
}
