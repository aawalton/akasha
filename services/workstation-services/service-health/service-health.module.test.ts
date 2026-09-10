import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { keepUncommitted } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import type { WorkstationService } from "../workstation-service.page-type.types.ts"
import {
  brokenIn,
  healthFor,
  healthIn,
  statesIn,
  type Watched,
  watchedIn,
} from "./service-health.module.code.ts"

const BASE = {
  id: "01a05a51-0000-7000-8000-00000000000d",
  pageTypeSlug: "workstation-service",
  slug: "held-service",
  definition: "the service a test reads the health of",
  runs: ["bun a.ts"],
  enabled: true,
} as const satisfies WorkstationService

const PAGE = "akasha/a.workstation-service.ts"

const ROOT = process.cwd()

const OFF = "workstation.alanwalton.ts.net"

function pageOf(more: Partial<WorkstationService>) {
  return { service: { ...BASE, ...more }, pagePath: PAGE }
}

const RUNNING: Watched = {
  slug: "held-service",
  unit: "held-service.service",
  pagePath: PAGE,
  scheduled: false,
  unbound: [],
}

const TIMED: Watched = { ...RUNNING, scheduled: true }

const REFUSED: Watched = { ...RUNNING, unbound: [OFF] }

const SHOWN =
  "Id=a.service\nActiveState=active\nResult=success\n\nId=b.service\nActiveState=failed\nResult=exit-code"

test("the state of each unit is read off the block naming that unit", () => {
  const states = statesIn(SHOWN)
  expect(states.get("a.service")).toEqual({ activeState: "active", result: "success" })
  expect(states.get("b.service")).toEqual({ activeState: "failed", result: "exit-code" })
})

test("text stating nothing carries the state of no unit", () => {
  expect(statesIn("").size).toBe(0)
  expect(statesIn("\n\n").size).toBe(0)
})

test("a unit that failed is broken, and the reason names what systemd said", () => {
  const said = brokenIn(RUNNING, { activeState: "failed", result: "exit-code" })
  expect(said).toContain("held-service.service failed")
  expect(said).toContain("exit-code")
})

test("a scheduled service between its runs is well", () => {
  expect(brokenIn(TIMED, { activeState: "inactive", result: "success" })).toBe(null)
})

test("a service that is to be running and is not is broken", () => {
  expect(brokenIn(RUNNING, { activeState: "inactive", result: "success" })).toContain(
    "rather than running"
  )
})

test("a service still coming up is well", () => {
  expect(brokenIn(RUNNING, { activeState: "activating", result: "success" })).toBe(null)
})

test("a unit systemd does not know is broken rather than well", () => {
  expect(brokenIn(RUNNING, undefined)).toContain("no unit systemd knows")
})

test("a service that is not to be running is watched by nothing", () => {
  expect(watchedIn(ROOT, [pageOf({ enabled: false })])).toEqual([])
})

test("a service stating a schedule is watched as a scheduled one", () => {
  const watched = watchedIn(ROOT, [pageOf({ systemd: { schedule: "daily" } })])
  expect(watched[0]?.scheduled).toBe(true)
  expect(watched[0]?.unit).toBe("held-service.service")
})

test("the page a service is stated on is carried with that service's health", () => {
  expect(watchedIn(ROOT, [pageOf({})])[0]?.pagePath).toBe(PAGE)
  expect(healthIn(watchedIn(ROOT, [pageOf({})]), statesIn(""))[0]?.pagePath).toBe(PAGE)
})

test("the health of every unit watched is answered together", () => {
  const states = statesIn("Id=held-service.service\nActiveState=failed\nResult=exit-code")
  const health = healthIn(watchedIn(ROOT, [pageOf({})]), states)
  expect(health.length).toBe(1)
  expect(health[0]?.broken).toContain("failed")
})

test("a service saying it could not bind a host name its page states is broken", () => {
  const said = brokenIn(REFUSED, { activeState: "active", result: "success" })
  expect(said).toContain("not listening")
  expect(said).toContain(OFF)
})

test("a host name unbound is broken though that service is scheduled", () => {
  const said = brokenIn({ ...REFUSED, scheduled: true }, { activeState: "inactive", result: "" })
  expect(said).toContain(OFF)
})

test("a service listening on every host name its page states is well", () => {
  expect(brokenIn(RUNNING, { activeState: "active", result: "success" })).toBe(null)
})

test("what a service published as unbound is carried into what is watched", () => {
  const root = mkdtempSync("/var/tmp/service-health-unbound-")
  try {
    keepUncommitted(root, PAGE, { unbound: [OFF] })
    const watched = watchedIn(root, [pageOf({})])
    expect(watched[0]?.unbound).toEqual([OFF])
    const health = healthIn(watched, statesIn("Id=held-service.service\nActiveState=active"))
    expect(health[0]?.broken).toContain(OFF)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a service publishing nothing unbound carries no host name", () => {
  expect(watchedIn(ROOT, [pageOf({})])[0]?.unbound).toEqual([])
})

test("the services there today are read, and what systemd is asked is what they are installed as", () => {
  let asked: readonly string[] = []
  const health = healthFor(process.cwd(), (units) => {
    asked = units
    return ""
  })
  expect(typeof health).not.toBe("string")
  if (typeof health === "string") return
  expect(asked).toContain("pages-service.service")
  expect(health.every((one) => one.broken !== null)).toBe(true)
})
