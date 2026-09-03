import { decideClaimedRedelivery } from "@akasha/seat-system/supervisor-claimed-redelivery-decide"
import {
  parseClaimedRedelivery,
  parseLimitResume,
  parseRcDegraded,
  parseRemoteControl,
  parseRestartNotice,
  parseUncertainWait,
  parseWaitResume,
} from "@akasha/seat-system/supervisor-decide-payload"
import { RULE_DECISIONS } from "@akasha/seat-system/supervisor-decide-rules"
import {
  decideLimitResume,
  LIMIT_RESUME_FLOOR_MS,
  type LimitResumeDecision,
} from "@akasha/seat-system/supervisor-limit-resume-decide"
import { decideRcDegradedBatch } from "@akasha/seat-system/supervisor-rc-degraded-decide"
import { decideRemoteControlBatch } from "@akasha/seat-system/supervisor-remote-control-decide"
import {
  planRestartNotice,
  type ResumeNotices,
} from "@akasha/seat-system/supervisor-restart-notice-decide"
import { decideUncertainBlockBatch } from "@akasha/seat-system/supervisor-uncertain-wait-decide"
import {
  decideWaitResume,
  type WaitResumeDecision,
} from "@akasha/seat-system/supervisor-wait-resume-decide"
import { fail } from "@tools/lib/command"
import { readPayload, record, rejectUnknownFlags } from "@tools/lib/payload"
import { notices } from "../compose-notices/compose-notices.module.code.ts"

const NUDGE_NOTICE = "limit-resume-nudge"
const WAIT_NUDGE_NOTICE = "wait-resume-nudge"
const NOTICE_OWNER = "akasha/seat-system/compose-notices/compose-notices.module.code.ts"

function requireNotice(all: Readonly<Record<string, string>>, key: string): string {
  const text = all[key]
  if (text === undefined) {
    fail(
      `no notice is called \`${key}\` — ${NOTICE_OWNER} owns that name and the document behind ` +
        "it, and a notice carrying nothing would reach a seat as an empty turn"
    )
  }
  return text
}

function resumeNotices(): ResumeNotices {
  const all = notices()
  return {
    "restart-immediate": requireNotice(all, "restart-immediate"),
    "restart-deferred": requireNotice(all, "restart-deferred"),
    "restart-recovery-clause": requireNotice(all, "restart-recovery-clause"),
  }
}

export type LimitResumeAnswer =
  | {
      readonly kind: "nudge"
      readonly reason: string
      readonly nudge: string
      readonly floorMs: number
    }
  | { readonly kind: "wait"; readonly reason: string }
  | { readonly kind: "hold"; readonly reason: string }

function limitResumeAnswer(decision: LimitResumeDecision): LimitResumeAnswer {
  if (decision.kind !== "nudge") return decision
  const nudge = requireNotice(notices(), NUDGE_NOTICE)
  return { kind: "nudge", reason: decision.reason, nudge, floorMs: LIMIT_RESUME_FLOOR_MS }
}

export type WaitResumeAnswer =
  | {
      readonly kind: "nudge"
      readonly reason: string
      readonly attempt: number
      readonly nudge: string
    }
  | { readonly kind: "wait"; readonly reason: string; readonly readyAtMs: number }
  | { readonly kind: "hold"; readonly reason: string }

function waitResumeAnswer(decision: WaitResumeDecision): WaitResumeAnswer {
  if (decision.kind !== "nudge") return decision
  const nudge = requireNotice(notices(), WAIT_NUDGE_NOTICE)
  return { kind: "nudge", reason: decision.reason, attempt: decision.attempt, nudge }
}

const DECISIONS: Readonly<Record<string, (value: unknown, path: string) => unknown>> = {
  uncertainWait: (value, path) => decideUncertainBlockBatch(parseUncertainWait(value, path)),
  remoteControl: (value, path) => decideRemoteControlBatch(parseRemoteControl(value, path)),
  claimedRedelivery: (value, path) => decideClaimedRedelivery(parseClaimedRedelivery(value, path)),
  limitResume: (value, path) => limitResumeAnswer(decideLimitResume(parseLimitResume(value, path))),
  waitResume: (value, path) => waitResumeAnswer(decideWaitResume(parseWaitResume(value, path))),
  rcDegraded: (value, path) => decideRcDegradedBatch(parseRcDegraded(value, path)),
  restartNotice: (value, path) => {
    const { event, ctx } = parseRestartNotice(value, path)
    return planRestartNotice(event, ctx, resumeNotices())
  },
  ...RULE_DECISIONS,
}

const KEYS: readonly string[] = Object.keys(DECISIONS)

export function answer(payload: Record<string, unknown>): Record<string, unknown> {
  const asked = Object.keys(payload)
  if (asked.length === 0) {
    fail(`the payload asks nothing — this command takes ${KEYS.join(", ")}`)
  }
  const stray = asked.filter((key) => !KEYS.includes(key))
  if (stray.length > 0) {
    fail(
      `\`${stray.join("`, `")}\` names no decision this command makes — it takes ${KEYS.join(", ")}`
    )
  }
  const answers: Record<string, unknown> = {}
  for (const key of asked) {
    const decide = DECISIONS[key]
    if (decide === undefined) continue
    answers[key] = decide(payload[key], key)
  }
  return answers
}

function rejectArguments(argv: readonly string[]): void {
  rejectUnknownFlags(argv, [], [])
  const [first] = argv
  if (first !== undefined) {
    fail(
      `\`${first}\` is an argument and this command takes none — the whole call is the JSON on stdin`
    )
  }
}

async function main(): Promise<void> {
  rejectArguments(process.argv.slice(2))
  const payload = record(await readPayload("-"), "the payload")
  process.stdout.write(`${JSON.stringify(answer(payload), null, 2)}\n`)
}

if (import.meta.main) await main()
