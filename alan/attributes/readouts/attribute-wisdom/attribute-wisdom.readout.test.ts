import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import { keepPointsToday } from "../../points/attribute-points.module.code.ts"
import { wisdomShown } from "./attribute-wisdom.readout.code.ts"
import { attributeWisdom } from "./attribute-wisdom.readout.ts"

const HOLD = "/var/tmp"

const rootMade = () => mkdtempSync(join(HOLD, "attribute-wisdom-"))

test("this readout names the attribute whose points it shows", () => {
  expect(attributeWisdom.attributeSlug).toBe("wisdom")
})

test("the reading is the points that attribute earned today", () => {
  const root = rootMade()
  keepPointsToday(root, attributeWisdom.attributeSlug, 0.42)
  expect(wisdomShown(root)).toBe(0.42)
})

test("an attribute carrying no points today is no reading rather than a zero", () => {
  expect(wisdomShown(rootMade())).toBeNull()
})
