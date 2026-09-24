import type { SeatResume } from "akasha/agent/seat/supervisor/modules/supervisor-args/supervisor-args.module.code.ts"
import type { AgentIdHandle } from "akasha/agent/seat/supervisor/modules/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import type { CarriedAgentName } from "akasha/agent/seat/supervisor/supervisor-rebinding/modules/supervisor-rebind-carry/supervisor-rebind-carry.module.code.ts"

export type LoopState = {
  cwd: string
  configDir: string
  anthropicBaseUrl: string
  anthropicAuthToken?: string
  headless: boolean
  getAgentId: () => string
  getSessionId: () => string
  setAgentId: (id: string | null) => void
  setSessionId: (id: string) => void
  setResume: (value: SeatResume) => void
  setCurrentPrompt: (value: string) => void
  setPendingUserPrompt: (value: string | null) => void
  setPendingCarriedName: (value: CarriedAgentName | null) => void
}

export function buildLoopState(args: {
  cwd: string
  configDir: string
  anthropicBaseUrl: string
  anthropicAuthToken?: string
  headless: boolean
  agentIdHandle: AgentIdHandle
  getAgentId: () => string | null
  getSessionId: () => string
  setLoopAgentId: (id: string | null) => void
  setLoopSessionId: (id: string) => void
  setResume: (value: SeatResume) => void
  setCurrentPrompt: (value: string) => void
  setPendingUserPrompt: (value: string | null) => void
  setPendingCarriedName: (value: CarriedAgentName | null) => void
}): LoopState {
  return {
    cwd: args.cwd,
    configDir: args.configDir,
    anthropicBaseUrl: args.anthropicBaseUrl,
    anthropicAuthToken: args.anthropicAuthToken,
    headless: args.headless,
    getAgentId: () => {
      const id = args.getAgentId()
      if (id == null) throw new Error("agentId not initialized")
      return id
    },
    getSessionId: args.getSessionId,
    setAgentId: (id) => {
      args.setLoopAgentId(id)
      args.agentIdHandle.bind(id)
    },
    setSessionId: args.setLoopSessionId,
    setResume: args.setResume,
    setCurrentPrompt: args.setCurrentPrompt,
    setPendingUserPrompt: args.setPendingUserPrompt,
    setPendingCarriedName: args.setPendingCarriedName,
  }
}
