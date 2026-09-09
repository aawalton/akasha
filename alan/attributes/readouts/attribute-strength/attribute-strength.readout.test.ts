import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { listedFiled } from "@akasha/indexes/testing"
import { keepPointsToday } from "../../points/attribute-points.module.code.ts"
import { strengthShown } from "./attribute-strength.readout.code.ts"
import { attributeStrength } from "./attribute-strength.readout.ts"

const HOLD = "/var/tmp"

const ATTRIBUTE = "attribute"

const PAGE_AT = "held/attribute-pages/strength.attribute.ts"

function rootMade(): string {
  const root = mkdtempSync(join(HOLD, "attribute-strength-"))
  const slug = attributeStrength.attribute
  listedFiled(root, ATTRIBUTE, slug, [{ path: PAGE_AT, id: `held-${slug}` }])
  return root
}

test("this readout names the attribute whose points it shows", () => {
  expect(attributeStrength.attribute).toBe("strength")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeStrength.attribute, 2.5)
  expect(strengthShown(root)).toBe(2.5)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(strengthShown(rootMade())).toBeNull()
})
