import { expect, test } from "bun:test"
import {
  liveProxySeats,
  type ProxySeatAgent,
  type ProxySeatState,
  seatsNewestFirst,
} from "./proxy-seats.module.code.ts"

function agent(id: string, activeAtMs: number, name: string | null = id): ProxySeatAgent {
  return { id, name, activeAtMs }
}

function statesOf(
  held: Readonly<Record<string, ProxySeatState>>
): (agentId: string) => ProxySeatState | null {
  return (agentId) => held[agentId] ?? null
}

test("the newest active seat comes first", () => {
  const ordered = seatsNewestFirst([agent("a", 1), agent("b", 3), agent("c", 2)])
  expect(ordered.map((one) => one.id)).toEqual(["b", "c", "a"])
})

test("two seats active at the same moment are ordered by id", () => {
  const ordered = seatsNewestFirst([agent("z", 5), agent("a", 5)])
  expect(ordered.map((one) => one.id)).toEqual(["a", "z"])
})

test("ordering leaves the list handed in unchanged", () => {
  const given = [agent("a", 1), agent("b", 3)]
  seatsNewestFirst(given)
  expect(given.map((one) => one.id)).toEqual(["a", "b"])
})

test("an empty roster orders to no seats", () => {
  expect(seatsNewestFirst([])).toEqual([])
})

test("a seat whose process answers is live", () => {
  const live = liveProxySeats(
    [agent("a", 1)],
    statesOf({ a: { pid: 10, oauthProxyVersion: "v1" } }),
    () => true
  )
  expect(live).toEqual([{ agentId: "a", name: "a", runningVersion: "v1" }])
})

test("a seat holding no proxy is left out", () => {
  const live = liveProxySeats([agent("a", 1)], statesOf({}), () => true)
  expect(live).toEqual([])
})

test("a seat whose process is gone is left out", () => {
  const live = liveProxySeats(
    [agent("a", 1)],
    statesOf({ a: { pid: 10, oauthProxyVersion: "v1" } }),
    () => false
  )
  expect(live).toEqual([])
})

test("a live seat carries the version its proxy is running", () => {
  const live = liveProxySeats(
    [agent("a", 1)],
    statesOf({ a: { pid: 10, oauthProxyVersion: "abc123" } }),
    () => true
  )
  expect(live[0]?.runningVersion).toBe("abc123")
})

test("a seat carrying no name is live under a null name", () => {
  const live = liveProxySeats(
    [agent("a", 1, null)],
    statesOf({ a: { pid: 10, oauthProxyVersion: "v1" } }),
    () => true
  )
  expect(live[0]?.name).toBe(null)
})

test("the live seats hold the order the agents were handed in", () => {
  const live = liveProxySeats(
    [agent("b", 3), agent("a", 1)],
    statesOf({
      a: { pid: 10, oauthProxyVersion: "v1" },
      b: { pid: 11, oauthProxyVersion: "v2" },
    }),
    () => true
  )
  expect(live.map((one) => one.agentId)).toEqual(["b", "a"])
})

test("a process is asked about only where a seat holds a proxy", () => {
  const asked: number[] = []
  liveProxySeats(
    [agent("a", 1), agent("b", 2)],
    statesOf({ b: { pid: 22, oauthProxyVersion: "v" } }),
    (pid) => {
      asked.push(pid)
      return true
    }
  )
  expect(asked).toEqual([22])
})
