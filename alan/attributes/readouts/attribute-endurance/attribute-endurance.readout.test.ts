import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { keepPointsToday } from "../../points/attribute-points.module.code.ts"
import { enduranceShown } from "./attribute-endurance.readout.code.ts"
import { attributeEndurance } from "./attribute-endurance.readout.ts"

const HOLD = "/var/tmp"

const rootMade = () => mkdtempSync(join(HOLD, "attribute-endurance-"))

test("this readout names the attribute whose points it shows", () => {
  expect(attributeEndurance.attributeSlug).toBe("endurance")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeEndurance.attributeSlug, 1.75)
  expect(enduranceShown(root)).toBe(1.75)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(enduranceShown(rootMade())).toBeNull()
})
