import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { uncommittedIn } from "@akasha/pages/page-uncommitted"
import type { Health } from "../service-health/service-health.module.code.ts"
import { keepVerdicts, LOOKED_AT, verdictFor, WELL } from "./service-wellness.module.code.ts"

const PAGE = "pages/held-service.workstation-service.ts"

const AT = "2026-09-10T00:00:00.000Z"

const LATER = "2026-09-10T00:01:00.000Z"

const BROKE: Health = {
  slug: "held-service",
  unit: "held-service.service",
  pagePath: PAGE,
  broken: "held-service.service failed, and systemd says `exit-code`",
}

const MENDED: Health = { ...BROKE, broken: null }

function rooted(): string {
  const root = mkdtempSync("/var/tmp/service-wellness-")
  mkdirSync(join(root, "pages"), { recursive: true })
  writeFileSync(join(root, PAGE), 'export const heldService = { slug: "held-service" } as const\n')
  return root
}

test("a service found well carries a verdict saying so and the moment of the look", () => {
  const root = rooted()
  keepVerdicts(root, [MENDED], AT)
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: true, [LOOKED_AT]: AT })
  rmSync(root, { recursive: true, force: true })
})

test("a service found broken carries a verdict saying it is not well", () => {
  const root = rooted()
  keepVerdicts(root, [BROKE], AT)
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: false, [LOOKED_AT]: AT })
  rmSync(root, { recursive: true, force: true })
})

test("a service no look reached carries no verdict rather than one saying broken", () => {
  const root = rooted()
  keepVerdicts(root, [], AT)
  expect(uncommittedIn(root, PAGE)).toBe(null)
  rmSync(root, { recursive: true, force: true })
})

test("a verdict replaces the verdict before it", () => {
  const root = rooted()
  keepVerdicts(root, [BROKE], AT)
  keepVerdicts(root, [MENDED], LATER)
  expect(uncommittedIn(root, PAGE)).toEqual({ [WELL]: true, [LOOKED_AT]: LATER })
  rmSync(root, { recursive: true, force: true })
})

test("what a look found and the moment it happened are the whole verdict", () => {
  expect(verdictFor(BROKE, AT)).toEqual({ well: false, lookedAt: AT })
  expect(Object.keys(verdictFor(MENDED, AT))).toEqual([WELL, LOOKED_AT])
})
