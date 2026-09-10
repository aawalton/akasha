import { expect, test } from "bun:test"
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

function pageOf(more: Partial<WorkstationService>) {
  return { service: { ...BASE, ...more }, pagePath: "akasha/a.workstation-service.ts" }
}

const RUNNING: Watched = { slug: "held-service", unit: "held-service.service", scheduled: false }
const TIMED: Watched = { slug: "held-service", unit: "held-service.service", scheduled: true }

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
  expect(watchedIn([pageOf({ enabled: false })])).toEqual([])
})

test("a service stating a schedule is watched as a scheduled one", () => {
  const watched = watchedIn([pageOf({ systemd: { schedule: "daily" } })])
  expect(watched[0]?.scheduled).toBe(true)
  expect(watched[0]?.unit).toBe("held-service.service")
})

test("the health of every unit watched is answered together", () => {
  const states = statesIn("Id=held-service.service\nActiveState=failed\nResult=exit-code")
  const health = healthIn(watchedIn([pageOf({})]), states)
  expect(health.length).toBe(1)
  expect(health[0]?.broken).toContain("failed")
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
