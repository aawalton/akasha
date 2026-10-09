import { expect, test } from "bun:test"
import * as hook from "akasha/alan/track/to-do/pages/protein-drink-creatine/protein-drink-creatine.to-do.on-complete.code.ts"
import {
  OPERATIONAL,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Logged } from "akasha/command/pages/track/food/track-food.command.code.ts"

const COMPLETED_AT = new Date("2026-10-10T11:02:00.000Z")

const COMPLETION = {
  slug: "protein-drink-creatine",
  values: { slug: "protein-drink-creatine" },
  completedAt: COMPLETED_AT,
}

type Filed = { readonly read: Logged; readonly given: Given; readonly at: Date }

test("the code exports the one function the runner calls", () => {
  expect(Object.keys(hook)).toEqual(["onComplete"])
})

test("a completion files the protein drink at the instant the to-do was completed", async () => {
  const filed: Filed[] = []
  await hook.onComplete(COMPLETION, async (read, given, at) => {
    filed.push({ read, given, at })
    return told([])
  })
  expect(filed).toHaveLength(1)
  const one = filed[0]
  expect(one?.read.title).toBe("Protein drink + creatine")
  expect(one?.read.estimatedCalories).toBe(150)
  expect(one?.read.plantGrams).toBeUndefined()
  expect(one?.read.date).toBeUndefined()
  expect(one?.read.time).toBeUndefined()
  expect(one?.read.image).toBeUndefined()
  expect(one?.at).toBe(COMPLETED_AT)
})

test("a filing that refuses is thrown, so the runner reports it", async () => {
  const refused = hook.onComplete(COMPLETION, async () => ({
    report: [],
    refusals: ["the food entry did not land as a page"],
    code: OPERATIONAL,
  }))
  await expect(refused).rejects.toThrow("did not land")
})
