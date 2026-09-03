import type { AskDecide } from "@akasha/seat-system/supervisor-resume-asks"
import { shape } from "@tools/lib/shape"
import { askRule, type RuleAnswer } from "../supervisor-ask-rule/supervisor-ask-rule.module.code.ts"

const RULE = "deferredRestartRule"

export type DeferredRestartObservation = {
  idle: boolean
  busyReason?: string
  transcriptMtimeMs?: number | null
}

export type DeferredRestartConfig = { ceilingTicks?: number; staleTicks?: number }

export type DeferredRestartState = {
  idleStreak: number
  elapsedTicks: number
  staleStreak: number
  prevBusyReason: string | null
  prevTranscriptMtimeMs: number | null
}

export type DeferredRestartFireReason = "idle" | "stale-wedge" | "ceiling"

export type DeferredRestartVerdict = {
  readonly state: DeferredRestartState | null
  readonly fire: boolean
  readonly fireReason: DeferredRestartFireReason | null
}

export type DeferredRestartConstants = {
  readonly INITIAL_DEFERRED_RESTART_STATE: DeferredRestartState
  readonly EDGE_CONNECTION_CLIFF_PREEMPT_MS: number
  readonly EDGE_CONNECTION_CLIFF_OVERRIDE_MS: number
}

export type DeferredRestartRawWindows = {
  readonly maxDeferMs: string | undefined
  readonly staleWedgeMs: string | undefined
  readonly preCliffOverrideMs: string | undefined
}

export type DeferredRestartWindows = {
  readonly maxDeferMs: number
  readonly staleWedgeMs: number
  readonly preCliffOverrideMs: number
}

const stateZ = shape.object({
  idleStreak: shape.number(),
  elapsedTicks: shape.number(),
  staleStreak: shape.number(),
  prevBusyReason: shape.string().nullable(),
  prevTranscriptMtimeMs: shape.number().nullable(),
})

const ConstantsZ = shape.object({
  [RULE]: shape.object({
    constants: shape.object({
      INITIAL_DEFERRED_RESTART_STATE: stateZ,
      EDGE_CONNECTION_CLIFF_PREEMPT_MS: shape.number(),
      EDGE_CONNECTION_CLIFF_OVERRIDE_MS: shape.number(),
    }),
  }),
})

const DecideZ = shape.object({
  [RULE]: shape.object({
    decideDeferredRestart: shape.object({
      state: stateZ,
      fire: shape.boolean(),
      fireReason: shape.enum(["idle", "stale-wedge", "ceiling"]).nullable(),
    }),
  }),
})

const WindowsZ = shape.object({
  [RULE]: shape.object({
    resolveMaxDeferMs: shape.number(),
    resolveStaleWedgeMs: shape.number(),
    resolvePreCliffOverrideMs: shape.number(),
  }),
})

export type DeferredRestartRuleSource = {
  constants: () => Promise<RuleAnswer<DeferredRestartConstants | null>>
  decide: (
    state: DeferredRestartState | null,
    obs: DeferredRestartObservation,
    config?: DeferredRestartConfig
  ) => Promise<RuleAnswer<DeferredRestartVerdict>>
  windows: (raw: DeferredRestartRawWindows) => Promise<RuleAnswer<DeferredRestartWindows | null>>
}

export function readConstants(answered: unknown): DeferredRestartConstants {
  return ConstantsZ.parse(answered)[RULE].constants
}

export function readDecide(answered: unknown): DeferredRestartVerdict {
  return DecideZ.parse(answered)[RULE].decideDeferredRestart
}

export function readWindows(answered: unknown): DeferredRestartWindows {
  const held = WindowsZ.parse(answered)[RULE]
  return {
    maxDeferMs: held.resolveMaxDeferMs,
    staleWedgeMs: held.resolveStaleWedgeMs,
    preCliffOverrideMs: held.resolvePreCliffOverrideMs,
  }
}

export function askConstants(
  ask?: AskDecide
): Promise<RuleAnswer<DeferredRestartConstants | null>> {
  return askRule(RULE, { constants: true }, readConstants, null, ask)
}

export function askDecide(
  state: DeferredRestartState | null,
  obs: DeferredRestartObservation,
  config?: DeferredRestartConfig,
  ask?: AskDecide
): Promise<RuleAnswer<DeferredRestartVerdict>> {
  return askRule(
    RULE,
    { decideDeferredRestart: config === undefined ? { state, obs } : { state, obs, config } },
    readDecide,
    { state, fire: false, fireReason: null },
    ask
  )
}

export function askWindows(
  raw: DeferredRestartRawWindows,
  ask?: AskDecide
): Promise<RuleAnswer<DeferredRestartWindows | null>> {
  return askRule(
    RULE,
    {
      resolveMaxDeferMs: raw.maxDeferMs ?? null,
      resolveStaleWedgeMs: raw.staleWedgeMs ?? null,
      resolvePreCliffOverrideMs: raw.preCliffOverrideMs ?? null,
    },
    readWindows,
    null,
    ask
  )
}

export const liveDeferredRestartRule: DeferredRestartRuleSource = {
  constants: () => askConstants(),
  decide: (state, obs, config) => askDecide(state, obs, config),
  windows: (raw) => askWindows(raw),
}
