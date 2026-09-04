import { expect, test } from "bun:test"
import type { GoalWeights } from "@akasha/exercise-access/selection-policy"
import {
  aestheticsScore,
  energyScore,
  functionalityScore,
  longevityScore,
  type MovementFeatures,
  scoreMovement,
} from "./movement-scoring.module.code.ts"

const PLAIN: MovementFeatures = {
  exerciseCategory: "strength",
  gripDemand: "low",
  isBallistic: false,
  laterality: "bilateral",
  mechanic: "isolation",
  movementPattern: "isolation-other",
  primaryMuscles: ["abdominals"],
  secondaryMuscles: [],
  secondaryPattern: undefined,
  sfrScore: 0,
  skillCost: "low",
  trainsLengthenedRange: false,
}

function movement(over: Partial<MovementFeatures>): MovementFeatures {
  return { ...PLAIN, ...over }
}

const EVEN: GoalWeights = { longevity: 1, energy: 1, functionality: 1, aesthetics: 1 }

test("a plain isolation movement scores nothing for longevity", () => {
  expect(longevityScore(PLAIN)).toBe(0)
})

test("longevity counts the compound, the ballistic, the large mass and the grip", () => {
  const score = longevityScore(
    movement({
      mechanic: "compound",
      isBallistic: true,
      primaryMuscles: ["glutes"],
      gripDemand: "high",
    })
  )
  expect(score).toBeCloseTo(0.9, 10)
})

test("longevity takes a tenth of the way the sfr score runs to five", () => {
  expect(longevityScore(movement({ sfrScore: 5 }))).toBeCloseTo(0.1, 10)
  expect(longevityScore(movement({ sfrScore: 2.5 }))).toBeCloseTo(0.05, 10)
})

test("no score runs past one", () => {
  const everything = movement({
    mechanic: "compound",
    isBallistic: true,
    primaryMuscles: ["glutes", "chest"],
    gripDemand: "high",
    movementPattern: "carry",
    sfrScore: 5,
  })
  expect(longevityScore(everything)).toBe(1)
})

test("energy counts cardio, ballistic work and full-body compounds", () => {
  expect(energyScore(movement({ exerciseCategory: "cardio" }))).toBeCloseTo(0.45, 10)
  expect(energyScore(movement({ movementPattern: "gait" }))).toBeCloseTo(0.25, 10)
  expect(
    energyScore(
      movement({
        mechanic: "compound",
        primaryMuscles: ["chest"],
        secondaryMuscles: ["glutes"],
      })
    )
  ).toBeCloseTo(0.15, 10)
})

test("a compound working only the upper body is not full-body", () => {
  expect(
    energyScore(movement({ mechanic: "compound", primaryMuscles: ["chest", "triceps"] }))
  ).toBe(0)
})

test("functionality blends strength three fifths against mobility two fifths", () => {
  expect(functionalityScore(movement({ trainsLengthenedRange: true }))).toBeCloseTo(0.2, 10)
  expect(functionalityScore(movement({ mechanic: "compound" }))).toBeCloseTo(0.18, 10)
})

test("functionality counts a core anti-pattern", () => {
  expect(functionalityScore(movement({ movementPattern: "core-anti-rotation" }))).toBeCloseTo(
    0.09,
    10
  )
})

test("aesthetics rewards the visible upper body and penalises the ballistic", () => {
  expect(aestheticsScore(movement({ primaryMuscles: ["chest"] }))).toBeCloseTo(0.8, 10)
  expect(aestheticsScore(movement({ primaryMuscles: ["chest"], isBallistic: true }))).toBeCloseTo(
    0.5,
    10
  )
})

test("aesthetics fills a visible gap only through an isolation", () => {
  expect(aestheticsScore(movement({ primaryMuscles: ["calves"] }))).toBeCloseTo(0.5, 10)
  expect(
    aestheticsScore(movement({ primaryMuscles: ["calves"], mechanic: "compound" }))
  ).toBeCloseTo(0.3, 10)
})

test("the blend is the weighted mean of the four goals", () => {
  const features = movement({ mechanic: "compound", primaryMuscles: ["chest"] })
  const scores = scoreMovement(features, EVEN)
  const mean = (scores.longevity + scores.energy + scores.functionality + scores.aesthetics) / 4
  expect(scores.blend).toBeCloseTo(mean, 10)
})

test("weights summing to nothing blend as though they summed to one", () => {
  const features = movement({ primaryMuscles: ["chest"] })
  const zeroed: GoalWeights = { longevity: 0, energy: 0, functionality: 0, aesthetics: 0 }
  expect(scoreMovement(features, zeroed).blend).toBe(0)
})

test("a weight of its own picks out that goal alone", () => {
  const features = movement({ primaryMuscles: ["chest"] })
  const only: GoalWeights = { longevity: 0, energy: 0, functionality: 0, aesthetics: 7 }
  const scores = scoreMovement(features, only)
  expect(scores.blend).toBeCloseTo(scores.aesthetics, 10)
})
