import { expect, mock, test } from "bun:test"
import { attributeCharisma } from "akasha/alan/attribute/readout/attribute-charisma/attribute-charisma.readout.ts"
import { attributeConstitution } from "akasha/alan/attribute/readout/attribute-constitution/attribute-constitution.readout.ts"
import { attributeEndurance } from "akasha/alan/attribute/readout/attribute-endurance/attribute-endurance.readout.ts"
import { attributeIntelligence } from "akasha/alan/attribute/readout/attribute-intelligence/attribute-intelligence.readout.ts"
import { attributeLuck } from "akasha/alan/attribute/readout/attribute-luck/attribute-luck.readout.ts"
import { attributeStrength } from "akasha/alan/attribute/readout/attribute-strength/attribute-strength.readout.ts"
import { attributeWisdom } from "akasha/alan/attribute/readout/attribute-wisdom/attribute-wisdom.readout.ts"
import type { Carry } from "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"

const SHOWN_AT = "https://alanwalton.com"

const POINTS = [
  `${readout.slug}/${attributeStrength.slug}`,
  `${readout.slug}/${attributeEndurance.slug}`,
  `${readout.slug}/${attributeConstitution.slug}`,
  `${readout.slug}/${attributeWisdom.slug}`,
  `${readout.slug}/${attributeIntelligence.slug}`,
  `${readout.slug}/${attributeCharisma.slug}`,
  `${readout.slug}/${attributeLuck.slug}`,
]

const HANDED: Carry[] = []

const REACHED: number[] = []

const carrying = await import(
  "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts"
)

mock.module(
  "akasha/alan/harness/readout/modules/relay-carrying/readout-relay-carrying.module.code.ts",
  () => ({
    ...carrying,
    carryEachReading: (carries: readonly Carry[]) => {
      REACHED.push(carries.length)
      HANDED.push(...carries)
      return Promise.resolve(undefined)
    },
  })
)

const running = await import(
  "akasha/alan/harness/attribute/attributes-relay-service/attributes-relay-service.service-workstation.running.code.ts"
)

const ranAfresh = async (): Promise<undefined> => {
  HANDED.length = 0
  REACHED.length = 0
  await running.runService()
  return undefined
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run names all seven attribute points, each against the site that shows them", async () => {
  await ranAfresh()
  expect(HANDED).toEqual(POINTS.map((point) => ({ point, to: SHOWN_AT })))
})

test("a run hands every pair to the shared carrying at once rather than one at a time", async () => {
  await ranAfresh()
  expect(REACHED).toEqual([POINTS.length])
})
