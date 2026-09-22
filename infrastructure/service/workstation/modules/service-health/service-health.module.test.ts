import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import {
  brokenIn,
  healthFor,
  healthIn,
  runningNow,
  SETTLE_MS,
  settling,
  stampIn,
  stateFor,
  statesIn,
  type Watched,
  watchedIn,
} from "akasha/infrastructure/service/workstation/modules/service-health/service-health.module.code.ts"
import type { Started } from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"
import { mergeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const BASE = {
  id: "01a05a51-0000-7000-8000-00000000000d",
  type: "service-workstation",
  slug: "held-service",
  definition: "the service a test reads the health of",
  runs: ["bun a.ts"],
  enabled: true,
} as const satisfies Started

const PAGE = "akasha/a.service-workstation.ts"

const ROOT = process.cwd()

const OFF = "workstation.alanwalton.ts.net"

function pageOf(more: Partial<Started>) {
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
  told: true,
}

const TIMED: Watched = { ...RUNNING, scheduled: true }

const REFUSED: Watched = { ...RUNNING, unbound: [OFF] }

const CHANGED = "2026-09-10T18:00:00.000Z"

const UP = { activeState: "active", result: "success", changedAt: CHANGED } as const

const COMING_UP = {
  activeState: "activating",
  result: "success",
  changedAt: CHANGED,
} as const

const LOOPING = {
  activeState: "activating",
  result: "exit-code",
  changedAt: CHANGED,
} as const

const NOW = new Date("2026-09-10T18:10:00.000Z")

const BEAT = "2026-09-10T18:05:00.000Z"

const OLD_BEAT = "2026-09-10T17:30:00.000Z"

const BEATS: Watched = { ...RUNNING, worksWithinMs: 900_000, workedAt: BEAT }

const SHOWN =
  "Id=a.service\nActiveState=active\nResult=success\nStateChangeTimestamp=@1789339922\n\n" +
  "Id=b.service\nActiveState=failed\nResult=exit-code\nStateChangeTimestamp="

test("the state of each unit is read off the block naming that unit", () => {
  const states = statesIn(SHOWN)
  expect(states.get("a.service")).toEqual({
    activeState: "active",
    result: "success",
    changedAt: "2026-09-13T22:52:02.000Z",
  })
  expect(states.get("b.service")).toEqual({
    activeState: "failed",
    result: "exit-code",
    changedAt: null,
  })
})

test("a moment systemd said nothing of is carried as none rather than as an instant", () => {
  expect(stampIn(undefined)).toBe(null)
  expect(stampIn("")).toBe(null)
  expect(stampIn("Sun 2026-09-13 16:52:02 MDT")).toBe(null)
  expect(stampIn("@nonsense")).toBe(null)
  expect(stampIn("@1789339922")).toBe("2026-09-13T22:52:02.000Z")
})

test("text stating nothing carries the state of no unit", () => {
  expect(statesIn("").size).toBe(0)
  expect(statesIn("\n\n").size).toBe(0)
})

test("a unit active, activating or reloading is running, and every other state is not", () => {
  expect(runningNow({ ...UP, activeState: "active" })).toBe(true)
  expect(runningNow({ ...UP, activeState: "activating" })).toBe(true)
  expect(runningNow({ ...UP, activeState: "reloading" })).toBe(true)
  expect(runningNow({ ...UP, activeState: "inactive" })).toBe(false)
  expect(runningNow({ ...UP, activeState: "deactivating" })).toBe(false)
  expect(runningNow({ ...UP, activeState: "failed" })).toBe(false)
})

test("a unit systemd said nothing of is not running", () => {
  expect(runningNow(undefined)).toBe(false)
})

test("the state of one unit is read off what systemd was asked about that unit alone", () => {
  let asked: readonly string[] = []
  const state = stateFor("held-service.service", (units) => {
    asked = units
    return "Id=held-service.service\nActiveState=active\nResult=success"
  })
  expect(asked).toEqual(["held-service.service"])
  expect(state?.activeState).toBe("active")
})

test("a unit systemd answers nothing for has no state to read", () => {
  expect(stateFor("held-service.service", () => "")).toBe(undefined)
})

test("a unit that failed is broken, and the reason names what systemd said", () => {
  const said = brokenIn(RUNNING, { activeState: "failed", result: "exit-code", changedAt: null })
  expect(said).toContain("held-service.service failed")
  expect(said).toContain("exit-code")
})

test("a unit that failed is broken at the moment systemd says it failed", () => {
  const said = brokenIn(RUNNING, {
    activeState: "failed",
    result: "exit-code",
    changedAt: CHANGED,
  })
  expect(said).toContain(`failed at ${CHANGED}`)
})

test("a scheduled service between its runs is well", () => {
  expect(brokenIn(TIMED, { activeState: "inactive", result: "success", changedAt: null })).toBe(
    null
  )
})

test("a service that is to be running and is not is broken", () => {
  expect(
    brokenIn(RUNNING, { activeState: "inactive", result: "success", changedAt: null })
  ).toContain("rather than running")
})

test("a service that stopped running inside the settle is well rather than broken", () => {
  const just = new Date(NOW.getTime() - 2_000).toISOString()
  expect(
    brokenIn(RUNNING, { activeState: "deactivating", result: "success", changedAt: just }, NOW)
  ).toBe(null)
  expect(
    brokenIn(RUNNING, { activeState: "inactive", result: "success", changedAt: just }, NOW)
  ).toBe(null)
})

test("a service that stopped running longer ago than the settle is broken", () => {
  const held = new Date(NOW.getTime() - SETTLE_MS).toISOString()
  expect(
    brokenIn(RUNNING, { activeState: "inactive", result: "success", changedAt: held }, NOW)
  ).toContain("rather than running")
})

test("a unit that failed is broken at once rather than waiting out the settle", () => {
  const just = new Date(NOW.getTime() - 2_000).toISOString()
  expect(
    brokenIn(RUNNING, { activeState: "failed", result: "exit-code", changedAt: just }, NOW)
  ).toContain("failed")
})

test("a unit systemd said no moment for waits out no settle", () => {
  expect(settling(null, NOW)).toBe(false)
  expect(settling("lately", NOW)).toBe(false)
})

test("a service that is not running says since when systemd says it stopped", () => {
  const said = brokenIn(RUNNING, {
    activeState: "inactive",
    result: "success",
    changedAt: CHANGED,
  })
  expect(said).toContain(`rather than running, and has been since ${CHANGED}`)
})

test("a service still coming up is well", () => {
  expect(brokenIn(RUNNING, { activeState: "activating", result: "success", changedAt: null })).toBe(
    null
  )
})

test("a unit coming up again after a bad result is broken though it never reached failed", () => {
  const said = brokenIn(RUNNING, LOOPING, NOW)
  expect(said).toContain("held-service.service last ended badly")
  expect(said).toContain("exit-code")
})

test("a unit that ended badly names the moment systemd measured it", () => {
  expect(brokenIn(RUNNING, LOOPING, NOW)).toContain(`last ended badly at ${CHANGED}`)
})

test("a unit that ended badly is broken at once rather than waiting out the settle", () => {
  const just = new Date(NOW.getTime() - 2_000).toISOString()
  expect(
    brokenIn(RUNNING, { activeState: "activating", result: "exit-code", changedAt: just }, NOW)
  ).toContain("last ended badly")
})

test("a unit restarting on the exit a watch leaves on reads success, so that restart is well", () => {
  expect(brokenIn(RUNNING, COMING_UP, NOW)).toBe(null)
})

test("a result systemd states as nothing at all is no reason to call a unit broken", () => {
  expect(brokenIn(RUNNING, { activeState: "active", result: "", changedAt: null }, NOW)).toBe(null)
  expect(brokenIn(TIMED, { activeState: "inactive", result: "", changedAt: null }, NOW)).toBe(null)
})

test("a service told to stop reads success, so a stop is judged by the state alone", () => {
  const just = new Date(NOW.getTime() - 2_000).toISOString()
  expect(
    brokenIn(RUNNING, { activeState: "inactive", result: "success", changedAt: just }, NOW)
  ).toBe(null)
})

test("a scheduled service whose run ended badly is broken though it rests between runs", () => {
  const said = brokenIn(TIMED, { activeState: "inactive", result: "exit-code", changedAt: null })
  expect(said).toContain("last ended badly")
})

test("a scheduled service whose run ended well is well", () => {
  expect(brokenIn(TIMED, { activeState: "inactive", result: "success", changedAt: CHANGED })).toBe(
    null
  )
})

test("a unit systemd does not know is broken rather than well", () => {
  expect(brokenIn(RUNNING, undefined)).toContain("no unit systemd knows")
})

test("a service that is not to be running is watched by nothing", () => {
  expect(watchedIn(ROOT, [pageOf({ enabled: false })])).toEqual([])
})

test("a service stating nothing is told, and one stating false is not", () => {
  expect(watchedIn(ROOT, [pageOf({})])[0]?.told).toBe(true)
  expect(watchedIn(ROOT, [pageOf({ told: false })])[0]?.told).toBe(false)
})

test("whether a service is told is carried with that service's health", () => {
  const watched = watchedIn(ROOT, [pageOf({ told: false })])
  expect(healthIn(watched, statesIn(""))[0]?.told).toBe(false)
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
  const said = brokenIn(REFUSED, { activeState: "active", result: "success", changedAt: null })
  expect(said).toContain("not listening")
  expect(said).toContain(OFF)
})

test("a host name unbound is broken though that service is scheduled", () => {
  const said = brokenIn(
    { ...REFUSED, scheduled: true },
    { activeState: "inactive", result: "", changedAt: null }
  )
  expect(said).toContain(OFF)
})

test("a service listening on every host name its page states is well", () => {
  expect(brokenIn(RUNNING, { activeState: "active", result: "success", changedAt: null })).toBe(
    null
  )
})

test("what a service published as unbound is carried into what is watched", () => {
  const root = mkdtempSync("/var/tmp/service-health-unbound-")
  try {
    mergeUncommitted(root, PAGE, { unbound: [OFF] })
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
  expect(
    brokenIn(timed, { activeState: "inactive", result: "success", changedAt: null }, NOW)
  ).toContain("last said its work landed")
})

test("the seconds a service states are read as the window it may go", () => {
  const watched = watchedIn(ROOT, [pageOf({ worksWithinSeconds: 900 })])
  expect(watched[0]?.worksWithinMs).toBe(900_000)
  expect(watchedIn(ROOT, [pageOf({})])[0]?.worksWithinMs).toBe(null)
})

test("a moment published beside a service page is carried into what is watched", () => {
  const root = mkdtempSync("/var/tmp/service-health-beat-")
  try {
    mergeUncommitted(root, PAGE, { workedAt: OLD_BEAT })
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
  expect(asked).toContain("page-service.service")
  expect(health.every((one) => one.broken !== null)).toBe(true)
})
