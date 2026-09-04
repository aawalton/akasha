import { SINGLE_IMPLEMENT_NAME_RE } from "../exercise-load-model/exercise-load-model.module.code.ts"
import type { Value } from "../exercise-rows/exercise-rows.module.code.ts"
import type { FreeExercise } from "../free-exercise-row/free-exercise-row.module.code.ts"

export interface SelectionFeatures {
  readonly movementPattern: string
  readonly secondaryPattern?: string
  readonly laterality: string
  readonly isBallistic: boolean
  readonly skillCost: string
  readonly trainsLengthenedRange: boolean
  readonly gripDemand: string
  readonly sfrScore: number
  readonly muscleFocus: string
}

export const MOVEMENT_PATTERN_OPTIONS = [
  "squat",
  "hinge",
  "lunge",
  "h-push",
  "v-push",
  "h-pull",
  "v-pull",
  "carry",
  "core-anti-extension",
  "core-anti-rotation",
  "core-anti-lateral-flexion",
  "gait",
  "isolation-other",
  "mobility",
  "conditioning",
] as const

export const MOBILITY_PATTERN = "mobility"

export const CONDITIONING_PATTERN = "conditioning"

export const LATERALITY_OPTIONS = ["bilateral", "unilateral", "alternating"] as const
export const SKILL_COST_OPTIONS = ["low", "moderate", "high"] as const
export const GRIP_DEMAND_OPTIONS = ["none", "low", "high"] as const

export const MUSCLE_FOCUS_OPTIONS = ["push", "pull", "legs", "core", "other"] as const

const MOVEMENT_PATTERN_OVERRIDES: Readonly<Record<string, string>> = {
  Goblet_Squat: "squat",
  Dumbbell_Floor_Press: "h-push",
  Kettlebell_Windmill: "core-anti-lateral-flexion",
  Double_Kettlebell_Windmill: "core-anti-lateral-flexion",
  Advanced_Kettlebell_Windmill: "core-anti-lateral-flexion",
  Spider_Crawl: "gait",
}

const SECONDARY_PATTERN_OVERRIDES: Readonly<Record<string, string>> = {
  Clean_and_Press: "v-push",
  Kettlebell_Thruster: "v-push",
  Clean_and_Jerk: "v-push",
  Thrusters: "v-push",
}

const SFR_SCORE_OVERRIDES: Readonly<Record<string, number>> = {
  Barbell_Deadlift: 2,
  Deadlift_with_Bands: 2,
  Barbell_Squat: 2,
  Clean_and_Jerk: 2,
  Snatch: 2,
}

const CARRY_RE = /\b(carr(y|ies)|farmer|waiter|suitcase carry|yoke|rack walk)/i
const GAIT_RE = /\b(walk|run|sprint|march|gait|sled (push|drag|pull)|prowler)/i

const CORE_ANTI_LATERAL_RE = /\b(side plank|side bend|suitcase (hold|carry)|oblique)/i
const CORE_ANTI_ROTATION_RE =
  /\b(pallof|anti-?rotation|bird ?dog|wood ?chop|russian twist|landmine)/i
const CORE_ANTI_EXTENSION_RE =
  /\b(plank|dead ?bug|ab wheel|ab roll|roll-?out|hollow|body saw|fallout|stir the pot)/i

const VPULL_RE = /\b(pull-?up|pullup|chin-?up|chinup|pull-?down|pulldown|lat pull)/i
const HPULL_RE = /\b(row|face pull|rear delt|inverted row|pendlay)/i
const LUNGE_RE = /\b(lunge|split squat|bulgarian|step-?up)/i
const SQUAT_RE = /\b(squat|leg press|hack|sissy|wall sit)/i
const HINGE_RE =
  /\b(deadlift|rdl|romanian|good ?morning|swing|hip thrust|glute bridge|hip hinge|hyperextension|back extension|clean|snatch|kettlebell high pull|pull-?through)/i
const VPUSH_RE =
  /\b(overhead press|shoulder press|military|push press|arnold press|handstand|z press|landmine press)/i
const HPUSH_RE = /\b(bench press|floor press|push-?up|pushup|chest press|dip|fly|pec deck)/i

function compoundFallbackPattern(exercise: FreeExercise): string {
  const primary = exercise.primaryMuscles
  if (primary.includes("chest")) return "h-push"
  if (primary.includes("shoulders")) return "v-push"
  if (primary.includes("lats")) return "v-pull"
  if (primary.includes("middle back") || primary.includes("traps")) return "h-pull"
  if (primary.includes("quadriceps")) return "squat"
  if (
    primary.includes("glutes") ||
    primary.includes("hamstrings") ||
    primary.includes("lower back")
  ) {
    return "hinge"
  }
  return "isolation-other"
}

export function deriveMovementPattern(exercise: FreeExercise): string {
  const override = MOVEMENT_PATTERN_OVERRIDES[exercise.id]
  if (override !== undefined) return override
  if (exercise.category === "stretching") return MOBILITY_PATTERN
  if (exercise.category === "cardio") return CONDITIONING_PATTERN

  const name = exercise.name
  if (CARRY_RE.test(name)) return "carry"
  if (GAIT_RE.test(name)) return "gait"
  if (CORE_ANTI_LATERAL_RE.test(name)) return "core-anti-lateral-flexion"
  if (CORE_ANTI_ROTATION_RE.test(name)) return "core-anti-rotation"
  if (CORE_ANTI_EXTENSION_RE.test(name)) return "core-anti-extension"
  if (VPULL_RE.test(name)) return "v-pull"
  if (HPULL_RE.test(name)) return "h-pull"
  if (LUNGE_RE.test(name)) return "lunge"
  if (SQUAT_RE.test(name)) return "squat"
  if (HINGE_RE.test(name)) return "hinge"
  if (VPUSH_RE.test(name)) return "v-push"
  if (HPUSH_RE.test(name)) return "h-push"

  if (exercise.mechanic === "isolation") return "isolation-other"
  return compoundFallbackPattern(exercise)
}

export function deriveSecondaryPattern(exercise: FreeExercise): string | undefined {
  return SECONDARY_PATTERN_OVERRIDES[exercise.id]
}

const MUSCLE_FOCUS_BY_MUSCLE: Readonly<Record<string, string>> = {
  chest: "push",
  shoulders: "push",
  triceps: "push",
  lats: "pull",
  "middle back": "pull",
  traps: "pull",
  biceps: "pull",
  forearms: "pull",
  "lower back": "pull",
  quadriceps: "legs",
  hamstrings: "legs",
  glutes: "legs",
  calves: "legs",
  abductors: "legs",
  adductors: "legs",
  abdominals: "core",
}

const REAR_DELT_NAME_RE = /\b(rear (delt|lateral)|reverse (fly|flye)|bent-?over lateral)/i

export function deriveMuscleFocus(exercise: FreeExercise): string {
  if (REAR_DELT_NAME_RE.test(exercise.name)) return "pull"
  for (const muscle of exercise.primaryMuscles) {
    const focus = MUSCLE_FOCUS_BY_MUSCLE[muscle]
    if (focus !== undefined) return focus
  }
  return "other"
}

const ALTERNATING_RE = /\b(alternat|see-?saw)/i
const BILATERAL_HOLD_RE = /\bgoblet/i
const UNILATERAL_EXTRA_RE =
  /\b(single-?leg|one-?leg|split squat|bulgarian|pistol|staggered|b-?stance|shrimp|suitcase|waiter|lunge|step-? ?ups?)/i

export function deriveLaterality(exercise: FreeExercise): string {
  const name = exercise.name
  if (ALTERNATING_RE.test(name)) return "alternating"
  if (SINGLE_IMPLEMENT_NAME_RE.test(name) && !BILATERAL_HOLD_RE.test(name)) return "unilateral"
  if (UNILATERAL_EXTRA_RE.test(name)) return "unilateral"
  return "bilateral"
}

const BALLISTIC_NAME_RE =
  /\b(swing|clean|snatch|jerk|thruster|jump|hop|bound|throw|slam|push press|kip|plyo|ballistic|box jump|broad jump|explosive|high knee|wind sprint)/i

export function deriveIsBallistic(exercise: FreeExercise): boolean {
  if (exercise.category === "plyometrics" || exercise.category === "olympic weightlifting") {
    return true
  }
  return BALLISTIC_NAME_RE.test(exercise.name)
}

const HIGH_SKILL_NAME_RE =
  /\b(snatch|clean|jerk|muscle-?up|pistol|turkish|windmill|overhead squat|kipping|handstand)/i
const LOW_SKILL_NAME_RE =
  /\b(curl|raise|extension|calf|shrug|fly|crunch|plank|pushdown|kickback|pull-?over|leg press|leg curl)/i

export function deriveSkillCost(exercise: FreeExercise): string {
  if (exercise.category === "olympic weightlifting" || HIGH_SKILL_NAME_RE.test(exercise.name)) {
    return "high"
  }
  if (exercise.mechanic === "isolation" || LOW_SKILL_NAME_RE.test(exercise.name)) return "low"
  if (exercise.equipment === "machine" || exercise.equipment === "cable") return "low"
  return "moderate"
}

const LENGTHENED_RANGE_NAME_RE =
  /\b(rdl|romanian|stiff-?leg|deficit|good ?morning|fly|pull-?over|split squat|bulgarian|deep|overhead (tricep|extension)|sissy|reverse nordic|reverse hyper|incline (dumbbell )?curl|preacher)/i

export function deriveTrainsLengthenedRange(exercise: FreeExercise): boolean {
  return LENGTHENED_RANGE_NAME_RE.test(exercise.name)
}

const HIGH_GRIP_NAME_RE =
  /\b(deadlift|rdl|romanian|swing|snatch|clean|carr(y|ies)|farmer|pull-?up|chin-?up|pull-?down|row|shrug|dead ?hang|hang|grip|hold)/i

const NON_GRIP_MUSCLES: ReadonlySet<string> = new Set([
  "quadriceps",
  "hamstrings",
  "glutes",
  "calves",
  "abdominals",
  "abductors",
  "adductors",
])

export function deriveGripDemand(exercise: FreeExercise): string {
  const ballisticKettlebell = exercise.equipment === "kettlebells" && deriveIsBallistic(exercise)
  if (HIGH_GRIP_NAME_RE.test(exercise.name) || ballisticKettlebell) return "high"
  const bodySupported = exercise.equipment === "machine" || exercise.equipment === "body only"
  const legOrCoreOnly = exercise.primaryMuscles.every((muscle) => NON_GRIP_MUSCLES.has(muscle))
  if (bodySupported && legOrCoreOnly && exercise.primaryMuscles.length > 0) return "none"
  return "low"
}

export function deriveSfrScore(exercise: FreeExercise): number {
  const override = SFR_SCORE_OVERRIDES[exercise.id]
  if (override !== undefined) return override
  if (exercise.mechanic === "isolation") return 4
  if (deriveSkillCost(exercise) === "high") return 2
  return 3
}

export function selectionFeatureProps(features: SelectionFeatures): Record<string, Value> {
  return {
    movementPattern: features.movementPattern,
    ...(features.secondaryPattern !== undefined
      ? { secondaryPattern: features.secondaryPattern }
      : {}),
    laterality: features.laterality,
    isBallistic: features.isBallistic,
    skillCost: features.skillCost,
    trainsLengthenedRange: features.trainsLengthenedRange,
    gripDemand: features.gripDemand,
    sfrScore: features.sfrScore,
    muscleFocus: features.muscleFocus,
  }
}

export function deriveSelectionFeatures(exercise: FreeExercise): SelectionFeatures {
  const secondaryPattern = deriveSecondaryPattern(exercise)
  return {
    movementPattern: deriveMovementPattern(exercise),
    ...(secondaryPattern !== undefined ? { secondaryPattern } : {}),
    laterality: deriveLaterality(exercise),
    isBallistic: deriveIsBallistic(exercise),
    skillCost: deriveSkillCost(exercise),
    trainsLengthenedRange: deriveTrainsLengthenedRange(exercise),
    gripDemand: deriveGripDemand(exercise),
    sfrScore: deriveSfrScore(exercise),
    muscleFocus: deriveMuscleFocus(exercise),
  }
}
