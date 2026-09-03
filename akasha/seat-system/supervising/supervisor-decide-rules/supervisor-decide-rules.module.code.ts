import {
  isIdleForPreservingRestart,
  isIdleForPreservingRestartPastCliff,
  isIgnoredMcpChildCmdline,
  preservingRestartBusyReason,
} from "@akasha/seat-system/supervisor-idle-decide"
import {
  decidePreCliffRestart,
  type PreCliffObservation,
} from "@akasha/seat-system/supervisor-precliff-restart-decide"
import {
  decideProxyAdoption,
  type ProxyAdoptionInput,
} from "@akasha/seat-system/supervisor-proxy-adoption-decide"
import { decideProxyLiveness } from "@akasha/seat-system/supervisor-proxy-liveness-decide"
import { fail } from "@tools/lib/command"
import { arr, bool, maybe, num, obj, str } from "@tools/lib/narrow"
import {
  computeReExecJitterMs,
  resolveMaxReExecJitterMs,
} from "@tools/lib/supervisor-self-heal-jitter-decide"
import {
  classifyChildExit,
  collapseChildExitStatus,
  decideShutdownExitWrite,
  decodeWaitStatus,
  STOP_REASON,
} from "../supervisor-child-exit-decide/supervisor-child-exit-decide.module.code.ts"
import {
  childExitClassification,
  childExitObservation,
  childExitStatus,
  deferredRestartConfig,
  deferredRestartObservation,
  deferredRestartState,
  idleObservation,
  proxyLivenessState,
  rawEnv,
} from "../supervisor-decide-rule-inputs/supervisor-decide-rule-inputs.module.code.ts"
import {
  decideDeferredRestart,
  EDGE_CONNECTION_CLIFF_OVERRIDE_MS,
  EDGE_CONNECTION_CLIFF_PREEMPT_MS,
  INITIAL_DEFERRED_RESTART_STATE,
  resolveMaxDeferMs,
  resolvePreCliffOverrideMs,
  resolveStaleWedgeMs,
} from "../supervisor-deferred-restart-decide/supervisor-deferred-restart-decide.module.code.ts"

function sub(
  value: unknown,
  path: string,
  handlers: Readonly<Record<string, (value: unknown, path: string) => unknown>>
): Record<string, unknown> {
  const question = obj(value, path)
  const asked = Object.keys(question)
  const keys = Object.keys(handlers)
  if (asked.length === 0) fail(`\`${path}\` asks nothing — it takes ${keys.join(", ")}`)
  const stray = asked.filter((key) => !keys.includes(key))
  if (stray.length > 0)
    fail(
      `\`${stray.map((key) => `${path}.${key}`).join("`, `")}\` names nothing this rule ` +
        `answers — it takes ${keys.join(", ")}`
    )
  const answers: Record<string, unknown> = {}
  for (const key of asked) {
    const handler = handlers[key]
    if (handler === undefined) continue
    answers[key] = handler(question[key], `${path}.${key}`)
  }
  return answers
}

export const RULE_DECISIONS: Readonly<Record<string, (value: unknown, path: string) => unknown>> = {
  idleRule: (value, path) =>
    sub(value, path, {
      ignoredMcpCmdlines: (v, p) =>
        arr(v, p).map((line, at) => isIgnoredMcpChildCmdline(str(line, `${p}[${at}]`))),
      preservingRestart: (v, p) => isIdleForPreservingRestart(idleObservation(v, p)),
      preservingRestartPastCliff: (v, p) =>
        isIdleForPreservingRestartPastCliff(idleObservation(v, p)),
      busyReason: (v, p) => {
        const o = obj(v, p)
        const ignore =
          o.ignoreBusyChildren === undefined
            ? undefined
            : bool(o.ignoreBusyChildren, `${p}.ignoreBusyChildren`)
        return preservingRestartBusyReason(
          idleObservation(o.obs, `${p}.obs`),
          ignore === undefined ? undefined : { ignoreBusyChildren: ignore }
        )
      },
    }),

  childExitRule: (value, path) =>
    sub(value, path, {
      stopReason: () => STOP_REASON,
      decodeWaitStatus: (v, p) => decodeWaitStatus(num(v, p)),
      collapseChildExitStatus: (v, p) => collapseChildExitStatus(childExitStatus(v, p)),
      classifyChildExit: (v, p) => classifyChildExit(childExitObservation(v, p)),
      decideShutdownExitWrite: (v, p) =>
        decideShutdownExitWrite(maybe(v, p, childExitClassification)),
    }),

  deferredRestartRule: (value, path) =>
    sub(value, path, {
      constants: () => ({
        INITIAL_DEFERRED_RESTART_STATE,
        EDGE_CONNECTION_CLIFF_PREEMPT_MS,
        EDGE_CONNECTION_CLIFF_OVERRIDE_MS,
      }),
      decideDeferredRestart: (v, p) => {
        const o = obj(v, p)
        return decideDeferredRestart(
          deferredRestartState(o.state, `${p}.state`),
          deferredRestartObservation(o.obs, `${p}.obs`),
          o.config === undefined ? undefined : deferredRestartConfig(o.config, `${p}.config`)
        )
      },
      resolveMaxDeferMs: (v, p) => resolveMaxDeferMs(rawEnv(v, p)),
      resolveStaleWedgeMs: (v, p) => resolveStaleWedgeMs(rawEnv(v, p)),
      resolvePreCliffOverrideMs: (v, p) => resolvePreCliffOverrideMs(rawEnv(v, p)),
    }),

  preCliffRestartRule: (value, path) =>
    sub(value, path, {
      decidePreCliffRestart: (v, p) => {
        const o = obj(v, p)
        const obs = obj(o.obs, `${p}.obs`)
        const observation: PreCliffObservation = {
          childAgeMs: maybe(obs.childAgeMs, `${p}.obs.childAgeMs`, num),
          alreadyArmed: bool(obs.alreadyArmed, `${p}.obs.alreadyArmed`),
          deferredOrActionPending: bool(
            obs.deferredOrActionPending,
            `${p}.obs.deferredOrActionPending`
          ),
        }
        return decidePreCliffRestart(observation, num(o.thresholdMs, `${p}.thresholdMs`))
      },
    }),

  proxyAdoptionRule: (value, path) =>
    sub(value, path, {
      decideProxyAdoption: (v, p) => {
        const o = obj(v, p)
        const input: ProxyAdoptionInput = {
          hasLiveProxy: bool(o.hasLiveProxy, `${p}.hasLiveProxy`),
          versionMatches: bool(o.versionMatches, `${p}.versionMatches`),
          healthy: bool(o.healthy, `${p}.healthy`),
        }
        return decideProxyAdoption(input)
      },
    }),

  proxyLivenessRule: (value, path) =>
    sub(value, path, {
      decideProxyLiveness: (v, p) => {
        const o = obj(v, p)
        return decideProxyLiveness(
          proxyLivenessState(o.state, `${p}.state`),
          bool(o.healthy, `${p}.healthy`)
        )
      },
    }),

  selfHealJitterRule: (value, path) =>
    sub(value, path, {
      reExecJitterMs: (v, p) => {
        const o = obj(v, p)
        return computeReExecJitterMs(
          num(o.randFloat, `${p}.randFloat`),
          resolveMaxReExecJitterMs(rawEnv(o.rawMaxJitterMs, `${p}.rawMaxJitterMs`))
        )
      },
    }),
}
