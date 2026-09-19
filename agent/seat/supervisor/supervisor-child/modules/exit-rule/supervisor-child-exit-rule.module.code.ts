import {
  type ChildExitClassification,
  type ChildExitObservation,
  type ChildExitStatus,
  STOP_REASON as DB_STOP_REASON,
  type ShutdownExitWrite,
} from "akasha/agent/seat/supervisor/supervisor-child/modules/exit-decide/supervisor-child-exit-decide.module.code.ts"
import {
  askRule,
  type RuleAnswer,
} from "akasha/agent/seat/supervisor/supervisor-deciding/modules/supervisor-ask-rule/supervisor-ask-rule.module.code.ts"
import type { AskDecide } from "akasha/agent/seat/supervisor/supervisor-restarting/modules/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"

const RULE = "childExitRule"

const UNREAD_STATUS: ChildExitStatus = { exitCode: null, signal: null }

const UNREAD_COLLAPSE = 1

const statusZ = SHAPE.object({
  exitCode: SHAPE.number().nullable(),
  signal: SHAPE.string().nullable(),
})

const stopReasonZ = SHAPE.enum(Object.values(DB_STOP_REASON))

const declaredZ = SHAPE.record(SHAPE.string(), SHAPE.string())

const DecodeZ = SHAPE.object({ [RULE]: SHAPE.object({ decodeWaitStatus: statusZ }) })

const CollapseZ = SHAPE.object({
  [RULE]: SHAPE.object({ collapseChildExitStatus: SHAPE.number() }),
})

const ClassifyZ = SHAPE.object({
  [RULE]: SHAPE.object({
    stopReason: declaredZ,
    classifyChildExit: SHAPE.object({
      crashed: SHAPE.boolean(),
      stopReason: stopReasonZ,
      reason: SHAPE.string(),
      status: statusZ,
    }),
  }),
})

const ShutdownWriteZ = SHAPE.object({
  [RULE]: SHAPE.object({
    stopReason: declaredZ,
    decideShutdownExitWrite: SHAPE.object({
      stampCleanExit: SHAPE.boolean(),
      stopReason: stopReasonZ,
      recordCrash: SHAPE.boolean(),
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

function readDecodeWaitStatus(answered: unknown): ChildExitStatus {
  return DecodeZ.parse(answered)[RULE].decodeWaitStatus
}

function readCollapse(answered: unknown): number {
  return CollapseZ.parse(answered)[RULE].collapseChildExitStatus
}

function readClassify(answered: unknown): ChildExitClassification {
  const held = ClassifyZ.parse(answered)[RULE]
  agreeStopReasons(held.stopReason)
  return held.classifyChildExit
}

function readShutdownWrite(answered: unknown): ShutdownExitWrite {
  const held = ShutdownWriteZ.parse(answered)[RULE]
  agreeStopReasons(held.stopReason)
  return held.decideShutdownExitWrite
}

function askDecodeWaitStatus(raw: number, ask?: AskDecide): Promise<RuleAnswer<ChildExitStatus>> {
  return askRule(RULE, { decodeWaitStatus: raw }, readDecodeWaitStatus, UNREAD_STATUS, ask)
}

function askCollapse(status: ChildExitStatus, ask?: AskDecide): Promise<RuleAnswer<number>> {
  return askRule(RULE, { collapseChildExitStatus: status }, readCollapse, UNREAD_COLLAPSE, ask)
}

function askClassify(
  obs: ChildExitObservation,
  ask?: AskDecide
): Promise<RuleAnswer<ChildExitClassification | null>> {
  return askRule(RULE, { stopReason: true, classifyChildExit: obs }, readClassify, null, ask)
}

function askShutdownWrite(
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

export const LIVE_CHILD_EXIT_RULE: ChildExitRuleSource = {
  decodeWaitStatus: (raw) => askDecodeWaitStatus(raw),
  collapse: (status) => askCollapse(status),
  classify: (obs) => askClassify(obs),
  shutdownWrite: (classification) => askShutdownWrite(classification),
}
