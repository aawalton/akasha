import type { Answer } from "@akasha/command-system/calling"
import { exerciseNamed, openSession } from "@akasha/exercise-access/exercise-finding"
import { boolIn, numberIn, rowsFor, textIn } from "@akasha/exercise-access/exercise-rows"
import { FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import { readSelectionPolicy } from "@akasha/exercise-access/selection-policy"
import type { SessionSet } from "@akasha/session-planning/next-set"
import { decideNextSet, partitionSkips } from "@akasha/session-planning/next-set"
import { loadSelectorInputs } from "@akasha/session-planning/session-loading"
import type { SelectionEnvelope, SelectorInputs } from "@akasha/session-planning/session-selection"
import { selectSession } from "@akasha/session-planning/session-selection"
import {
  asJson,
  DATA,
  JSON_SAID,
  oneOfIn,
  refusedBy,
  told,
  wantsJson,
  wordsIn,
} from "../exercise-saying/exercise-saying.module.code.ts"

const SESSION = "--session"

const FOCUS = "--focus"

const SKIP = "--skip"

const SHAPE = { valued: [SESSION, FOCUS], repeats: [SKIP], switches: [JSON_SAID] }

const FOCUS_CHOICES: readonly string[] = FOCUS_OPTIONS

const SESSION_SET_LIMIT = 200

const SET_LOG = "set-log"

const TIME_BASED = "time-based"

const NO_LOAD = "pick one allowing the range at the RIR target"

export function withoutSkipped(
  inputs: SelectorInputs,
  skipped: ReadonlySet<string>
): SelectorInputs {
  if (skipped.size === 0) return inputs
  return {
    ...inputs,
    candidates: inputs.candidates.filter((one) => !skipped.has(one.exerciseSlug)),
  }
}

export function coverageLine(envelope: SelectionEnvelope): string {
  const { covered, gaps } = envelope.coverage
  const coveredSaid = covered.length > 0 ? covered.join(", ") : "none yet"
  const gapsSaid = gaps.length > 0 ? gaps.join(", ") : "none"
  return `covered this week: ${coveredSaid} · still open: ${gapsSaid}`
}

type Logged =
  | { readonly byMovement: ReadonlyMap<string, readonly SessionSet[]> }
  | { readonly refused: string }

async function sessionSets(sessionSlug: string): Promise<Logged> {
  const rows = await rowsFor({
    pageTypeSlug: SET_LOG,
    where: [{ key: "sessionSlug", eq: sessionSlug }],
    select: ["id", "exerciseSlug", "setNumber", "reps", "rpe", "isWarmup"],
    limit: SESSION_SET_LIMIT,
  })
  if ("unread" in rows) return { refused: rows.unread }
  const byMovement = new Map<string, SessionSet[]>()
  for (const row of rows.rows) {
    if (boolIn(row, "isWarmup") === true) continue
    const exerciseSlug = textIn(row, "exerciseSlug")
    if (exerciseSlug === undefined) continue
    const held = byMovement.get(exerciseSlug) ?? []
    held.push({
      setNumber: numberIn(row, "setNumber") ?? held.length + 1,
      reps: numberIn(row, "reps") ?? null,
      rpe: numberIn(row, "rpe") ?? null,
    })
    byMovement.set(exerciseSlug, held)
  }
  for (const sets of byMovement.values()) sets.sort((a, b) => a.setNumber - b.setNumber)
  return { byMovement }
}

async function skippedSlugs(
  refs: readonly string[]
): Promise<{ readonly slugs: ReadonlySet<string> } | { readonly refused: readonly string[] }> {
  const slugs = new Set<string>()
  const refusals: string[] = []
  for (const ref of refs) {
    const found = await exerciseNamed(ref)
    if ("refused" in found) refusals.push(found.refused)
    else if (found.row.slug !== null) slugs.add(found.row.slug)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { slugs }
}

export function repsOf(low: number, high: number): string {
  if (low === 0 && high === 0) return TIME_BASED
  return low === high ? `${low}` : `${low}-${high}`
}

export async function exerciseNextSet(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const focus = oneOfIn(said, FOCUS, FOCUS_CHOICES)
  if (typeof focus === "object" && focus !== null) return refusedBy(focus.refused)

  try {
    const found = await openSession(said.named[SESSION], new Date())
    if ("refused" in found) return refusedBy([found.refused], DATA)
    const session = found.row
    if (session.slug === null) {
      return refusedBy([`session ${session.id} carries no slug, so nothing names it`], DATA)
    }
    const skipping = await skippedSlugs(said.repeated[SKIP] ?? [])
    if ("refused" in skipping) return refusedBy(skipping.refused, DATA)

    const [loaded, logged] = await Promise.all([
      loadSelectorInputs(focus, new Date(), readSelectionPolicy()),
      sessionSets(session.slug),
    ])
    if ("refused" in logged) return refusedBy([logged.refused], DATA)
    if (loaded.inputs === null) {
      return refusedBy([
        `no focus is scheduled for ${loaded.dayStr} — say \`${FOCUS} <${FOCUS_CHOICES.join("|")}>\` to train anyway`,
      ])
    }

    const skips = partitionSkips(skipping.slugs, loaded.inputs.sessionPerformed)
    const { plan, envelope } = selectSession(withoutSkipped(loaded.inputs, skips.toExclude))
    const decision = decideNextSet({
      plan,
      loggedByExercise: logged.byMovement,
      skippedAfterPerforming: skips.afterPerforming,
    })

    if (decision.kind === "done") {
      if (wantsJson(said)) {
        return asJson({
          status: "done",
          focus: loaded.focus,
          why: decision.why,
          coverage: envelope.coverage,
        })
      }
      return told(["status\tdone", `why\t${decision.why}`, `coverage\t${coverageLine(envelope)}`])
    }

    const { slot, setNumber, why } = decision
    const reps = repsOf(slot.repRangeLow, slot.repRangeHigh)
    const load = slot.progression.prescribedLoad

    if (wantsJson(said)) {
      return asJson({
        status: "set",
        movement: slot.title,
        exerciseSlug: slot.exerciseSlug,
        set: setNumber,
        ofSets: slot.targetSets,
        reps,
        load,
        rir: slot.targetRir,
        why,
      })
    }
    return told([
      `movement\t${slot.title}`,
      `set\t${setNumber} of ${slot.targetSets}`,
      `reps\t${reps}`,
      `load\t${load ?? NO_LOAD}`,
      `rir\t${slot.targetRir}`,
      `why\t${why}`,
    ])
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
