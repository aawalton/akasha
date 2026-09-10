import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { listedFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { keepPointsToday } from "../../points/attribute-points.module.code.ts"
import { constitutionShown } from "./attribute-constitution.readout.code.ts"
import { attributeConstitution } from "./attribute-constitution.readout.ts"

const HOLD = "/var/tmp"

const ATTRIBUTE = "attribute"

const PAGE_AT = "held/attribute-pages/constitution.attribute.ts"

function rootMade(): string {
  const root = mkdtempSync(join(HOLD, "attribute-constitution-"))
  const slug = attributeConstitution.attribute
  listedFiled(root, ATTRIBUTE, slug, [{ path: PAGE_AT, id: `held-${slug}` }])
  return root
}

test("this readout names the attribute whose points it shows", () => {
  expect(attributeConstitution.attribute).toBe("constitution")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeConstitution.attribute, 3.05)
  expect(constitutionShown(root)).toBe(3.05)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(constitutionShown(rootMade())).toBeNull()
})
