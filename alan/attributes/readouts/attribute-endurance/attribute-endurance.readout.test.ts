import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { keepPointsToday } from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import { enduranceShown } from "akasha/alan/attributes/readouts/attribute-endurance/attribute-endurance.readout.code.ts"
import { attributeEndurance } from "akasha/alan/attributes/readouts/attribute-endurance/attribute-endurance.readout.ts"
import { listedFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const HOLD = "/var/tmp"

const ATTRIBUTE = "attribute"

const PAGE_AT = "held/attribute-pages/endurance.attribute.ts"

function rootMade(): string {
  const root = mkdtempSync(join(HOLD, "attribute-endurance-"))
  const slug = attributeEndurance.attribute
  listedFiled(root, ATTRIBUTE, slug, [{ path: PAGE_AT, id: `held-${slug}` }])
  return root
}

test("this readout names the attribute whose points it shows", () => {
  expect(attributeEndurance.attribute).toBe("endurance")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeEndurance.attribute, 1.75)
  expect(enduranceShown(root)).toBe(1.75)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(enduranceShown(rootMade())).toBeNull()
})
