import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { keepPointsToday } from "../../points/attribute-points.module.code.ts"
import { strengthShown } from "./attribute-strength.readout.code.ts"
import { attributeStrength } from "./attribute-strength.readout.ts"

const HOLD = "/var/tmp"

const rootMade = () => mkdtempSync(join(HOLD, "attribute-strength-"))

test("this readout names the attribute whose points it shows", () => {
  expect(attributeStrength.attributeSlug).toBe("strength")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeStrength.attributeSlug, 2.5)
  expect(strengthShown(root)).toBe(2.5)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(strengthShown(rootMade())).toBeNull()
})
