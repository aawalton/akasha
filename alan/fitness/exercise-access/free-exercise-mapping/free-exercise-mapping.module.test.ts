import { expect, test } from "bun:test"
import type { FreeExercise } from "../free-exercise-row/free-exercise-row.module.code.ts"
import {
  exerciseExternalLink,
  exerciseImageUrl,
  exerciseToProps,
  instructionsToMarkdown,
} from "./free-exercise-mapping.module.code.ts"

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

const TODAY = "2026-09-03"

test("a value spelled with spaces upstream is spelled as a slug on the page", () => {
  const props = exerciseToProps({
    exercise: row({
      id: "A",
      name: "A",
      category: "olympic weightlifting",
      equipment: "body only",
    }),
    today: TODAY,
  })
  expect(props.category).toBe("olympic-weightlifting")
  expect(props.equipment).toBe("body-only")
})

test("a correction stands over what the upstream row says", () => {
  const props = exerciseToProps({
    exercise: row({
      id: "Crossover_Reverse_Lunge",
      name: "Crossover Reverse Lunge",
      category: "stretching",
    }),
    today: TODAY,
  })
  expect(props.category).toBe("strength")
  expect(props.force).toBe("push")
  expect(props.primaryMuscles).toEqual(["quadriceps", "glutes"])
})

test("a field the upstream row leaves empty is left off the page", () => {
  const props = exerciseToProps({ exercise: row({ id: "B", name: "B" }), today: TODAY })
  expect("force" in props).toBe(false)
  expect("mechanic" in props).toBe(false)
  expect("equipment" in props).toBe(false)
  expect("imageStartUrl" in props).toBe(false)
})

test("the first image is the movement's start and the second its end", () => {
  const props = exerciseToProps({
    exercise: row({ id: "C", name: "C", images: ["C/0.jpg", "C/1.jpg"] }),
    today: TODAY,
  })
  expect(props.imageStartUrl).toBe(exerciseImageUrl("C/0.jpg"))
  expect(props.imageEndUrl).toBe(exerciseImageUrl("C/1.jpg"))
})

test("how a movement is performed is carried as numbered markdown steps", () => {
  expect(instructionsToMarkdown(["Stand up.", "Sit down."])).toBe("1. Stand up.\n2. Sit down.")
})

test("the page keeps the upstream id and the link back to it", () => {
  const props = exerciseToProps({
    exercise: row({ id: "Ab_Roller", name: "Ab Roller" }),
    today: TODAY,
  })
  expect(props.externalId).toBe("Ab_Roller")
  expect(props.externalLink).toBe(exerciseExternalLink("Ab_Roller"))
  expect(props.source).toBe("free-exercise-db")
  expect(props.lastSyncedAt).toBe(TODAY)
})
