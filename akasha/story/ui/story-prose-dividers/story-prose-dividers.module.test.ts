import { describe, expect, test } from "bun:test"
import type { ClientStoryTurn } from "../client-story-session/client-story-session.module.code.ts"
import { projectProseRows } from "./story-prose-dividers.module.code.ts"

const turn = (overrides: Partial<ClientStoryTurn>): ClientStoryTurn => ({
  id: "t",
  title: "A Turn",
  text: "prose",
  ...overrides,
})

describe("projectProseRows", () => {
  test("marks only the last turn as the newest", () => {
    const rows = projectProseRows([turn({ id: "a" }), turn({ id: "b" })])
    expect(rows.map((r) => r.newest)).toEqual([false, true])
  })

  test("names a divider where the session number changes", () => {
    const rows = projectProseRows([
      turn({ id: "a", sessionNumber: 1 }),
      turn({ id: "b", sessionNumber: 2 }),
      turn({ id: "c", sessionNumber: 2 }),
    ])
    expect(rows.map((r) => r.sessionDivider)).toEqual([null, 2, null])
  })

  test("names no divider on the very first turn", () => {
    const rows = projectProseRows([turn({ id: "a", sessionNumber: 7 })])
    expect(rows[0]?.sessionDivider).toBeNull()
  })

  test("shows titles unless they are hidden", () => {
    expect(projectProseRows([turn({})])[0]?.showTitle).toBe(true)
    expect(projectProseRows([turn({})], { titles: "hidden" })[0]?.showTitle).toBe(false)
  })

  test("mutes an older turn that was read to the end", () => {
    const rows = projectProseRows(
      [turn({ id: "a", fullyRead: true }), turn({ id: "b", fullyRead: true })],
      { pastTurns: "muted" }
    )
    expect(rows.map((r) => r.muted)).toEqual([true, false])
  })

  test("mutes nothing where past turns are plain", () => {
    const rows = projectProseRows([turn({ id: "a", fullyRead: true }), turn({ id: "b" })], {
      pastTurns: "plain",
    })
    expect(rows.map((r) => r.muted)).toEqual([false, false])
  })

  test("is empty for no turns", () => {
    expect(projectProseRows([])).toEqual([])
  })
})
