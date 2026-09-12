import type { Outcome } from "akasha/changes/modules/gated-write/gated-write.module.code.ts"
import { fail } from "akasha/commands/modules/failing/command-failing.module.code.ts"
import { resolveRoots } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import {
  nameFromHistory,
  parentFromHistory,
} from "akasha/seat-system/seat-page-history/seat-page-history.module.code.ts"
import {
  removeSeatPage,
  writeSeatPage,
} from "akasha/seat-system/seat-page-writing/seat-page-writing.module.code.ts"
import { composedNameOf } from "akasha/seat-system/seat-rename/seat-rename.module.code.ts"
import { rotatedOf } from "akasha/seat-system/seat-rotated-session/seat-rotated-session.module.code.ts"
import {
  keepSession,
  sessionRecordOf,
} from "akasha/seat-system/seat-session/seat-session.module.code.ts"
import {
  backfillObserved,
  fallBackToHistory,
  type Stated,
  statedOf,
} from "akasha/seat-system/seat-stated/seat-stated.module.code.ts"
import {
  keepTranscript,
  transcriptRecordOf,
} from "akasha/seat-system/seat-transcript-path/seat-transcript-path.module.code.ts"
import { rotatedTranscriptFor } from "akasha/seat-system/seat-transcript-rotation/seat-transcript-rotation.module.code.ts"

export interface BeatReport {
  readonly outcome: Outcome
  readonly seat: string | null
}

function valueAfter(argv: readonly string[], flag: string): string | null {
  const at = argv.indexOf(flag)
  if (at === -1) return null
  const value = argv[at + 1]
  if (value === undefined) throw new Error(`${flag} takes a value`)
  return value
}

export function statedForPage(
  agentId: string,
  account: string | null = null,
  selfHealAgent: string | null = null,
  selfHealSession: string | null = null
): Stated {
  const read = statedOf(agentId)
  const held = account === null ? read : { ...read, registration: { value: account } }
  if (selfHealAgent !== agentId) return held
  const running = sessionRecordOf(selfHealSession)
  return running === null ? held : { ...held, session: running }
}

export async function beat(argv: readonly string[]): Promise<BeatReport> {
  const agentId = valueAfter(argv, "--agent")
  if (agentId === null) throw new Error("--agent names the seat this writes for")

  const stopReason = valueAfter(argv, "--remove")
  if (stopReason !== null) return { outcome: await removeSeatPage(agentId, stopReason), seat: null }

  const roots = resolveRoots()
  const seat = composedNameOf(agentId) ?? nameFromHistory(agentId, roots)
  if (seat === null) return { outcome: { kind: "unchanged" }, seat: null }

  backfillObserved(agentId)

  const healing = valueAfter(argv, "--self-heal-session")
  if (healing !== null && valueAfter(argv, "--self-heal-agent") === agentId) {
    keepSession(agentId, healing)
  }

  const sessionId = valueAfter(argv, "--session")
  if (sessionId !== null) {
    const running = sessionRecordOf(sessionId)
    if (running === null) return { outcome: { kind: "unchanged" }, seat }
    keepSession(agentId, running.value)
    return { outcome: await writeSeatPage({ ...statedOf(agentId), session: running }, seat), seat }
  }

  const transcriptPath = valueAfter(argv, "--transcript")
  if (transcriptPath !== null) {
    const watching = transcriptRecordOf(rotatedTranscriptFor(agentId) ?? transcriptPath)
    if (watching === null) return { outcome: { kind: "unchanged" }, seat }
    keepTranscript(agentId, watching.value)
    return {
      outcome: await writeSeatPage({ ...statedOf(agentId), transcript: watching }, seat),
      seat,
    }
  }

  if (argv.includes("--clear-rotation")) {
    if (rotatedOf(agentId) === null) return { outcome: { kind: "unchanged" }, seat }
    return { outcome: await writeSeatPage({ ...statedOf(agentId), rotated: null }, seat), seat }
  }

  const stated = fallBackToHistory(
    statedForPage(
      agentId,
      valueAfter(argv, "--account"),
      valueAfter(argv, "--self-heal-agent"),
      valueAfter(argv, "--self-heal-session")
    ),
    seat,
    roots
  )
  const outcome = await writeSeatPage(stated, seat)
  if (outcome.kind !== "unstated") return { outcome, seat }
  const above = parentFromHistory(agentId, roots)
  if (above === null) return { outcome, seat }
  return { outcome: await writeSeatPage(stated, seat, above), seat }
}

if (import.meta.main) {
  let report: BeatReport
  try {
    report = await beat(process.argv.slice(2))
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error))
  }
  process.stdout.write(`${JSON.stringify(report)}\n`)
  if (report.outcome.kind === "refused") process.exitCode = 1
}
