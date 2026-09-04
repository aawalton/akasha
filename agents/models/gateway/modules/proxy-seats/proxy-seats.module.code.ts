export type ProxySeatAgent = {
  readonly id: string
  readonly name: string | null
  readonly activeAtMs: number
}

export type ProxySeatState = {
  readonly pid: number
  readonly oauthProxyVersion: string
}

export type LiveProxySeat = {
  readonly agentId: string
  readonly name: string | null
  readonly runningVersion: string
}

export type ProxySeatStateRead = (agentId: string) => ProxySeatState | null

export type PidAlive = (pid: number) => boolean

export function seatsNewestFirst(seats: readonly ProxySeatAgent[]): ProxySeatAgent[] {
  const ordered = [...seats]
  ordered.sort((a, b) => b.activeAtMs - a.activeAtMs || a.id.localeCompare(b.id))
  return ordered
}

export function liveProxySeats(
  agents: readonly ProxySeatAgent[],
  stateOf: ProxySeatStateRead,
  alive: PidAlive
): LiveProxySeat[] {
  const live: LiveProxySeat[] = []
  for (const agent of agents) {
    const state = stateOf(agent.id)
    if (state === null || !alive(state.pid)) continue
    live.push({ agentId: agent.id, name: agent.name, runningVersion: state.oauthProxyVersion })
  }
  return live
}
