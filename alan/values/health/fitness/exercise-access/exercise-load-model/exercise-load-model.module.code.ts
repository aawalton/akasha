import type { FreeExercise } from "../free-exercise-row/free-exercise-row.module.code.ts"

export const SINGLE_IMPLEMENT_NAME_RE =
  /\b(one[- ]arm|single|concentration|goblet|cross[- ]body|see[- ]?saw|alternat)/i

const TWO_IMPLEMENT_NAME_RE = /\b(two[- ]arm|two[- ]dumbbell|double|two kettlebell)/i

const IMPLEMENT_COUNT_OVERRIDES: Readonly<Record<string, number>> = {
  Calf_Raise_On_A_Dumbbell: 1,
  Plie_Dumbbell_Squat: 1,
  Vertical_Swing: 1,
  Dumbbell_Side_Bend: 1,
  External_Rotation: 1,
}

const LOAD_FACTOR_BY_ID: Readonly<Record<string, number>> = {
  Pullups: 1.0,
  "Chin-Up": 1.0,
  "V-Bar_Pullup": 1.0,
  "Wide-Grip_Rear_Pull-Up": 1.0,
  Pushups: 0.64,
  Pushups_Close_and_Wide_Hand_Positions: 0.64,
  "Push-Ups_-_Close_Triceps_Position": 0.64,
  "Push-Up_Wide": 0.64,
  "Clock_Push-Up": 0.64,
  "Single-Arm_Push-Up": 0.64,
  "Incline_Push-Up": 0.5,
  "Incline_Push-Up_Close-Grip": 0.5,
  "Incline_Push-Up_Medium": 0.5,
  "Incline_Push-Up_Reverse_Grip": 0.5,
  "Incline_Push-Up_Wide": 0.5,
  "Push-Ups_With_Feet_Elevated": 0.74,
  "Handstand_Push-Ups": 1.0,
  "Dips_-_Triceps_Version": 1.0,
  Bench_Dips: 0.45,
  Bodyweight_Squat: 0.6,
  Freehand_Jump_Squat: 0.6,
}

export function implementCountForExercise(exercise: FreeExercise): number {
  const override = IMPLEMENT_COUNT_OVERRIDES[exercise.id]
  if (override !== undefined) return override

  const equip = exercise.equipment
  if (equip !== "dumbbell" && equip !== "kettlebells") return 1

  const name = exercise.name
  if (SINGLE_IMPLEMENT_NAME_RE.test(name)) return 1
  if (TWO_IMPLEMENT_NAME_RE.test(name)) return 2

  return equip === "dumbbell" ? 2 : 1
}

const LEG_HIP_MUSCLES: ReadonlySet<string> = new Set([
  "quadriceps",
  "hamstrings",
  "glutes",
  "lower back",
])

const SQUAT_LUNGE_NAME_RE = /\b(squat|lunge|step[- ]?up)/i
const HINGE_NAME_RE = /\b(deadlift|good[- ]?morning|romanian)/i
const HIP_BRIDGE_NAME_RE = /(hip thrust|glute bridge|hip bridge|butt lift)/i

const SUPPORTED_LEG_OVERRIDES: ReadonlySet<string> = new Set(["Lying_Machine_Squat"])

function legLoadFactor(exercise: FreeExercise): number {
  if (SUPPORTED_LEG_OVERRIDES.has(exercise.id)) return 0
  if (!exercise.primaryMuscles.some((muscle) => LEG_HIP_MUSCLES.has(muscle))) return 0
  const name = exercise.name
  if (HIP_BRIDGE_NAME_RE.test(name)) return 0.5
  if (SQUAT_LUNGE_NAME_RE.test(name)) return 0.6
  if (HINGE_NAME_RE.test(name)) return 0.6
  return 0
}

export function loadFactorForExercise(exercise: FreeExercise): number {
  return LOAD_FACTOR_BY_ID[exercise.id] ?? legLoadFactor(exercise)
}
