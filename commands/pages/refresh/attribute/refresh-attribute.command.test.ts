import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Keeping } from "akasha/commands/pages/refresh/attribute/refresh-attribute.command.code.ts"
import {
  keptEach,
  saidOf,
  slugsIn,
} from "akasha/commands/pages/refresh/attribute/refresh-attribute.command.code.ts"

const FOUND: ReadonlyMap<string, number> = new Map([
  ["strength", 3],
  ["wisdom", 4],
])

const KEPT_STRENGTH = "strength carries its points from the days before today"

const KEPT_WISDOM = "wisdom carries its points from the days before today"

function keeping(upTo: number): Keeping {
  let reached = 0
  return () => {
    reached += 1
    if (reached > upTo) throw new OperationalError("the beside file would not open")
  }
}

const AT = "alan/attributes/readouts"

const STRENGTH = `${AT}/attribute-strength/attribute-strength.readout.ts`

const WISDOM = `${AT}/attribute-wisdom/attribute-wisdom.readout.ts`

test("each readout's figure is filed under the attribute that readout counts", () => {
  expect([...slugsIn({ [STRENGTH]: 4.5, [WISDOM]: 1 })]).toEqual([
    ["strength", 4.5],
    ["wisdom", 1],
  ])
})

test("a figure whose readout counts no attribute is left out", () => {
  expect([...slugsIn({ "thrumming/readouts/thrum-upkeep/thrum-upkeep.readout.ts": 7 })]).toEqual([])
})

test("a figure of zero is a figure rather than an absent one", () => {
  expect([...slugsIn({ [STRENGTH]: 0 })]).toEqual([["strength", 0]])
})

test("one attribute rebuilt is said in the singular", () => {
  expect(saidOf(1)).toBe("1 attribute was rebuilt from the days before today")
})

test("more than one attribute rebuilt is said in the plural", () => {
  expect(saidOf(6)).toBe("6 attributes were rebuilt from the days before today")
})

test("each attribute is named as soon as that attribute's figure is kept", () => {
  const done: string[] = []

  keptEach("/nowhere", FOUND, keeping(2), done)
  expect(done).toEqual([KEPT_STRENGTH, KEPT_WISDOM])
})

test("a run that threw part way names in its refusal each attribute it had kept", async () => {
  const held = await answering((done) => {
    keptEach("/nowhere", FOUND, keeping(1), done)
    return told(done)
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([KEPT_STRENGTH])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("strength")
  expect(last).not.toContain("wisdom")
})

test("a run that threw before an attribute was kept names none", async () => {
  const held = await answering((done) => {
    keptEach("/nowhere", FOUND, keeping(0), done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
