import { expect, test } from "bun:test"
import { busyTrail, logPastCliffOverride } from "./supervisor-deferred-restart-log.module.code.ts"

test("an unchanged busy reason is said once rather than on every tick", () => {
  const said: string[] = []
  const trail = busyTrail((line) => said.push(line))
  trail.logBusy("in-flight", 0)
  trail.logBusy("in-flight", 1_000)
  trail.logBusy("in-flight", 2_000)
  expect(said).toHaveLength(1)
})

test("an unchanged busy reason is said again once the throttle has passed", () => {
  const said: string[] = []
  const trail = busyTrail((line) => said.push(line))
  trail.logBusy("in-flight", 0)
  trail.logBusy("in-flight", 60_000)
  expect(said).toHaveLength(2)
  expect(said[1]).toContain("still deferring")
})

test("a changed busy reason is said at once", () => {
  const said: string[] = []
  const trail = busyTrail((line) => said.push(line))
  trail.logBusy("in-flight", 0)
  trail.logBusy("busy-children", 1)
  expect(said).toHaveLength(2)
})

test("a fire while busy says the history of busy signals that preceded it", () => {
  const said: string[] = []
  const trail = busyTrail((line) => said.push(line))
  trail.record("in-flight", 0)
  trail.record("in-flight", 1_000)
  trail.record("busy-children", 10_000)
  trail.logFireWhileBusy("ceiling", 30, "", 20_000)
  expect(said[0]).toContain("in-flight 10s")
  expect(said[0]).toContain("busy-children 10s")
})

test("a trail that was reset says it held nothing", () => {
  const said: string[] = []
  const trail = busyTrail((line) => said.push(line))
  trail.record("in-flight", 0)
  trail.reset()
  trail.logFireWhileBusy("ceiling", 30, "", 1_000)
  expect(said[0]).toContain("<none>")
})

test("children that could not be enumerated are said as such rather than as none", async () => {
  const said: string[] = []
  logPastCliffOverride(
    3_600_000,
    () => Promise.reject(new Error("unreadable")),
    (line) => said.push(line)
  )
  await Bun.sleep(1)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("could not be enumerated")
})

test("an override says the children it is overriding", async () => {
  const said: string[] = []
  logPastCliffOverride(
    3_600_000,
    () => Promise.resolve([{ pid: "7", ageMs: 60_000, cmdline: "claude" }]),
    (line) => said.push(line)
  )
  await Bun.sleep(1)
  expect(said[0]).toContain("OVERRIDING 1 busy")
  expect(said[0]).toContain("pid 7")
})

test("an unknown child age is said as unknown", async () => {
  const said: string[] = []
  logPastCliffOverride(
    null,
    () => Promise.resolve([]),
    (line) => said.push(line)
  )
  await Bun.sleep(1)
  expect(said[0]).toContain("age unknown")
  expect(said[0]).toContain("<none readable>")
})
