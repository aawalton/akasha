import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import {
  brokenIn,
  healthFor,
  healthIn,
  statesIn,
  type Watched,
  watchedIn,
} from "akasha/infrastructure/services/workstations/service-health/service-health.module.code.ts"
import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"
import { keepUncommitted } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"

const BASE = {
  id: "01a05a51-0000-7000-8000-00000000000d",
  type: "service-workstation",
  slug: "held-service",
  definition: "the service a test reads the health of",
  runs: ["bun a.ts"],
  enabled: true,
} as const satisfies ServiceWorkstation

const PAGE = "akasha/a.service-workstation.ts"

const ROOT = process.cwd()

const OFF = "workstation.alanwalton.ts.net"

function pageOf(more: Partial<ServiceWorkstation>) {
  return { service: { ...BASE, ...more }, pagePath: PAGE }
}

const RUNNING: Watched = {
  slug: "held-service",
  unit: "held-service.service",
  pagePath: PAGE,
  scheduled: false,
  unbound: [],
  worksWithinMs: null,
  workedAt: null,
}

const TIMED: Watched = { ...RUNNING, scheduled: true }

const REFUSED: Watched = { ...RUNNING, unbound: [OFF] }

const UP = { activeState: "active", result: "success" } as const

const COMING_UP = { activeState: "activating", result: "auto-restart" } as const

const NOW = new Date("2026-09-10T18:10:00.000Z")

const BEAT = "2026-09-10T18:05:00.000Z"

const OLD_BEAT = "2026-09-10T17:30:00.000Z"

const BEATS: Watched = { ...RUNNING, worksWithinMs: 900_000, workedAt: BEAT }

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

test("a service stating no window is judged by no round of work", () => {
  expect(brokenIn(RUNNING, UP, NOW)).toBe(null)
  expect(brokenIn({ ...RUNNING, workedAt: OLD_BEAT }, UP, NOW)).toBe(null)
})

test("a service whose last round landed inside its window is well", () => {
  expect(brokenIn(BEATS, UP, NOW)).toBe(null)
})

test("a service whose last round landed longer ago than its window is broken", () => {
  const said = brokenIn({ ...BEATS, workedAt: OLD_BEAT }, UP, NOW)
  expect(said).toContain("last said its work landed")
  expect(said).toContain(OLD_BEAT)
})

test("a service stating a window and having landed no round at all is broken", () => {
  expect(brokenIn({ ...BEATS, workedAt: null }, UP, NOW)).toContain("no round of its work landed")
})

test("a moment that is no instant is broken rather than read as recent", () => {
  expect(brokenIn({ ...BEATS, workedAt: "lately" }, UP, NOW)).toContain("no moment")
})

test("a service coming up over and over without a round landing is broken", () => {
  expect(brokenIn({ ...BEATS, workedAt: OLD_BEAT }, COMING_UP, NOW)).toContain(
    "longer ago than the 900s it may go"
  )
})

test("a round landing while the unit keeps coming up is well", () => {
  expect(brokenIn(BEATS, COMING_UP, NOW)).toBe(null)
})

test("a round that has not landed is broken though that service is scheduled", () => {
  const timed = { ...BEATS, scheduled: true, workedAt: OLD_BEAT }
  expect(brokenIn(timed, { activeState: "inactive", result: "success" }, NOW)).toContain(
    "last said its work landed"
  )
})

test("the seconds a service states are read as the window it may go", () => {
  const watched = watchedIn(ROOT, [pageOf({ worksWithinSeconds: 900 })])
  expect(watched[0]?.worksWithinMs).toBe(900_000)
  expect(watchedIn(ROOT, [pageOf({})])[0]?.worksWithinMs).toBe(null)
})

test("a moment published beside a service page is carried into what is watched", () => {
  const root = mkdtempSync("/var/tmp/service-health-beat-")
  try {
    keepUncommitted(root, PAGE, { workedAt: OLD_BEAT })
    const watched = watchedIn(root, [pageOf({ worksWithinSeconds: 900 })])
    expect(watched[0]?.workedAt).toBe(OLD_BEAT)
    const states = statesIn("Id=held-service.service\nActiveState=active")
    expect(healthIn(watched, states, NOW)[0]?.broken).toContain("last said its work landed")
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
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
