import { describe, expect, test } from "bun:test"
import type { ClientBeat } from "./client-session"
import type { ClientStoryTurn } from "./client-story-session"
import { interleaveTurnSegments } from "./prose-interleave"

type SystemClientBeat = Extract<ClientBeat, { type: "system" }>

function turn(text: string, turnNumber = 4): ClientStoryTurn {
  return { id: "t1", title: "A Turn", text, turnNumber }
}
function sys(
  title: string,
  lines: readonly string[],
  extra?: Partial<SystemClientBeat>
): SystemClientBeat {
  return { type: "system", title, lines: [...lines], turn: 4, ...extra }
}

describe("interleaveTurnSegments (#14443)", () => {
  test("zero markers → not interleaved (no segments; renders flat text)", () => {
    const result = interleaveTurnSegments(turn("Plain prose.\n\nMore prose."), [
      sys("Ding", ["Level 2."]),
    ])
    expect(result.segments).toBeUndefined()
    expect(result.mismatch).toBeUndefined()
  })

  test("one marker + one system beat → ordinal join, card slotted inline", () => {
    const result = interleaveTurnSegments(turn("She crossed.\n\n{{system}}\n\nThe air changed."), [
      sys("Threshold", ["Floor 4."]),
    ])
    expect(result.mismatch).toBeUndefined()
    expect(result.segments).toEqual([
      { kind: "prose", text: "She crossed." },
      { kind: "system", title: "Threshold", lines: ["Floor 4."] },
      { kind: "prose", text: "The air changed." },
    ])
  })

  test("multiple markers bind beats in document order", () => {
    const result = interleaveTurnSegments(turn("A.\n\n{{system}}\n\nB.\n\n{{system}}\n\nC."), [
      sys("First", ["1"]),
      sys("Second", ["2"]),
    ])
    expect(result.segments).toEqual([
      { kind: "prose", text: "A." },
      { kind: "system", title: "First", lines: ["1"] },
      { kind: "prose", text: "B." },
      { kind: "system", title: "Second", lines: ["2"] },
      { kind: "prose", text: "C." },
    ])
  })

  test("non-choice system segment carries ONLY renderable content — id/turn/coordinator fields never leak", () => {
    const result = interleaveTurnSegments(turn("x\n\n{{system}}\n\ny"), [
      sys("Ding", ["Up."], { id: 42, turn: 4 }),
    ])
    const systemSeg = result.segments?.find((s) => s.kind === "system")
    expect(systemSeg).toEqual({ kind: "system", title: "Ding", lines: ["Up."] })
    expect(JSON.stringify(systemSeg)).not.toContain("42")
    expect(JSON.stringify(systemSeg)).not.toContain("turn")
    expect(JSON.stringify(systemSeg)).not.toContain("windowId")
  })

  test("system-choice segment carries `windowId` — the SOLE deliberate non-renderable exception (#15323)", () => {
    const choiceBeat: SystemClientBeat = {
      type: "system",
      turn: 4,
      id: 42,
      window: {
        type: "system-choice",
        choice: {
          id: "perk-1",
          title: "Pick a perk",
          options: [{ id: "ironhide", label: "Ironhide" }],
        },
      },
    }
    const result = interleaveTurnSegments(turn("x\n\n{{system}}\n\ny"), [choiceBeat])
    const systemSeg = result.segments?.find((s) => s.kind === "system")
    expect(systemSeg).toEqual({
      kind: "system",
      window: {
        type: "system-choice",
        choice: {
          id: "perk-1",
          title: "Pick a perk",
          options: [{ id: "ironhide", label: "Ironhide" }],
        },
      },
      windowId: "42",
    })
    expect(Object.keys(systemSeg ?? {}).sort()).toEqual(["kind", "window", "windowId"])
    expect(JSON.stringify(systemSeg)).not.toContain('"turn"')
  })

  test("more markers than beats → neutral placeholders + GM-side mismatch detail", () => {
    const result = interleaveTurnSegments(turn("a\n\n{{system}}\n\nb\n\n{{system}}\n\nc"), [
      sys("Only one", ["x"]),
    ])
    expect(result.segments).toEqual([
      { kind: "prose", text: "a" },
      { kind: "unavailable" },
      { kind: "prose", text: "b" },
      { kind: "unavailable" },
      { kind: "prose", text: "c" },
    ])
    expect(result.mismatch).toEqual({
      turnId: "t1",
      turnNumber: 4,
      reason: "count",
      markerCount: 2,
      beatCount: 1,
    })
    expect(JSON.stringify(result.segments)).not.toContain("2")
  })

  test("fewer markers than beats → mismatch, neutral placeholder", () => {
    const result = interleaveTurnSegments(turn("a\n\n{{system}}\n\nb"), [
      sys("One", ["x"]),
      sys("Two", ["y"]),
    ])
    expect(result.segments?.some((s) => s.kind === "unavailable")).toBe(true)
    expect(result.segments?.some((s) => s.kind === "system")).toBe(false)
    expect(result.mismatch?.reason).toBe("count")
  })

  test("malformed marker at rest → plain prose, reported as mismatch, never a crash", () => {
    const result = interleaveTurnSegments(turn("a\n\n{{sytem}}\n\nb"), [sys("D", ["x"])])
    expect(result.segments).toBeUndefined()
    expect(result.mismatch?.reason).toBe("malformed")
  })

  test("markers but a turnless turn (no matched beats) → mismatch neutral, never raw markers", () => {
    const result = interleaveTurnSegments(
      { id: "t1", title: "T", text: "a\n\n{{system}}\n\nb" },
      []
    )
    expect(result.segments).toContainEqual({ kind: "unavailable" })
    expect(JSON.stringify(result.segments)).not.toContain("{{system}}")
  })
})
