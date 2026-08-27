export const tool = {
  summary: "Ask Alan whether he is still in the same tracked block, with one quick option asserting all three values",
  repos: ["instructions"],
} as const

import { askAlanForPersona } from "../tools/lib/ask-alan.ts"
import { listPersonaTargets } from "../tools/lib/persona-wake-slugs.ts"
import { dataError } from "../tools/lib/exit.ts"
import { emitReading, type ReadingFinding } from "../tools/lib/reading-channel.ts"
import {
  readConfirmStreamQuestions,
  readOpenBlock,
} from "../tools/lib/tracking/hourly-confirm-reads.ts"
import {
  decideHourlyConfirm,
  type HourlyConfirmDecision,
  TRACKING_HOURLY_CONFIRM_SOURCE,
} from "../tools/lib/tracking/hourly-confirm.ts"
import { pagesClient } from "../tools/lib/tracking-capability.ts"

const CONFIRM_PERSONA_SLUG = "amy"

const READING_SUBJECT = "the-hourly-confirmation"

const HELP = `bun services/tracking-hourly-confirm.ts — ask Alan whether he is still in the same block

Assembles his format — \`Still {activity} s{safety}d{difficulty}?\` — from the open
session and offers one quick option asserting all three values, so a tapped answer is a
measurement rather than a rating carried forward. A block missing a rating is still asked
about, as \`Still {activity}?\` with no option: the option's whole job is asserting three
values, and the absent one is never invented.

THREE GATES, EACH A FACT ABOUT THE LEDGER. No block is open; this automation already holds
an unanswered question; an earlier answer has not been applied to the ledger yet, however
many blocks ago it was asked. Nothing about the moment the run fires in reaches the
decision — a gate on the moment costs the whole hour, and a suppressed question reaches
nobody. The stream is self-limiting by design: an unanswered question blocks the next, so
the opt-out is doing nothing, and nothing here ever re-prompts.

A DECLINE EXITS 0. Unlike an ingest that wrote nothing, a decline is the design working,
and a unit left \`failed\` through every night Alan sleeps would destroy the signal rather
than carry it. A stalled stream is detected from the DATA — an open question nobody
answered — which no exit code this chooses can fool.

Usage:
  bun ~/repos/instructions/services/tracking-hourly-confirm.ts [--dry-run] [--json]

  --dry-run  Decide and report, without opening a question or notifying Alan.
  --json     Emit the full decision envelope instead of the reading.
  --help     This.
`

interface TickReading {
  readonly state: string
  readonly subject: string
  readonly reason: string
  readonly observedAtMs: number
  readonly coverage: {
    readonly observed: number
    readonly declared: number
    readonly unit: string
  }
  readonly evidence: Record<string, unknown>
  readonly findings: readonly ReadingFinding[]
}

function tickReading(args: {
  readonly decision: HourlyConfirmDecision
  readonly streamQuestions: number
  readonly nowMs: number
  readonly openedQuestionId: string | undefined
}): TickReading {
  const { decision, nowMs } = args

  if (decision.fire) {
    const opened =
      args.openedQuestionId === undefined
        ? "dry run — nothing opened"
        : `question ${args.openedQuestionId}`
    return {
      state: "asked",
      subject: READING_SUBJECT,
      reason: `asked "${decision.title}" (${opened})`,
      observedAtMs: nowMs,
      coverage: {
        observed: args.streamQuestions,
        declared: args.streamQuestions,
        unit: "stream questions",
      },
      evidence: { title: decision.title, option: decision.option },
      findings: [],
    }
  }
  return {
    state: "declined",
    subject: READING_SUBJECT,
    reason: `${decision.detail} (${decision.reason})`,
    observedAtMs: nowMs,
    coverage: { observed: 0, declared: 0, unit: "stream questions" },
    evidence: { because: decision.reason },
    findings: [],
  }
}

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const json = argv.includes("--json")
  const dryRun = argv.includes("--dry-run")

  const targets = await listPersonaTargets()
  const persona = targets.find((t) => t.slug === CONFIRM_PERSONA_SLUG)
  if (persona === undefined) {
    throw dataError(
      `hourly-confirm: no '${CONFIRM_PERSONA_SLUG}' persona page — the question has nobody to be attributed to`
    )
  }

  const sb = await pagesClient().then((c) => c.getPageAccessClient())
  const openBlock = await readOpenBlock(sb)
  const personaQuestions = await readConfirmStreamQuestions(sb, persona.id)

  const nowMs = Date.now()
  const decision = decideHourlyConfirm({ openBlock, personaQuestions })

  const result =
    decision.fire && !dryRun
      ? await askAlanForPersona({
          persona,
          question: decision.title,
          agentId: TRACKING_HOURLY_CONFIRM_SOURCE,
          extras: decision.option === null ? {} : { options: [decision.option] },
        })
      : undefined

  if (json) {
    process.stdout.write(
      `${JSON.stringify(
        decision.fire
          ? {
              decision: "fire",
              dryRun: dryRun ? true : undefined,
              title: decision.title,
              option: decision.option,
              question: result?.questionId,
              created: result?.created,
              notified: result?.notified,
            }
          : {
              decision: "decline",
              reason: decision.reason,
              detail: decision.detail,
            }
      )}\n`
    )
    return 0
  }

  emitReading(
    tickReading({
      decision,
      streamQuestions: personaQuestions.length,
      nowMs,
      openedQuestionId: result?.questionId,
    })
  )
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
