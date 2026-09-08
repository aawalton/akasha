import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { keepPointsToday } from "../../points/attribute-points.module.code.ts"
import { constitutionShown } from "./attribute-constitution.readout.code.ts"
import { attributeConstitution } from "./attribute-constitution.readout.ts"

const HOLD = "/var/tmp"

const rootMade = () => mkdtempSync(join(HOLD, "attribute-constitution-"))

test("this readout names the attribute whose points it shows", () => {
  expect(attributeConstitution.attributeSlug).toBe("constitution")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeConstitution.attributeSlug, 3.05)
  expect(constitutionShown(root)).toBe(3.05)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(constitutionShown(rootMade())).toBeNull()
})
