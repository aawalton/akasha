import { askProxyAdoption } from "akasha/agent/seat/model-gateway/modules/supervisor-gateway-adoption-rule/supervisor-gateway-adoption-rule.module.code.ts"
import { askProxyLiveness } from "akasha/agent/seat/model-gateway/modules/supervisor-gateway-liveness-rule/supervisor-gateway-liveness-rule.module.code.ts"
import { LIVE_DEFERRED_RESTART_RULE } from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-deferred-restart-rule/supervisor-deferred-restart-rule.module.code.ts"
import { finalizeInteractiveExit } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-interactive-spawn/supervisor-interactive-spawn.module.code.ts"
import type { buildAgentLogRedirect } from "akasha/agent/seat/supervisor/supervisor-log/modules/supervisor-console/supervisor-console.module.code.ts"
import { buildLoopState } from "akasha/agent/seat/supervisor/supervisor-loop/modules/state/supervisor-loop-state.module.code.ts"
import {
  acquireIterationChild,
  assembleIterationProcess,
  openIteration,
} from "akasha/agent/seat/supervisor/supervisor-loop/modules/supervisor-interactive-iteration/supervisor-interactive-iteration.module.code.ts"
import type { RunInteractiveSeams } from "akasha/agent/seat/supervisor/supervisor-loop/modules/supervisor-interactive-seams/supervisor-interactive-seams.module.code.ts"
import {
  settleIterationExit,
  wireIteration,
} from "akasha/agent/seat/supervisor/supervisor-loop/modules/supervisor-interactive-wire/supervisor-interactive-wire.module.code.ts"
import { dispatchPostExitOutcome } from "akasha/agent/seat/supervisor/supervisor-loop/modules/supervisor-iteration-outcome/supervisor-iteration-outcome.module.code.ts"
import type { SeatResume } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-args/supervisor-args.module.code.ts"
import { decideBootResume } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-args/supervisor-args.module.code.ts"
import {
  LOG,
  SEAT_START_DIR,
} from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import { isShuttingDown } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-state/supervisor-state.module.code.ts"
import type { AgentProcess } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-types/supervisor-types.module.code.ts"
import type { CarriedAgentName } from "akasha/agent/seat/supervisor/supervisor-rebinding/modules/supervisor-rebind-carry/supervisor-rebind-carry.module.code.ts"
import { recordTermiosState } from "akasha/agent/seat/supervisor/supervisor-shutdown/modules/supervisor-terminal/supervisor-terminal.module.code.ts"
import { bootInteractiveSession } from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-interactive-boot/supervisor-interactive-boot.module.code.ts"
import type { InteractiveOpts } from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"
import { setRestartIdleProbe } from "akasha/agent/seat/supervisor-restart/modules/state/supervisor-restart-state.module.code.ts"

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

  setRestartIdleProbe({
    getClaudePid: () => agentProc?.proc?.pid ?? null,
    getProxyPort: () => proxy.port,
    deferredRestartRule: LIVE_DEFERRED_RESTART_RULE,
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
      agentIdHandle,
      proxy,
    })

    const exitCode = await proc.exited
    recTermios(`post-claude-exit iter=${iterationCount} ec=${exitCode}`)
    console.log(`${LOG} Interactive CLI exited with code ${exitCode}`)

    await settleIterationExit(wiring, proc)

    if (isShuttingDown() || !wiring.actionSubsystem.wasSupervisorKill()) {
      if (isShuttingDown()) {
        console.log(`${LOG} Supervisor shutting down — skipping restart check`)
      } else if (exitCode === 0) {
        console.log(`${LOG} User-initiated exit — skipping restart check`)
      } else {
        console.log(
          `${LOG} the child exited ${exitCode} and this supervisor issued no kill, so something ` +
            "outside signalled it — skipping restart check"
        )
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
