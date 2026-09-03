export const SUBAGENT_MARK = "--"

export function seatAbove(agent: string): string | null {
  const at = agent.indexOf(SUBAGENT_MARK)
  return at <= 0 ? null : agent.slice(0, at)
}

export function subagentUnder(agent: string): string | null {
  const at = agent.indexOf(SUBAGENT_MARK)
  if (at <= 0) return null
  const own = agent.slice(at + SUBAGENT_MARK.length)
  return own === "" ? null : own
}
