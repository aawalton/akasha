import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { keepPointsToday } from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import { wisdomShown } from "akasha/alan/attributes/readouts/attribute-wisdom/attribute-wisdom.readout.code.ts"
import { attributeWisdom } from "akasha/alan/attributes/readouts/attribute-wisdom/attribute-wisdom.readout.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"

const HOLD = "/var/tmp"

const ATTRIBUTE = "attribute"

const PAGE_AT = "held/attribute-pages/wisdom.attribute.ts"

function rootMade(): string {
  const root = mkdtempSync(join(HOLD, "attribute-wisdom-"))
  const slug = attributeWisdom.attribute
  listedFiled(root, ATTRIBUTE, slug, [{ path: PAGE_AT, id: `held-${slug}` }])
  return root
}

test("this readout names the attribute whose points it shows", () => {
  expect(attributeWisdom.attribute).toBe("wisdom")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeWisdom.attribute, 0.42)
  expect(wisdomShown(root)).toBe(0.42)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(wisdomShown(rootMade())).toBeNull()
})
