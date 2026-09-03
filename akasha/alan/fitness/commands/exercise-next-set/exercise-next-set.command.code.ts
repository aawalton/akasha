import type { Answer } from "@akasha/command-system/calling"
import { FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import { readSelectionPolicy } from "@akasha/exercise-access/selection-policy"
import { fieldBool, fieldNum, fieldStr } from "@collections/exercises/cli/fields"
import { resolveExercise, resolveOpenSession } from "@collections/exercises/cli/resolve"
import { getPages } from "@collections/exercises/pages/access"
import type { SessionSet } from "@collections/exercises/selection/next-set"
import { decideNextSet, partitionSkips } from "@collections/exercises/selection/next-set"
import type { SelectionEnvelope, SelectorInputs } from "@collections/exercises/selection/selector"
import { selectSession } from "@collections/exercises/selection/selector"
import { loadSelectorInputs } from "@collections/exercises/selection/selector-load"
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

const TIME_BASED = "time-based"

const NO_LOAD = "pick one allowing the range at the RIR target"

export function withoutSkipped(
  inputs: SelectorInputs,
  skipped: ReadonlySet<string>
): SelectorInputs {
  if (skipped.size === 0) return inputs
  return { ...inputs, candidates: inputs.candidates.filter((one) => !skipped.has(one.id)) }
}

export function coverageLine(envelope: SelectionEnvelope): string {
  const { covered, gaps } = envelope.coverage
  const coveredSaid = covered.length > 0 ? covered.join(", ") : "none yet"
  const gapsSaid = gaps.length > 0 ? gaps.join(", ") : "none"
  return `covered this week: ${coveredSaid} · still open: ${gapsSaid}`
}

async function sessionSets(
  sessionSlug: string
): Promise<ReadonlyMap<string, readonly SessionSet[]>> {
  const rows = await getPages({
    pageTypeSlug: "set-log",
    where: [{ key: "sessionSlug", eq: sessionSlug }],
    select: ["id", "exerciseSlug", "setNumber", "reps", "rpe", "isWarmup"],
    limit: SESSION_SET_LIMIT,
  })
  const byMovement = new Map<string, SessionSet[]>()
  for (const row of rows.rows) {
    if (fieldBool(row, "isWarmup") === true) continue
    const exerciseSlug = fieldStr(row, "exerciseSlug")
    if (exerciseSlug === undefined) continue
    const held = byMovement.get(exerciseSlug) ?? []
    held.push({
      setNumber: fieldNum(row, "setNumber") ?? held.length + 1,
      reps: fieldNum(row, "reps") ?? null,
      rpe: fieldNum(row, "rpe") ?? null,
    })
    byMovement.set(exerciseSlug, held)
  }
  for (const sets of byMovement.values()) sets.sort((a, b) => a.setNumber - b.setNumber)
  return byMovement
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
    const session = await resolveOpenSession(said.named[SESSION])
    if (session.slug === null) {
      return refusedBy([`session ${session.id} carries no slug, so nothing names it`], DATA)
    }
    const skipRefs = said.repeated[SKIP] ?? []
    const skipped = new Set(
      (await Promise.all(skipRefs.map((ref) => resolveExercise(ref))))
        .map((page) => page.slug)
        .filter((slug): slug is string => slug !== null)
    )

    const [loaded, loggedByExercise] = await Promise.all([
      loadSelectorInputs(focus, new Date(), readSelectionPolicy()),
      sessionSets(session.slug),
    ])
    if (loaded.inputs === null) {
      return refusedBy([
        `no focus is scheduled for ${loaded.dayStr} — say \`${FOCUS} <${FOCUS_CHOICES.join("|")}>\` to train anyway`,
      ])
    }

    const skips = partitionSkips(skipped, loaded.inputs.sessionPerformed)
    const { plan, envelope } = selectSession(withoutSkipped(loaded.inputs, skips.toExclude))
    const decision = decideNextSet({
      plan,
      loggedByExercise,
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
        movement: slot.exerciseName,
        exerciseId: slot.exerciseId,
        set: setNumber,
        ofSets: slot.targetSets,
        reps,
        load,
        rir: slot.targetRir,
        why,
      })
    }
    return told([
      `movement\t${slot.exerciseName}`,
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
