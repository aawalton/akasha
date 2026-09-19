import type { Movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import {
  titleOf,
  type Warmup,
} from "akasha/command/pages/fitness/next/modules/warming/warming.module.code.ts"

export type StepKind = "mobilise" | "raise" | "ramp" | "work"

export type Step = {
  readonly kind: StepKind
  readonly movement: string | null
  readonly title: string | null
  readonly minutes: number | null
  readonly weight: number | null
  readonly reps: number | null
}

export type Work = {
  readonly movement: string
  readonly title: string
  readonly weight: number | null
  readonly reps: number | null
}

const BARE = {
  movement: null,
  title: null,
  minutes: null,
  weight: null,
  reps: null,
}

function easedFor(one: Movement, kind: StepKind, reps: number): Step {
  return { ...BARE, kind, movement: one.slug, title: titleOf(one), reps }
}

export function stepFor(warmup: Warmup | null, work: Work): Step {
  if (warmup !== null) {
    const raise = warmup.raise
    const one = raise === null ? undefined : raise.movements[0]
    if (raise !== null && one === undefined)
      return { ...BARE, kind: "raise", minutes: raise.minutes }
    if (one !== undefined) return easedFor(one, "raise", warmup.easyReps)
    const moving = warmup.mobilise[0]
    if (moving !== undefined) return easedFor(moving, "mobilise", warmup.easyReps)
    return {
      ...BARE,
      kind: "ramp",
      movement: work.movement,
      title: work.title,
      weight: warmup.ramp.weight,
      reps: warmup.ramp.reps,
    }
  }
  return {
    ...BARE,
    kind: "work",
    movement: work.movement,
    title: work.title,
    weight: work.weight,
    reps: work.reps,
  }
}

export function steppedOf(step: Step): readonly string[] {
  const named = step.title ?? step.movement
  if (step.kind === "raise" && named === null)
    return [`${String(step.minutes)} minutes easy, until you are breathing and damp`]
  const lead = named ?? "the movement"
  const easy = `${String(step.reps)} easy reps`
  if (step.kind === "raise") return [lead, `  ${easy}`]
  if (step.kind === "mobilise") return [lead, `  ${easy}, through the whole range`]
  const reps = String(step.reps)
  if (step.kind === "ramp")
    return [
      lead,
      step.weight === null
        ? `  ramp: ${reps} easy reps`
        : `  ramp: ${String(step.weight)} lb, ${reps} easy reps`,
    ]
  if (step.weight === null)
    return [lead, "  find a load that takes you near failure inside eight to twelve reps"]
  return [
    lead,
    `  ${String(step.weight)} lb, ${step.reps === null ? "near failure" : `${reps} reps`}`,
  ]
}
