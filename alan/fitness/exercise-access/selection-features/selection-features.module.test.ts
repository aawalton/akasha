import { expect, test } from "bun:test"
import type { FreeExercise } from "../free-exercise-row/free-exercise-row.module.code.ts"
import {
  deriveGripDemand,
  deriveIsBallistic,
  deriveLaterality,
  deriveMovementPattern,
  deriveMuscleFocus,
  deriveSelectionFeatures,
  deriveSfrScore,
  deriveSkillCost,
  selectionFeatureProps,
} from "./selection-features.module.code.ts"

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

test("a movement pattern named outright stands over the one the name implies", () => {
  expect(deriveMovementPattern(row({ id: "Goblet_Squat", name: "Goblet Squat" }))).toBe("squat")
  expect(deriveMovementPattern(row({ id: "Spider_Crawl", name: "Spider Crawl" }))).toBe("gait")
})

test("a stretching movement is mobility and a cardio movement is conditioning", () => {
  expect(
    deriveMovementPattern(row({ id: "A", name: "Hamstring Stretch", category: "stretching" }))
  ).toBe("mobility")
  expect(deriveMovementPattern(row({ id: "B", name: "Air Bike", category: "cardio" }))).toBe(
    "conditioning"
  )
})

test("a movement no name places falls to what its primary muscle says", () => {
  expect(
    deriveMovementPattern(row({ id: "C", name: "Chest Thing", primaryMuscles: ["chest"] }))
  ).toBe("h-push")
})

test("a movement neither name nor muscle places is an isolation pattern", () => {
  expect(
    deriveMovementPattern(row({ id: "D", name: "Neck Thing", primaryMuscles: ["neck"] }))
  ).toBe("isolation-other")
})

test("a movement takes a second pattern only where it is named outright", () => {
  expect(
    deriveSelectionFeatures(row({ id: "Thrusters", name: "Thrusters" })).secondaryPattern
  ).toBe("v-push")
  expect(
    deriveSelectionFeatures(row({ id: "E", name: "Barbell Curl" })).secondaryPattern
  ).toBeUndefined()
})

test("a rear delt movement is pull however its muscles read", () => {
  expect(
    deriveMuscleFocus(row({ id: "F", name: "Rear Delt Fly", primaryMuscles: ["shoulders"] }))
  ).toBe("pull")
})

test("a movement named alternating is alternating and a goblet hold is bilateral", () => {
  expect(deriveLaterality(row({ id: "G", name: "Alternating Curl" }))).toBe("alternating")
  expect(deriveLaterality(row({ id: "H", name: "Goblet Squat" }))).toBe("bilateral")
})

test("an olympic lift is ballistic and high skill", () => {
  const snatch = row({ id: "Snatch", name: "Snatch", category: "olympic-weightlifting" })
  expect(deriveIsBallistic(row({ ...snatch, category: "olympic weightlifting" }))).toBe(true)
  expect(deriveSkillCost(snatch)).toBe("high")
})

test("a machine movement worked by legs alone demands no grip", () => {
  expect(
    deriveGripDemand(
      row({ id: "I", name: "Leg Extension", equipment: "machine", primaryMuscles: ["quadriceps"] })
    )
  ).toBe("none")
})

test("an isolation movement scores four for stimulus against fatigue", () => {
  expect(deriveSfrScore(row({ id: "J", name: "Barbell Curl", mechanic: "isolation" }))).toBe(4)
})

test("the props carry no second pattern where the movement takes none", () => {
  const props = selectionFeatureProps(
    deriveSelectionFeatures(row({ id: "K", name: "Barbell Curl" }))
  )
  expect("secondaryPattern" in props).toBe(false)
  expect(props.movementPattern).toBe("isolation-other")
})
