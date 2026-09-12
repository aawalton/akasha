import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { keepPointsToday } from "akasha/alan/attributes/modules/points/attribute-points.module.code.ts"
import { constitutionShown } from "akasha/alan/attributes/readouts/attribute-constitution/attribute-constitution.readout.code.ts"
import { attributeConstitution } from "akasha/alan/attributes/readouts/attribute-constitution/attribute-constitution.readout.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"

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
