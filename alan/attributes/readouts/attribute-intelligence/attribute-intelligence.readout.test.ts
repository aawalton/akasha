import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { listedFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { keepPointsToday } from "../../points/attribute-points.module.code.ts"
import { intelligenceShown } from "./attribute-intelligence.readout.code.ts"
import { attributeIntelligence } from "./attribute-intelligence.readout.ts"

const HOLD = "/var/tmp"

const ATTRIBUTE = "attribute"

const PAGE_AT = "held/attribute-pages/intelligence.attribute.ts"

function rootMade(): string {
  const root = mkdtempSync(join(HOLD, "attribute-intelligence-"))
  const slug = attributeIntelligence.attribute
  listedFiled(root, ATTRIBUTE, slug, [{ path: PAGE_AT, id: `held-${slug}` }])
  return root
}

test("this readout names the attribute whose points it shows", () => {
  expect(attributeIntelligence.attribute).toBe("intelligence")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeIntelligence.attribute, 1.25)
  expect(intelligenceShown(root)).toBe(1.25)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(intelligenceShown(rootMade())).toBeNull()
})
