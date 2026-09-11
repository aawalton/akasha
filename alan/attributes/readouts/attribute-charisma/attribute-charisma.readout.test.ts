import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { keepPointsToday } from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import { charismaShown } from "akasha/alan/attributes/readouts/attribute-charisma/attribute-charisma.readout.code.ts"
import { attributeCharisma } from "akasha/alan/attributes/readouts/attribute-charisma/attribute-charisma.readout.ts"
import { listedFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"

const HOLD = "/var/tmp"

const ATTRIBUTE = "attribute"

const PAGE_AT = "held/attribute-pages/charisma.attribute.ts"

function rootMade(): string {
  const root = mkdtempSync(join(HOLD, "attribute-charisma-"))
  const slug = attributeCharisma.attribute
  listedFiled(root, ATTRIBUTE, slug, [{ path: PAGE_AT, id: `held-${slug}` }])
  return root
}

test("this readout names the attribute whose points it shows", () => {
  expect(attributeCharisma.attribute).toBe("charisma")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeCharisma.attribute, 3.5)
  expect(charismaShown(root)).toBe(3.5)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(charismaShown(rootMade())).toBeNull()
})
