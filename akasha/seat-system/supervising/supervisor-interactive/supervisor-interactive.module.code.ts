import type { SeatResume } from "@akasha/seat-system/supervisor-args"
import { decideBootResume } from "@akasha/seat-system/supervisor-args"
import { LOG, SEAT_START_DIR } from "@akasha/seat-system/supervisor-config"
import type { buildAgentLogRedirect } from "@akasha/seat-system/supervisor-console"
import { liveDeferredRestartRule } from "@akasha/seat-system/supervisor-deferred-restart-rule"
import type { CarriedAgentName } from "@akasha/seat-system/supervisor-rebind-carry"
import { askReExecJitterMs } from "@akasha/seat-system/supervisor-self-heal-jitter-rule"
import { setSelfHealIdleProbe } from "@akasha/seat-system/supervisor-self-heal-state"
import { isShuttingDown } from "@akasha/seat-system/supervisor-state"
import { recordTermiosState } from "@akasha/seat-system/supervisor-terminal"
import type { AgentProcess } from "@akasha/seat-system/supervisor-types"
import { buildLoopState } from "@tools/lib/supervisor-loop-state"
import { askProxyAdoption } from "@tools/lib/supervisor-proxy-adoption-rule"
import { askProxyLiveness } from "@tools/lib/supervisor-proxy-liveness-rule"
import { bootInteractiveSession } from "../supervisor-interactive-boot/supervisor-interactive-boot.module.code.ts"
import type { InteractiveOpts } from "../supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"
import {
  acquireIterationChild,
  assembleIterationProcess,
  openIteration,
} from "../supervisor-interactive-iteration/supervisor-interactive-iteration.module.code.ts"
import type { RunInteractiveSeams } from "../supervisor-interactive-seams/supervisor-interactive-seams.module.code.ts"
import { finalizeInteractiveExit } from "../supervisor-interactive-spawn/supervisor-interactive-spawn.module.code.ts"
import {
  settleIterationExit,
  wireIteration,
} from "../supervisor-interactive-wire/supervisor-interactive-wire.module.code.ts"
import { dispatchPostExitOutcome } from "../supervisor-iteration-outcome/supervisor-iteration-outcome.module.code.ts"

export async function runInteractive(
  prompt: string,
  opts: InteractiveOpts,
  agentLog: ReturnType<typeof buildAgentLogRedirect>,
  seams: RunInteractiveSeams
): Promise<void> {
  let agentProc: AgentProcess | undefined
  const cwd = SEAT_START_DIR

  const boot = await bootInteractiveSession({
    opts,
    agentLog,
    getClaudePid: () => agentProc?.proc?.pid ?? null,
    proxyAdoptionRule: askProxyAdoption,
    proxyLivenessRule: askProxyLiveness,
  })
  const {
    inheritedClaude,
    processId,
    selectedAccount,
    configDir,
    agentIdHandle,
    launch,
    proxy,
    anthropicBaseUrl,
    stopCredentialWatch,
    credentialRefreshTimer,
    monitors,
    restrictions,
    mcpConfigNonce,
  } = boot

  setSelfHealIdleProbe({
    getClaudePid: () => agentProc?.proc?.pid ?? null,
    getProxyPort: () => proxy.port,
    selfHealJitterRule: askReExecJitterMs,
    deferredRestartRule: liveDeferredRestartRule,
  })

  let agentId: string | null = boot.agentId
  let sessionId = boot.sessionId
  let currentPrompt = prompt
  let resume: SeatResume = decideBootResume({
    resume: opts.resume,
    sessionId: opts.sessionId,
    prompt,
    headless: opts.headless,
  })
  let adoptOnce: typeof inheritedClaude = inheritedClaude
  let pendingUserPrompt: string | null = null
  let pendingCarriedName: CarriedAgentName | null = null
  if (agentId != null) console.log(`${LOG} Reattached to existing agent ${agentId}`)

  let iterationCount = 0
  const recTermios = (s: string): undefined => recordTermiosState(s, agentLog.getCurrentSink)

  while (true) {
    iterationCount++
    if (opts.exitAfterIterations !== undefined && iterationCount > opts.exitAfterIterations) {
      console.log(
        `${LOG} exit-after-iterations=${opts.exitAfterIterations} reached — exiting runInteractive`
      )
      break
    }
    agentId = await openIteration({
      agentId,
      sessionId,
      selectedAccount,
      launch,
      agentLog,
      agentIdHandle,
      pendingCarriedName,
      pendingUserPrompt,
      setPendingCarriedName: (v) => {
        pendingCarriedName = v
      },
      setPendingUserPrompt: (v) => {
        pendingUserPrompt = v
      },
      bindAgentName: seams.rebindDeps.bindAgentName,
      setSessionId: seams.rebindDeps.setSessionId,
    })

    const { proc, adoptedThisIter, iterMcpPath } = await acquireIterationChild({
      opts,
      agentId,
      configDir,
      cwd,
      mcpConfigNonce,
      restrictions,
      resume,
      sessionId,
      currentPrompt,
      anthropicBaseUrl,
      proxy,
      adoptOnce,
      iterationCount,
      recTermios,
      resolveSeatSpawnDecisions: seams.resolveSeatSpawnDecisions,
      setAdoptOnce: (v) => {
        adoptOnce = v
      },
    })
    if (proc === null) {
      console.warn(
        `${LOG} adopt-fail: inherited Claude confirmed dead, not respawned — exiting loop`
      )
      break
    }

    const assembled = assembleIterationProcess({
      processId,
      agentId,
      sessionId,
      proc,
      selectedAccount,
      credentialRefreshTimer,
      monitors,
      stopCredentialWatch,
      iterMcpPath,
      adoptedThisIter,
      cwd,
      configDir,
      startSessionWatch: seams.startSessionWatch,
    })
    agentProc = assembled.agentProc

    const wiring = await wireIteration({
      agentId,
      proc,
      selectedAccount,
      projDir: assembled.projDir,
      agentIdHandle,
      agentLog,
      proxy,
      getAgentId: () => agentId,
      getAgentProc: () => agentProc,
      setLoopAgentId: (id) => {
        agentId = id
      },
      setLoopSessionId: (id) => {
        sessionId = id
      },
      rebindDeps: seams.rebindDeps,
      startSessionWatch: seams.startSessionWatch,
    })
    agentProc.stopSessionRotatedWatch = wiring.stopSessionRotatedWatch

    const exitCode = await proc.exited
    recTermios(`post-claude-exit iter=${iterationCount} ec=${exitCode}`)
    console.log(`${LOG} Interactive CLI exited with code ${exitCode}`)

    await settleIterationExit(wiring, proc)

    if (isShuttingDown() || !wiring.actionSubsystem.wasSupervisorKill()) {
      if (isShuttingDown()) {
        console.log(`${LOG} Supervisor shutting down — skipping restart check`)
      } else {
        console.log(`${LOG} User-initiated exit — skipping restart check`)
      }
      break
    }

    const loopState = buildLoopState({
      cwd,
      configDir,
      anthropicBaseUrl,
      anthropicAuthToken: opts.anthropicAuthToken,
      headless: opts.headless,
      agentIdHandle,
      getAgentId: () => agentId,
      getSessionId: () => sessionId,
      setLoopAgentId: (id) => {
        agentId = id
      },
      setLoopSessionId: (id) => {
        sessionId = id
      },
      setResume: (v) => {
        resume = v
      },
      setCurrentPrompt: (v) => {
        currentPrompt = v
      },
      setPendingUserPrompt: (v) => {
        pendingUserPrompt = v
      },
      setPendingCarriedName: (v) => {
        pendingCarriedName = v
      },
    })
    const directive = await dispatchPostExitOutcome(wiring.pendingEvent.value, loopState)
    if (directive === "break") break
  }

  await finalizeInteractiveExit({ agentProc, proxy })
}
