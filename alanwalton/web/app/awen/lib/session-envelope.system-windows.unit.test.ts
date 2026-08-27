import { describe, expect, test } from "bun:test"
import type { GameDisplayModules } from "@alanwalton/awen-core/game-schema"
import { SessionEnvelopeSchema } from "./client-envelope"
import type { TurnInterleaveMismatch } from "./prose-interleave"
import { composeSessionEnvelope, type StoryLedger } from "./session-envelope"
import { STATE } from "./session-envelope.test-helpers"

describe("composeSessionEnvelope — inline system windows (#14443)", () => {
  const INLINE_MODULES: GameDisplayModules = {
    chapterProse: { systemWindows: true },
    storySoFar: { source: "turns" },
    actionBox: {},
  }
  const ledger = (turn: ClientStoryTurnFixture): StoryLedger => ({
    chapters: [],
    current: [turn],
  })
  type ClientStoryTurnFixture = {
    id: string
    title: string
    text: string
    turnNumber?: number
  }

  test("one authored marker → system beat interleaved inline at its position, no mismatch", () => {
    const seen: TurnInterleaveMismatch[] = []
    const envelope = composeSessionEnvelope(
      "Partners",
      INLINE_MODULES,
      {
        state: STATE,
        story: ledger({
          id: "t4",
          title: "The Threshold",
          text: "She reached the door.\n\n{{system}}\n\nIt opened.",
          turnNumber: 4,
        }),
      },
      (m) => seen.push(m)
    )
    expect(seen).toEqual([])
    expect(envelope.chapterProse?.[0]).toMatchObject({
      id: "t4",
      segments: [
        { kind: "prose", text: "She reached the door." },
        { kind: "system", title: "Threshold", lines: ["Floor 4."] },
        { kind: "prose", text: "It opened." },
      ],
    })
    expect(() => SessionEnvelopeSchema.parse(JSON.parse(JSON.stringify(envelope)))).not.toThrow()
  })

  test("ZERO-marker turn under systemWindows → PLAIN PROSE, no segments, NOT a mismatch (awen edge)", () => {
    const seen: TurnInterleaveMismatch[] = []
    const envelope = composeSessionEnvelope(
      "Partners",
      INLINE_MODULES,
      {
        state: STATE,
        story: ledger({ id: "t4", title: "Older", text: "Just prose.", turnNumber: 4 }),
      },
      (m) => seen.push(m)
    )
    expect(seen).toEqual([])
    expect(envelope.chapterProse?.[0]).toEqual({
      id: "t4",
      title: "Older",
      text: "Just prose.",
      turnNumber: 4,
    })
    expect(envelope.chapterProse?.[0]).not.toHaveProperty("segments")
  })

  test("marker/beat count mismatch → GM-side onMismatch fires; player sees NEUTRAL placeholders (no counts)", () => {
    const seen: TurnInterleaveMismatch[] = []
    const envelope = composeSessionEnvelope(
      "Partners",
      INLINE_MODULES,
      {
        state: STATE,
        story: ledger({
          id: "t4",
          title: "T",
          text: "a\n\n{{system}}\n\nb\n\n{{system}}\n\nc",
          turnNumber: 4,
        }),
      },
      (m) => seen.push(m)
    )
    expect(seen).toHaveLength(1)
    expect(seen[0]).toMatchObject({ reason: "count", markerCount: 2, beatCount: 1, turnNumber: 4 })
    const segments = envelope.chapterProse?.[0]?.segments
    expect(segments?.filter((s) => s.kind === "unavailable")).toHaveLength(2)
    expect(segments?.some((s) => s.kind === "system")).toBe(false)
    expect(JSON.stringify(segments)).not.toContain("markerCount")
    expect(JSON.stringify(segments)).not.toContain("beatCount")
    expect(() => SessionEnvelopeSchema.parse(JSON.parse(JSON.stringify(envelope)))).not.toThrow()
  })

  test("inline adopters DROP system beats from beatLog — rendered once inline, never double", () => {
    const dualModules: GameDisplayModules = {
      chapterProse: { systemWindows: true },
      beatLog: { systemWindows: true },
      actionBox: {},
    }
    const envelope = composeSessionEnvelope("Partners", dualModules, {
      state: STATE,
      story: ledger({
        id: "t4",
        title: "T",
        text: "x\n\n{{system}}\n\ny",
        turnNumber: 4,
      }),
    })
    expect(envelope.chapterProse?.[0]?.segments?.some((s) => s.kind === "system")).toBe(true)
    expect(envelope.beatLog).toEqual([{ type: "narrative", text: "The door opens.", turn: 4 }])
  })
})

describe("composeSessionEnvelope — full history scope (#14458)", () => {
  const INLINE_MODULES: GameDisplayModules = {
    chapterProse: { systemWindows: true },
    storySoFar: { source: "turns" },
    actionBox: {},
  }
  const segmentedText = "She reached the door.\n\n{{system}}\n\nIt opened."
  const fullStory: StoryLedger = {
    chapters: [],
    current: [
      { id: "t1", title: "Earlier", text: "Long ago.", turnNumber: 1, sessionNumber: 1 },
      { id: "t4", title: "The Threshold", text: segmentedText, turnNumber: 4, sessionNumber: 2 },
    ],
  }

  test("a segmented turn renders IDENTICAL segments whether alone (session scope) or amid prior-session turns (full scope)", () => {
    const sessionScope = composeSessionEnvelope("Partners", INLINE_MODULES, {
      state: STATE,
      story: {
        chapters: [],
        current: [{ id: "t4", title: "The Threshold", text: segmentedText, turnNumber: 4 }],
      },
    })
    const fullScope = composeSessionEnvelope("Partners", INLINE_MODULES, {
      state: STATE,
      story: fullStory,
    })

    const soloSegments = sessionScope.chapterProse?.[0]?.segments
    const fullSegments = fullScope.chapterProse?.find((t) => t.id === "t4")?.segments
    expect(fullSegments).toEqual(soloSegments)
    expect(fullSegments?.some((s) => s.kind === "system")).toBe(true)
    expect(fullScope.chapterProse?.find((t) => t.id === "t1")).not.toHaveProperty("segments")
  })

  test("each turn's sessionNumber survives the strict client envelope re-parse", () => {
    const envelope = composeSessionEnvelope("Partners", INLINE_MODULES, {
      state: STATE,
      story: fullStory,
    })
    const parsed = SessionEnvelopeSchema.parse(JSON.parse(JSON.stringify(envelope)))
    expect(parsed.chapterProse?.map((t) => t.sessionNumber)).toEqual([1, 2])
  })
})
