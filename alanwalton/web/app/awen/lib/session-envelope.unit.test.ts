import { describe, expect, test } from "bun:test"
import { type GameDisplayModules } from "@alanwalton/awen-core/game-schema"
import { GameStateSchema } from "@alanwalton/awen-core/state-schema"
import { SessionEnvelopeSchema } from "./client-envelope"
import { composeSessionEnvelope } from "./session-envelope"
import { CRUNCHY_MODULES, STATE, STORY, STORY_MODULES } from "./session-envelope.test-helpers"

describe("composeSessionEnvelope — sections driven by the declaration alone", () => {
  test("story declaration: exactly chapterProse + storySoFar(turns); no state sections", () => {
    const envelope = composeSessionEnvelope("Dragons", STORY_MODULES, { state: null, story: STORY })
    expect(Object.keys(envelope).sort()).toEqual([
      "actionBox",
      "chapterProse",
      "storySoFar",
      "title",
    ])
    expect(envelope.actionBox).toEqual([])
    expect(envelope.chapterProse).toEqual([
      { id: "t9", title: "The Salt Road", text: "White grit." },
    ])
    expect(envelope.storySoFar?.[0]?.id).toBe("c1")
    expect(() => SessionEnvelopeSchema.parse(JSON.parse(JSON.stringify(envelope)))).not.toThrow()
  })

  test("crunchy declaration: beatLog/hud/sheet + storySoFar(stateLedger); no prose section", () => {
    const envelope = composeSessionEnvelope("Tower", CRUNCHY_MODULES, { state: STATE, story: null })
    expect(Object.keys(envelope).sort()).toEqual([
      "actionBox",
      "beatLog",
      "hud",
      "sheet",
      "storySoFar",
      "title",
    ])
    expect(envelope.beatLog).toHaveLength(2)
    expect(envelope.hud?.pools).toEqual({ vitae: 40 })
    expect(envelope.sheet?.name).toBe("Aldric")
    expect(envelope.storySoFar?.[0]?.title).toBe("The Threshold")
    expect(() => SessionEnvelopeSchema.parse(JSON.parse(JSON.stringify(envelope)))).not.toThrow()
  })

  test("systemWindows undeclared: system beats are filtered server-side", () => {
    const modules: GameDisplayModules = { beatLog: {}, actionBox: {} }
    const envelope = composeSessionEnvelope("Tower", modules, { state: STATE, story: null })
    expect(envelope.beatLog).toEqual([{ type: "narrative", text: "The door opens.", turn: 4 }])
  })

  test("null state: beatLog/hud/sheet sections are null (no live session), storySoFar(stateLedger) empty", () => {
    const envelope = composeSessionEnvelope("Tower", CRUNCHY_MODULES, { state: null, story: null })
    expect(envelope.beatLog).toBeNull()
    expect(envelope.hud).toBeNull()
    expect(envelope.sheet).toBeNull()
    expect(envelope.storySoFar).toEqual([])
  })

  test("null story ledger: chapterProse and storySoFar(turns) sections are empty arrays", () => {
    const envelope = composeSessionEnvelope("Dragons", STORY_MODULES, { state: null, story: null })
    expect(envelope.chapterProse).toEqual([])
    expect(envelope.storySoFar).toEqual([])
  })

  test("actionBox declared alone yields exactly a title + (empty) actionBox section", () => {
    const envelope = composeSessionEnvelope("Bare", { actionBox: {} }, { state: null, story: null })
    expect(Object.keys(envelope).sort()).toEqual(["actionBox", "title"])
    expect(envelope.actionBox).toEqual([])
  })

  test("actionBox section carries the pending actions from the decider, oldest-first", () => {
    const envelope = composeSessionEnvelope(
      "Partners",
      { actionBox: {} },
      {
        state: null,
        story: null,
        actions: [
          { text: "answered", submittedAt: 100 },
          { text: "still pending", submittedAt: 300 },
        ],
        latestTurnAt: 200,
        latestStateAt: null,
      }
    )
    expect(envelope.actionBox).toEqual([
      { text: "still pending", submittedAt: 300, kind: "action" },
    ])
    expect(() => SessionEnvelopeSchema.parse(JSON.parse(JSON.stringify(envelope)))).not.toThrow()
  })

  test("actionBox items carry kind derived from the bracket rule at compose (#14583)", () => {
    const envelope = composeSessionEnvelope(
      "Partners",
      { actionBox: {} },
      {
        state: null,
        story: null,
        actions: [
          { text: "draw my sword", submittedAt: 100 },
          { text: "[the pacing feels rushed here]", submittedAt: 200 },
        ],
        latestTurnAt: null,
        latestStateAt: null,
      }
    )
    expect(envelope.actionBox).toEqual([
      { text: "draw my sword", submittedAt: 100, kind: "action" },
      { text: "[the pacing feels rushed here]", submittedAt: 200, kind: "feedback" },
    ])
    expect(() => SessionEnvelopeSchema.parse(JSON.parse(JSON.stringify(envelope)))).not.toThrow()
  })

  test("actionBox section clears once a response commits after every action", () => {
    const envelope = composeSessionEnvelope(
      "Partners",
      { actionBox: {} },
      {
        state: null,
        story: null,
        actions: [{ text: "look", submittedAt: 100 }],
        latestTurnAt: 200,
        latestStateAt: null,
      }
    )
    expect(envelope.actionBox).toEqual([])
  })
})

describe("composeSessionEnvelope — state-fed sections serve AS-OF the published frontier (#14525)", () => {
  const BOTH_MODULES: GameDisplayModules = {
    chapterProse: {},
    hud: {},
    sheet: {},
    storySoFar: { source: "turns" },
    actionBox: {},
  }
  const PUBLISHED_STATE = GameStateSchema.parse({
    turn: 3,
    hud: { level: 2, pools: { vitae: 25 } },
    revealed: { name: "Bramble", level: 2 },
    log: [],
    chapters: [],
  })

  test("published snapshot present → sheet/hud serve the snapshot, not the live mid-build state", () => {
    const envelope = composeSessionEnvelope("Partners", BOTH_MODULES, {
      state: STATE,
      story: { ...STORY, publishedState: PUBLISHED_STATE },
    })
    expect(envelope.sheet?.name).toBe("Bramble")
    expect(envelope.hud?.level).toBe(2)
  })

  test("published snapshot present → beatLog serves the snapshot's beats, not the live state's", () => {
    const envelope = composeSessionEnvelope(
      "Partners",
      { beatLog: {}, actionBox: {} },
      { state: STATE, story: { ...STORY, publishedState: PUBLISHED_STATE } }
    )
    expect(envelope.beatLog).toEqual([])
  })

  test("no published snapshot (state-only / legacy) → falls back to the live state, byte-identical", () => {
    const envelope = composeSessionEnvelope("Tower", CRUNCHY_MODULES, { state: STATE, story: null })
    expect(envelope.sheet?.name).toBe("Aldric")
    expect(envelope.hud?.pools).toEqual({ vitae: 40 })
  })

  test("null published snapshot on the ledger → falls back to the live state", () => {
    const envelope = composeSessionEnvelope("Partners", CRUNCHY_MODULES, {
      state: STATE,
      story: { ...STORY, publishedState: null },
    })
    expect(envelope.sheet?.name).toBe("Aldric")
  })
})
