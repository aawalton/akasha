export interface AgentIdHandle {
  readonly id: string | null
  bind: (agentId: string | null) => undefined
}

export function createAgentIdHandle(initial: string | null): AgentIdHandle {
  let current: string | null = null
  const handle: AgentIdHandle = {
    get id(): string | null {
      return current
    },
    bind(agentId: string | null): undefined {
      current = agentId
      if (agentId === null) delete process.env.AGENT_ID
      else process.env.AGENT_ID = agentId
    },
  }
  handle.bind(initial)
  return handle
}
