const SUBAGENT_MARK = "--"

export function seatAbove(agent: string): string | null {
  const at = agent.indexOf(SUBAGENT_MARK)
  return at <= 0 ? null : agent.slice(0, at)
}
