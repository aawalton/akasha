import { expect, test } from "bun:test"
import type { FreeExercise } from "../free-exercise-row/free-exercise-row.module.code.ts"
import {
  implementCountForExercise,
  loadFactorForExercise,
} from "./exercise-load-model.module.code.ts"

function row(said: Partial<FreeExercise> & { readonly id: string; readonly name: string }) {
  return {
    force: null,
    level: "beginner",
    mechanic: null,
    equipment: null,
    primaryMuscles: [],
    secondaryMuscles: [],
    instructions: [],
    category: "strength",
    images: [],
    ...said,
  } satisfies FreeExercise
}

test("a movement loaded with neither a dumbbell nor a kettlebell takes one implement", () => {
  expect(
    implementCountForExercise(row({ id: "A", name: "Barbell Squat", equipment: "barbell" }))
  ).toBe(1)
})

test("a dumbbell movement the name does not mark as one-sided takes two implements", () => {
  expect(
    implementCountForExercise(row({ id: "B", name: "Dumbbell Bench Press", equipment: "dumbbell" }))
  ).toBe(2)
})

test("a dumbbell movement named one-arm takes one implement", () => {
  expect(
    implementCountForExercise(row({ id: "C", name: "One-Arm Dumbbell Row", equipment: "dumbbell" }))
  ).toBe(1)
})

test("a movement named outright takes the count named rather than the worked one", () => {
  expect(
    implementCountForExercise(
      row({ id: "Plie_Dumbbell_Squat", name: "Plie Dumbbell Squat", equipment: "dumbbell" })
    )
  ).toBe(1)
})

test("a movement lifting no bodyweight states a load factor of nothing", () => {
  expect(loadFactorForExercise(row({ id: "D", name: "Barbell Curl" }))).toBe(0)
})

test("a leg movement named squat lifts a share of bodyweight", () => {
  expect(
    loadFactorForExercise(
      row({ id: "E", name: "Bodyweight Split Squat", primaryMuscles: ["quadriceps"] })
    )
  ).toBe(0.6)
})

test("a leg movement the machine supports lifts no bodyweight", () => {
  expect(
    loadFactorForExercise(
      row({
        id: "Lying_Machine_Squat",
        name: "Lying Machine Squat",
        primaryMuscles: ["quadriceps"],
      })
    )
  ).toBe(0)
})

test("a movement named outright takes the load factor named", () => {
  expect(loadFactorForExercise(row({ id: "Pullups", name: "Pullups" }))).toBe(1)
})
