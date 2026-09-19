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
  readonly seconds: number | null
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
  seconds: null,
  weight: null,
  reps: null,
}

export function stepFor(warmup: Warmup | null, work: Work): Step {
  const raise = warmup === null ? null : warmup.raise
  if (raise !== null) {
    const one = raise.movements[0]
    if (one === undefined) return { ...BARE, kind: "raise", minutes: raise.minutes }
    return {
      ...BARE,
      kind: "raise",
      movement: one.slug,
      title: titleOf(one),
      seconds: raise.seconds,
    }
  }
  const moving = warmup === null ? undefined : warmup.mobilise[0]
  if (moving !== undefined)
    return { ...BARE, kind: "mobilise", movement: moving.slug, title: titleOf(moving) }
  if (warmup !== null)
    return {
      ...BARE,
      kind: "ramp",
      movement: work.movement,
      title: work.title,
      weight: warmup.ramp.weight,
      reps: warmup.ramp.reps,
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
  if (step.kind === "raise") return [lead, `  ${String(step.seconds)} seconds, easy`]
  if (step.kind === "mobilise") return [lead, "  slow and easy, through the whole range"]
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
