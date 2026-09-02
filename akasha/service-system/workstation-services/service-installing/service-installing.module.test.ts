import { afterAll, expect, test } from "bun:test"
import { existsSync, lstatSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { WorkstationService } from "../workstation-service.page-type.ts"
import {
  linkUnit,
  ourInstalled,
  ownedByService,
  planFor,
  stagingDir,
  systemdDir,
  textFor,
  unitChanged,
  unlinkUnit,
  writeUnit,
} from "./service-installing.module.code.ts"

const HOME = mkdtempSync("/var/tmp/service-installing-")

afterAll(() => rmSync(HOME, { recursive: true, force: true }))

const BASE = {
  id: "01a05a51-0000-7000-8000-00000000000b",
  pageTypeSlug: "workstation-service",
  slug: "held-service",
  definition: "the service a test writes a unit for",
  runs: ["bun a.ts"],
  enabled: true,
} as const satisfies WorkstationService

function pageOf(more: Partial<WorkstationService>) {
  return { service: { ...BASE, ...more }, pagePath: "akasha/a.workstation-service.ts" }
}

test("an unscheduled service is written one unit and a scheduled one is written two", () => {
  expect([...textFor(pageOf({})).keys()]).toEqual(["held-service.service"])
  expect([...textFor(pageOf({ systemd: { schedule: "daily" } })).keys()]).toEqual([
    "held-service.service",
    "held-service.timer",
  ])
})

test("a service that is to be running is enabled and one that is not is stopped", () => {
  const on = planFor([pageOf({})], [])
  expect(on.enable).toEqual(["held-service.service"])
  expect(on.stop).toEqual([])
  const off = planFor([pageOf({ enabled: false })], [])
  expect(off.enable).toEqual([])
  expect(off.stop).toEqual(["held-service.service"])
})

test("a service that is not to be running is still written its unit", () => {
  expect([...planFor([pageOf({ enabled: false })], []).write.keys()]).toEqual([
    "held-service.service",
  ])
})

test("only the timer of a scheduled service is enabled", () => {
  const plan = planFor([pageOf({ systemd: { schedule: "daily" } })], [])
  expect(plan.enable).toEqual(["held-service.timer"])
  expect([...plan.write.keys()].length).toBe(2)
})

test("a unit standing that no service accounts for is removed", () => {
  const plan = planFor([pageOf({})], ["held-service.service", "gone-away.service"])
  expect(plan.remove).toEqual(["gone-away.service"])
})

test("a unit a service does account for is not removed", () => {
  expect(planFor([pageOf({})], ["held-service.service"]).remove).toEqual([])
})

test("what one service owns is its own two names and no others", () => {
  const owned = ["a.service", "a.timer", "b.service", "held-service.service"]
  expect(ownedByService(owned, "a")).toEqual(["a.service", "a.timer"])
  expect(ownedByService(owned, "never")).toEqual([])
})

test("a unit that is not there has changed, and one written the same has not", () => {
  expect(unitChanged(HOME, "x.service", "body")).toBe(true)
  writeUnit(HOME, "x.service", "body")
  expect(unitChanged(HOME, "x.service", "body")).toBe(false)
  expect(unitChanged(HOME, "x.service", "other")).toBe(true)
})

test("a unit is written to the staging folder and reached by a link systemd reads", () => {
  writeUnit(HOME, "y.service", "body")
  linkUnit(HOME, "y.service")
  const at = join(systemdDir(HOME), "y.service")
  expect(lstatSync(at).isSymbolicLink()).toBe(true)
  expect(realpathSync(at)).toBe(join(realpathSync(stagingDir(HOME)), "y.service"))
})

test("linking a unit already linked leaves it alone", () => {
  writeUnit(HOME, "z.service", "body")
  linkUnit(HOME, "z.service")
  linkUnit(HOME, "z.service")
  expect(existsSync(join(systemdDir(HOME), "z.service"))).toBe(true)
})

test("a link standing where a unit belongs is replaced rather than refused", () => {
  writeUnit(HOME, "w.service", "body")
  writeFileSync(join(systemdDir(HOME), "w.service"), "someone else wrote this")
  linkUnit(HOME, "w.service")
  expect(lstatSync(join(systemdDir(HOME), "w.service")).isSymbolicLink()).toBe(true)
})

test("the units we own are the links pointing into our staging folder", () => {
  writeFileSync(join(systemdDir(HOME), "theirs.service"), "not ours")
  const owned = ourInstalled(HOME)
  expect(owned).toContain("y.service")
  expect(owned).toContain("z.service")
  expect(owned).not.toContain("theirs.service")
})

test("unlinking a unit takes away both the link and the file it named", () => {
  writeUnit(HOME, "bye.service", "body")
  linkUnit(HOME, "bye.service")
  unlinkUnit(HOME, "bye.service")
  expect(existsSync(join(systemdDir(HOME), "bye.service"))).toBe(false)
  expect(existsSync(join(stagingDir(HOME), "bye.service"))).toBe(false)
})

test("nothing is owned where no unit folder stands", () => {
  expect(ourInstalled(join(HOME, "nowhere"))).toEqual([])
})
