import { describe, expect, it } from "bun:test"
import { z } from "zod"
import { askComposed } from "./ask"
import type { Fetcher } from "./index"
import { openedRows, openedValue } from "./opened"

const replying =
  (body: unknown): Fetcher =>
  () =>
    Promise.resolve(Response.json(body, { status: 200 }))

describe("openedValue — a nested value the service carries as text reads back as a record", () => {
  it("opens a list of JSON text into a list of records", () => {
    expect(openedValue(['{"id":"b1","status":"open"}', '{"id":"b2","status":"closed"}'])).toEqual([
      { id: "b1", status: "open" },
      { id: "b2", status: "closed" },
    ])
  })

  it("opens one JSON text holding a whole list", () => {
    expect(openedValue('[{"id":"b1"}]')).toEqual([{ id: "b1" }])
  })

  it("opens one JSON text holding a single record", () => {
    expect(openedValue('{"id":"b1"}')).toEqual({ id: "b1" })
  })

  it("leaves a list that is already records alone", () => {
    expect(openedValue([{ id: "b1" }])).toEqual([{ id: "b1" }])
  })

  it("keeps text a file states as text, whatever JSON would make of it", () => {
    expect(openedValue("the tower")).toBe("the tower")
    expect(openedValue("123")).toBe("123")
    expect(openedValue("1-0")).toBe("1-0")
    expect(openedValue("true")).toBe("true")
    expect(openedValue("null")).toBe("null")
  })

  it("leaves bracketed text that is not JSON alone", () => {
    expect(openedValue("[not json]")).toBe("[not json]")
    expect(openedValue("{seat}")).toBe("{seat}")
  })

  it("leaves a number, a boolean and null as they arrived", () => {
    expect(openedValue(7)).toBe(7)
    expect(openedValue(false)).toBe(false)
    expect(openedValue(null)).toBe(null)
  })

  it("carries every other field of a row through", () => {
    expect(
      openedRows([
        { at: "stories:a.jsonl#0", values: { log: ['{"id":"b1"}'], title: "The Tower" } },
      ])
    ).toEqual([{ at: "stories:a.jsonl#0", values: { log: [{ id: "b1" }], title: "The Tower" } }])
  })
})

describe("askComposed — the caller reads a field off a nested record", () => {
  it("hands back a record rather than the text of one", async () => {
    const asked = await askComposed(
      { "page-type": "game-state", limit: 1 },
      replying({
        n: 1,
        value: null,
        over: null,
        rows: [
          {
            at: "stories:the-tower.states.jsonl#0",
            values: { chapters: ['{"status":"open","startBeat":"b165"}'] },
          },
        ],
      })
    )
    expect(asked.ok).toBe(true)
    if (!asked.ok) return
    const chapters = z
      .array(z.object({ status: z.string() }))
      .parse(asked.answer.rows[0]?.values.chapters)
    expect(chapters[0]?.status).toBe("open")
  })
})
