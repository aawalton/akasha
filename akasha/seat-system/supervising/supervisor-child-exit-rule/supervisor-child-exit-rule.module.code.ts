import type { AskDecide } from "@akasha/seat-system/supervisor-resume-asks"
import { shape } from "@tools/lib/shape"
import { askRule, type RuleAnswer } from "../supervisor-ask-rule/supervisor-ask-rule.module.code.ts"
import {
  type ChildExitClassification,
  type ChildExitObservation,
  type ChildExitStatus,
  STOP_REASON as DB_STOP_REASON,
  type ShutdownExitWrite,
  type StopReason,
} from "../supervisor-child-exit-decide/supervisor-child-exit-decide.module.code.ts"

const RULE = "childExitRule"

export type {
  ChildExitClassification,
  ChildExitObservation,
  ChildExitStatus,
  ShutdownExitWrite,
  StopReason,
}

const UNREAD_STATUS: ChildExitStatus = { exitCode: null, signal: null }

const UNREAD_COLLAPSE = 1

const statusZ = shape.object({
  exitCode: shape.number().nullable(),
  signal: shape.string().nullable(),
})

const stopReasonZ = shape.enum(Object.values(DB_STOP_REASON))

const declaredZ = shape.record(shape.string(), shape.string())

const DecodeZ = shape.object({ [RULE]: shape.object({ decodeWaitStatus: statusZ }) })

const CollapseZ = shape.object({
  [RULE]: shape.object({ collapseChildExitStatus: shape.number() }),
})

const ClassifyZ = shape.object({
  [RULE]: shape.object({
    stopReason: declaredZ,
    classifyChildExit: shape.object({
      crashed: shape.boolean(),
      stopReason: stopReasonZ,
      reason: shape.string(),
      status: statusZ,
    }),
  }),
})

const ShutdownWriteZ = shape.object({
  [RULE]: shape.object({
    stopReason: declaredZ,
    decideShutdownExitWrite: shape.object({
      stampCleanExit: shape.boolean(),
      stopReason: stopReasonZ,
      recordCrash: shape.boolean(),
    }),
  }),
})

function agreeStopReasons(declared: Record<string, string>): undefined {
  const mismatched = [
    ...Object.entries(DB_STOP_REASON)
      .filter(([key, value]) => declared[key] !== value)
      .map(
        ([key, value]) =>
          `the column says \`${key}\` is \`${value}\`, the rule says \`${declared[key] ?? "nothing"}\``
      ),
    ...Object.keys(declared)
      .filter((key) => !(key in DB_STOP_REASON))
      .map((key) => `the rule declares \`${key}\`, which the column has no value for`),
  ]
  if (mismatched.length > 0)
    throw new Error(
      `the stop reasons the tree declares disagree with the \`stopReason\` column this ` +
        `supervisor writes — ${mismatched.join("; ")}. A row stamped with a reason the column ` +
        "does not hold, or a crash classified as something the rule no longer names, is what " +
        "suppresses the alert that would have reported it, so nothing is stamped from this."
    )
  return undefined
}

export type ChildExitRuleSource = {
  decodeWaitStatus: (raw: number) => Promise<RuleAnswer<ChildExitStatus>>
  collapse: (status: ChildExitStatus) => Promise<RuleAnswer<number>>
  classify: (obs: ChildExitObservation) => Promise<RuleAnswer<ChildExitClassification | null>>
  shutdownWrite: (
    classification: ChildExitClassification | null
  ) => Promise<RuleAnswer<ShutdownExitWrite | null>>
}

export function readDecodeWaitStatus(answered: unknown): ChildExitStatus {
  return DecodeZ.parse(answered)[RULE].decodeWaitStatus
}

export function readCollapse(answered: unknown): number {
  return CollapseZ.parse(answered)[RULE].collapseChildExitStatus
}

export function readClassify(answered: unknown): ChildExitClassification {
  const held = ClassifyZ.parse(answered)[RULE]
  agreeStopReasons(held.stopReason)
  return held.classifyChildExit
}

export function readShutdownWrite(answered: unknown): ShutdownExitWrite {
  const held = ShutdownWriteZ.parse(answered)[RULE]
  agreeStopReasons(held.stopReason)
  return held.decideShutdownExitWrite
}

export function askDecodeWaitStatus(
  raw: number,
  ask?: AskDecide
): Promise<RuleAnswer<ChildExitStatus>> {
  return askRule(RULE, { decodeWaitStatus: raw }, readDecodeWaitStatus, UNREAD_STATUS, ask)
}

export function askCollapse(status: ChildExitStatus, ask?: AskDecide): Promise<RuleAnswer<number>> {
  return askRule(RULE, { collapseChildExitStatus: status }, readCollapse, UNREAD_COLLAPSE, ask)
}

export function askClassify(
  obs: ChildExitObservation,
  ask?: AskDecide
): Promise<RuleAnswer<ChildExitClassification | null>> {
  return askRule(RULE, { stopReason: true, classifyChildExit: obs }, readClassify, null, ask)
}

export function askShutdownWrite(
  classification: ChildExitClassification | null,
  ask?: AskDecide
): Promise<RuleAnswer<ShutdownExitWrite | null>> {
  return askRule(
    RULE,
    { stopReason: true, decideShutdownExitWrite: classification },
    readShutdownWrite,
    null,
    ask
  )
}

export const liveChildExitRule: ChildExitRuleSource = {
  decodeWaitStatus: (raw) => askDecodeWaitStatus(raw),
  collapse: (status) => askCollapse(status),
  classify: (obs) => askClassify(obs),
  shutdownWrite: (classification) => askShutdownWrite(classification),
}
