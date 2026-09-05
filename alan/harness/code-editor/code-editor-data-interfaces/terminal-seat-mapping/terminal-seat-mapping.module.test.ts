import { describe, expect, it } from "bun:test"
import { seatByShellPid, type TmuxClient } from "./terminal-seat-mapping.module.code.ts"

// A tree read as a plain table, so no test here opens /proc.
function parentIn(tree: Readonly<Record<number, number>>): (pid: number) => number | undefined {
  return (pid) => tree[pid]
}

const SEATS = new Set(["amy", "aranya"])

describe("a terminal running a tmux client", () => {
  it("is named by the session that client sits on", () => {
    const clients: readonly TmuxClient[] = [{ pid: 50, session: "amy" }]
    const found = seatByShellPid(clients, SEATS, parentIn({ 50: 40, 40: 30, 30: 1 }))
    expect(found.get(40)).toBe("amy")
    expect(found.get(30)).toBe("amy")
  })

  it("names nothing above the process that started every other", () => {
    const clients: readonly TmuxClient[] = [{ pid: 50, session: "amy" }]
    const found = seatByShellPid(clients, SEATS, parentIn({ 50: 40, 40: 1 }))
    expect(found.has(1)).toBe(false)
    expect([...found.keys()]).toEqual([40])
  })

  it("is walked twenty hops at most", () => {
    const tree: Record<number, number> = {}
    for (let pid = 100; pid > 60; pid--) tree[pid] = pid - 1
    const found = seatByShellPid([{ pid: 100, session: "amy" }], SEATS, parentIn(tree))
    expect(found.size).toBe(20)
    expect(found.has(80)).toBe(true)
    expect(found.has(79)).toBe(false)
  })
})

describe("a session that is no seat", () => {
  it("names no pid at all", () => {
    const found = seatByShellPid([{ pid: 50, session: "somebody" }], SEATS, parentIn({ 50: 40 }))
    expect(found.size).toBe(0)
  })
})

describe("a pid two seats both reach", () => {
  it("is given to neither", () => {
    const clients: readonly TmuxClient[] = [
      { pid: 50, session: "amy" },
      { pid: 70, session: "aranya" },
    ]
    const found = seatByShellPid(clients, SEATS, parentIn({ 50: 40, 40: 9, 70: 60, 60: 9, 9: 1 }))
    expect(found.get(40)).toBe("amy")
    expect(found.get(60)).toBe("aranya")
    expect(found.has(9)).toBe(false)
  })

  it("is kept where both reaches are the one seat", () => {
    const clients: readonly TmuxClient[] = [
      { pid: 50, session: "amy" },
      { pid: 70, session: "amy" },
    ]
    const found = seatByShellPid(clients, SEATS, parentIn({ 50: 9, 70: 9, 9: 1 }))
    expect(found.get(9)).toBe("amy")
  })
})

describe("no tmux client at all", () => {
  it("names no pid", () => {
    expect(seatByShellPid([], SEATS, parentIn({ 50: 40 })).size).toBe(0)
  })
})

describe("a chain that runs out", () => {
  it("stops where the parent cannot be read", () => {
    const found = seatByShellPid([{ pid: 50, session: "amy" }], SEATS, parentIn({ 50: 40 }))
    expect([...found.keys()]).toEqual([40])
  })
})
