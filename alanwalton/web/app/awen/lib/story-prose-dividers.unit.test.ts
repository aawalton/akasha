import { describe, expect, test } from "bun:test"
import type { ClientStoryTurn } from "./client-story-session"
import { projectProseRows } from "./story-prose-dividers"

function t(overrides: Partial<ClientStoryTurn> & { id: string }): ClientStoryTurn {
  return { title: "Turn", text: "prose", ...overrides }
}

describe("projectProseRows", () => {
  test("empty turns → empty projection", () => {
    expect(projectProseRows([])).toEqual([])
  })

  test("session scope (no sessionNumber): no session dividers, only the last row is newest", () => {
    const turns = [t({ id: "a" }), t({ id: "b" }), t({ id: "c" })]
    const rows = projectProseRows(turns)
    expect(rows.map((r) => r.sessionDivider)).toEqual([null, null, null])
    expect(rows.map((r) => r.newest)).toEqual([false, false, true])
    expect(rows.map((r) => r.turn.id)).toEqual(["a", "b", "c"])
  })

  test("single turn: it is the newest, no session divider", () => {
    const rows = projectProseRows([t({ id: "solo" })])
    expect(rows).toHaveLength(1)
    expect(rows[0]?.newest).toBe(true)
    expect(rows[0]?.sessionDivider).toBeNull()
  })

  test("full scope multi-session: a session divider at each boundary, labeled with the entering session", () => {
    const turns = [
      t({ id: "s1a", sessionNumber: 1, turnNumber: 0 }),
      t({ id: "s1b", sessionNumber: 1, turnNumber: 1 }),
      t({ id: "s2a", sessionNumber: 2, turnNumber: 2 }),
      t({ id: "s2b", sessionNumber: 2, turnNumber: 3 }),
      t({ id: "s3a", sessionNumber: 3, turnNumber: 4 }),
    ]
    const rows = projectProseRows(turns)
    expect(rows.map((r) => r.sessionDivider)).toEqual([null, null, 2, null, 3])
    expect(rows.map((r) => r.newest)).toEqual([false, false, false, false, true])
  })

  test("full scope single session: sessionNumber present but constant → no dividers", () => {
    const turns = [
      t({ id: "a", sessionNumber: 1 }),
      t({ id: "b", sessionNumber: 1 }),
      t({ id: "c", sessionNumber: 1 }),
    ]
    const rows = projectProseRows(turns)
    expect(rows.map((r) => r.sessionDivider)).toEqual([null, null, null])
    expect(rows.map((r) => r.newest)).toEqual([false, false, true])
  })

  test("boundary coincides with the newest turn: both a session divider and newest apply to the last row", () => {
    const turns = [t({ id: "s1", sessionNumber: 1 }), t({ id: "s2", sessionNumber: 2 })]
    const [r0, r1] = projectProseRows(turns)
    expect(r0?.turn.id).toBe("s1")
    expect(r0?.sessionDivider).toBeNull()
    expect(r0?.newest).toBe(false)
    expect(r1?.turn.id).toBe("s2")
    expect(r1?.sessionDivider).toBe(2)
    expect(r1?.newest).toBe(true)
  })
})

describe("projectProseRows — titles dial (#14521)", () => {
  const turns = [t({ id: "a" }), t({ id: "b" }), t({ id: "c" })]

  test("default options: every row shows its title and nothing is muted", () => {
    const rows = projectProseRows(turns)
    expect(rows.map((r) => r.showTitle)).toEqual([true, true, true])
    expect(rows.map((r) => r.muted)).toEqual([false, false, false])
  })

  test('titles:"shown" is explicit-equivalent to the default: all rows show titles', () => {
    const rows = projectProseRows(turns, { titles: "shown" })
    expect(rows.map((r) => r.showTitle)).toEqual([true, true, true])
  })

  test('titles:"hidden": no row shows its title; muting is untouched', () => {
    const rows = projectProseRows(turns, { titles: "hidden" })
    expect(rows.map((r) => r.showTitle)).toEqual([false, false, false])
    expect(rows.map((r) => r.muted)).toEqual([false, false, false])
  })
})

describe("projectProseRows — read-aware pastTurns muting (#15073)", () => {
  test('pastTurns:"muted": a fully-read past turn mutes; the freshest never mutes', () => {
    const turns = [t({ id: "a", fullyRead: true }), t({ id: "b", fullyRead: true }), t({ id: "c" })]
    const rows = projectProseRows(turns, { pastTurns: "muted" })
    expect(rows.map((r) => r.muted)).toEqual([true, true, false])
    expect(rows.map((r) => r.showTitle)).toEqual([true, true, true])
  })

  test('pastTurns:"muted": an unread past turn does NOT mute (the #14521 fix)', () => {
    const turns = [t({ id: "a", fullyRead: true }), t({ id: "b" }), t({ id: "c" })]
    const rows = projectProseRows(turns, { pastTurns: "muted" })
    expect(rows.map((r) => r.muted)).toEqual([true, false, false])
  })

  test('pastTurns:"muted": muting matches read state EXACTLY across fully/partial/unread', () => {
    const turns = [
      t({ id: "read", fullyRead: true }),
      t({ id: "partial", fullyRead: false }),
      t({ id: "unread" }),
      t({ id: "read2", fullyRead: true }),
      t({ id: "freshest", fullyRead: true }),
    ]
    const rows = projectProseRows(turns, { pastTurns: "muted" })
    expect(rows.map((r) => r.muted)).toEqual([true, false, false, true, false])
  })

  test('pastTurns:"muted": the freshest turn never mutes even when fully read', () => {
    const rows = projectProseRows([t({ id: "solo", fullyRead: true })], { pastTurns: "muted" })
    expect(rows[0]?.muted).toBe(false)
  })

  test('pastTurns:"plain" is byte-identical to before: nothing mutes regardless of read state', () => {
    const turns = [t({ id: "a", fullyRead: true }), t({ id: "b", fullyRead: true }), t({ id: "c" })]
    expect(projectProseRows(turns, { pastTurns: "plain" }).map((r) => r.muted)).toEqual([
      false,
      false,
      false,
    ])
    expect(projectProseRows(turns).map((r) => r.muted)).toEqual([false, false, false])
  })

  test("both dials compose: titles hidden AND read-aware muting", () => {
    const turns = [t({ id: "a", fullyRead: true }), t({ id: "b" }), t({ id: "c", fullyRead: true })]
    const rows = projectProseRows(turns, { titles: "hidden", pastTurns: "muted" })
    expect(rows.map((r) => r.showTitle)).toEqual([false, false, false])
    expect(rows.map((r) => r.muted)).toEqual([true, false, false])
  })

  test('the dials compose with history:"full": session dividers unaffected, muting is read-aware', () => {
    const full = [
      t({ id: "s1a", sessionNumber: 1, fullyRead: true }),
      t({ id: "s1b", sessionNumber: 1 }),
      t({ id: "s2a", sessionNumber: 2, fullyRead: true }),
      t({ id: "s2b", sessionNumber: 2, fullyRead: true }),
    ]
    const rows = projectProseRows(full, { titles: "hidden", pastTurns: "muted" })
    expect(rows.map((r) => r.sessionDivider)).toEqual([null, null, 2, null])
    expect(rows.map((r) => r.newest)).toEqual([false, false, false, true])
    expect(rows.map((r) => r.muted)).toEqual([true, false, true, false])
    expect(rows.map((r) => r.showTitle)).toEqual([false, false, false, false])
  })
})
