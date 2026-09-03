import type { ChildExitStatus } from "../supervisor-child-exit-rule/supervisor-child-exit-rule.module.code.ts"

export type PipedProc = {
  stdin: import("bun").FileSink
  stdout: ReadableStream<Uint8Array>
  stderr: ReadableStream<Uint8Array>
  exited: Promise<number>
  pid: number
  kill: (signal?: string | number) => void
}

export type InheritedProc = {
  exited: Promise<number>
  exitStatus: () => ChildExitStatus
  pid: number
  kill: (signal?: string | number) => void
}

export type AgentProcess = {
  process_id: string
  agent_id: string
  user_id: string
  session_id: string
  started_at: string
  proc: PipedProc | InheritedProc | null
  interactive: boolean
  currentAccount: string
  credentialRefreshTimer: ReturnType<typeof setInterval> | null
  heartbeatTimer: ReturnType<typeof setInterval> | null
  stopCredentialWatch: (() => void) | null
  proxyLivenessMonitor: { stop: () => void } | null
  limitResumeMonitor: { stop: () => void } | null
  waitResumeMonitor: { stop: () => void } | null
  mcpConfigPath: string | null
  configDir: string | null
  stopSessionWatch?: () => void
  stopSessionRotatedWatch?: () => void
  idle?: boolean
  adopted?: boolean
}
