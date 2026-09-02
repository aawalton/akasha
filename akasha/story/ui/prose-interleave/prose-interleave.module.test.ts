import { describe, expect, test } from "bun:test"
import type { ClientBeat } from "../client-session/client-session.module.code.ts"
import type { ClientStoryTurn } from "../client-story-session/client-story-session.module.code.ts"
import { interleaveTurnSegments } from "./prose-interleave.module.code.ts"

type SystemClientBeat = Extract<ClientBeat, { type: "system" }>

const turn = (text: string): ClientStoryTurn => ({ id: "t1", title: "A Turn", text, turnNumber: 4 })

const systemBeat = (title: string): SystemClientBeat => ({ type: "system", title, turn: 4 })

describe("interleaveTurnSegments", () => {
  test("gives back nothing where the prose holds no marker", () => {
    expect(interleaveTurnSegments(turn("just prose"), [])).toEqual({})
  })

  test("sets each beat where its marker was", () => {
    const text = "before\n\n{{system}}\n\nafter"
    const { segments, mismatch } = interleaveTurnSegments(turn(text), [systemBeat("Threshold")])
    expect(mismatch).toBeUndefined()
    expect(segments).toEqual([
      { kind: "prose", text: "before" },
      { kind: "system", title: "Threshold" },
      { kind: "prose", text: "after" },
    ])
  })

  test("reports a count mismatch and leaves the marker unavailable", () => {
    const text = "before\n\n{{system}}\n\nafter"
    const { segments, mismatch } = interleaveTurnSegments(turn(text), [])
    expect(mismatch).toEqual({
      turnId: "t1",
      turnNumber: 4,
      reason: "count",
      markerCount: 1,
      beatCount: 0,
    })
    expect(segments).toEqual([
      { kind: "prose", text: "before" },
      { kind: "unavailable" },
      { kind: "prose", text: "after" },
    ])
  })

  test("reports malformed prose without any segments", () => {
    const { segments, mismatch } = interleaveTurnSegments(turn("before\n\n{{ oops"), [
      systemBeat("X"),
    ])
    expect(segments).toBeUndefined()
    expect(mismatch).toEqual({
      turnId: "t1",
      turnNumber: 4,
      reason: "malformed",
      markerCount: 0,
      beatCount: 1,
    })
  })

  test("names the window's beat where the window is a system choice", () => {
    const beat: SystemClientBeat = {
      type: "system",
      id: 12,
      turn: 4,
      window: {
        type: "system-choice",
        choice: { id: "c1", title: "Pick", options: [{ id: "a", label: "A" }] },
      },
    }
    const { segments } = interleaveTurnSegments(turn("{{system}}"), [beat])
    expect(segments?.[0]).toMatchObject({ kind: "system", windowId: "12" })
  })

  test("takes the beats in the order the markers come", () => {
    const text = "a\n\n{{system}}\n\nb\n\n{{system}}"
    const { segments } = interleaveTurnSegments(turn(text), [systemBeat("One"), systemBeat("Two")])
    expect(segments?.map((s) => (s.kind === "system" ? s.title : s.kind))).toEqual([
      "prose",
      "One",
      "prose",
      "Two",
    ])
  })
})
