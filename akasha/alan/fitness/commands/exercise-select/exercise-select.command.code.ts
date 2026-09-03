import type { Answer } from "@akasha/command-system/calling"
import { FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import { readSelectionPolicy } from "@akasha/exercise-access/selection-policy"
import type {
  PlannedSlot,
  SelectionDecision,
  SelectionEnvelope,
} from "@collections/exercises/selection/selector"
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

const FOCUS = "--focus"

const SHAPE = { valued: [FOCUS], switches: [JSON_SAID] }

const FOCUS_CHOICES: readonly string[] = FOCUS_OPTIONS

const TIME_BASED = "time-based"

const EMPTY = "-"

const PLACES = 3

const GOAL_PLACES = 2

export function repRangeOf(slot: PlannedSlot): string {
  if (slot.repRangeLow === 0 && slot.repRangeHigh === 0) return TIME_BASED
  if (slot.repRangeLow === slot.repRangeHigh) return `${slot.repRangeLow}`
  return `${slot.repRangeLow}-${slot.repRangeHigh}`
}

export function progressionOf(slot: PlannedSlot): string {
  const load = slot.progression.prescribedLoad
  return `${slot.progression.action}${load === null ? "" : `@${load}`}`
}

export function decisionRows(d: SelectionDecision): readonly string[] {
  const s = d.scores
  const scores =
    `blend ${s.blend.toFixed(PLACES)}  L${s.longevity.toFixed(GOAL_PLACES)}` +
    ` E${s.energy.toFixed(GOAL_PLACES)} F${s.functionality.toFixed(GOAL_PLACES)}` +
    ` A${s.aesthetics.toFixed(GOAL_PLACES)}`
  const f = d.featuresUsed
  const features =
    `pattern=${f.movementPattern} focus=${f.muscleFocus} laterality=${f.laterality}` +
    ` skill=${f.skillCost} ballistic=${f.isBallistic}`
  const beaten =
    d.rejected.length > 0
      ? d.rejected
          .map((one) => `${one.name} (${one.blend.toFixed(PLACES)}, ${one.reason})`)
          .join("; ")
      : EMPTY
  const rows = [
    `[${d.sortOrder + 1}] ${d.role} ${d.exerciseName}\t${scores}`,
    `    features: ${features}`,
    `    rules: ${d.rulesFired.join(", ")}`,
  ]
  if (d.anchorState !== null) rows.push(`    anchor: ${d.anchorState}`)
  rows.push(`    progression: ${d.progression.rationale}`)
  rows.push(`    rationale: ${d.rationale}`)
  rows.push(`    rejected: ${beaten}`)
  return rows
}

export function coverageRows(envelope: SelectionEnvelope): readonly string[] {
  const c = envelope.coverage
  const yn = (held: boolean): string => (held ? "yes" : "NO")
  return [
    "",
    "# coverage (week-to-date)",
    `covered\t${c.covered.length > 0 ? c.covered.join(", ") : EMPTY}`,
    `gaps\t${c.gaps.length > 0 ? c.gaps.join(", ") : EMPTY}`,
    `core-anti\t${yn(c.coreAntiCovered)}`,
    `unilateral-upper\t${yn(c.unilateralUpperCovered)}`,
    `unilateral-lower\t${yn(c.unilateralLowerCovered)}`,
  ]
}

export async function exerciseSelect(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const focus = oneOfIn(said, FOCUS, FOCUS_CHOICES)
  if (typeof focus === "object" && focus !== null) return refusedBy(focus.refused)

  try {
    const loaded = await loadSelectorInputs(focus, new Date(), readSelectionPolicy())
    if (loaded.inputs === null) {
      if (wantsJson(said)) {
        return asJson({ date: loaded.dayStr, focus: null, plan: null, envelope: null })
      }
      return told([
        `date\t${loaded.dayStr}`,
        "focus\t(none scheduled — rest day)",
        `say \`${FOCUS} <${FOCUS_CHOICES.join("|")}>\` to plan a day anyway.`,
      ])
    }

    const { plan, envelope } = selectSession(loaded.inputs)
    if (wantsJson(said)) {
      return asJson({ date: loaded.dayStr, focus: loaded.focus, plan, envelope })
    }

    const rows = [
      `date\t${loaded.dayStr}`,
      `focus\t${loaded.focus}`,
      `daySeed\t${envelope.daySeed}`,
      `weights\tL ${envelope.weights.longevity} / E ${envelope.weights.energy} / F ${envelope.weights.functionality} / A ${envelope.weights.aesthetics}`,
      ...coverageRows(envelope),
      "",
      "# plan",
      "#\trole\tmovement\tpattern\tsets\treps\trir\tprogression",
      ...plan.slots.map(
        (slot) =>
          `${slot.sortOrder + 1}\t${slot.role}\t${slot.exerciseName}\t${slot.movementPattern}` +
          `\t${slot.targetSets}\t${repRangeOf(slot)}\tRIR${slot.targetRir}\t${progressionOf(slot)}`
      ),
    ]
    if (plan.slots.length === 0) rows.push("(no in-kit candidates matched this focus)")
    rows.push("", "# decisions (why)")
    for (const one of envelope.decisions) rows.push(...decisionRows(one))
    if (envelope.unfilledSlots.length > 0) {
      rows.push("", "# unfilled slots (with why)")
      for (const one of envelope.unfilledSlots) rows.push(`${one.slot}\t${one.reason}`)
    }
    return told(rows)
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
