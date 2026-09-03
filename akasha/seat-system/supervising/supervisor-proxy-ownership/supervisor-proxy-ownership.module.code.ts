import {
  type OAuthProxyState,
  readProxyState,
} from "../../seat-proxy-state/seat-proxy-state.module.code.ts"

export type { OAuthProxyState }

export type ProxyStopDecision = { stop: boolean; reason: string }

export function decideProxyStop(input: {
  selfPid: number
  handlePid: number
  state: OAuthProxyState | null
}): ProxyStopDecision {
  const { selfPid, handlePid, state } = input
  if (state === null) {
    return { stop: true, reason: "no-state" }
  }
  if (state.pid !== handlePid) {
    return { stop: false, reason: "state-pid-mismatch" }
  }
  if (state.supervisorPid == null) {
    return { stop: true, reason: "no-owner-recorded" }
  }
  if (state.supervisorPid === selfPid) {
    return { stop: true, reason: "owner" }
  }
  return { stop: false, reason: "owned-by-other-supervisor" }
}

export function stopByPid(pid: number): undefined {
  try {
    process.kill(pid, "SIGTERM")
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ESRCH") return
    console.error(`[supervisor] kill(${pid}, SIGTERM) failed:`, err)
  }
}

export function stopProxyIfOwned(agentId: string, handlePid: number): undefined {
  let state: OAuthProxyState | null
  try {
    state = readProxyState(agentId)
  } catch (err) {
    console.error(`[supervisor] proxy ownership read failed for ${agentId}:`, err)
    stopByPid(handlePid)
    return
  }
  const decision = decideProxyStop({ selfPid: process.pid, handlePid, state })
  if (decision.stop) {
    stopByPid(handlePid)
    return
  }
  console.log(
    `[supervisor] skipping oauth-proxy SIGTERM (pid=${handlePid}, agent=${agentId}): ${decision.reason}`
  )
}
