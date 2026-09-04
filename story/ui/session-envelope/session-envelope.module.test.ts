import { describe, expect, test } from "bun:test"
import type { GameDisplayModules } from "@akasha/story-engine-core/game-schema"
import { GameStateSchema } from "@akasha/story-engine-core/state-schema"
import {
  assertEnvelopeMatchesModules,
  composeSessionEnvelope,
  type StoryLedger,
} from "./session-envelope.module.code.ts"

const STATE = GameStateSchema.parse({
  turn: 4,
  hud: { level: 3, pools: { vitae: 40 } },
  revealed: { name: "Aldric" },
  log: [
    { type: "narrative", text: "The gate opens.", turn: 4 },
    { type: "system", title: "Threshold", lines: ["Level 4."], turn: 4 },
  ],
  chapters: [{ number: 1, title: "The Threshold", readerLink: "/game-turn/one-abc" }],
  quests: [{ id: "q1", title: "Reach the top", objective: "climb", status: "active" }],
})

const STORY: StoryLedger = {
  chapters: [{ id: "c1", title: "The Salt Road", href: "/game-turn/c1", chapterNumber: 1 }],
  current: [{ id: "t9", title: "The Salt Road", text: "White grit.", turnNumber: 4 }],
}

describe("assertEnvelopeMatchesModules", () => {
  test("is happy where every declared module has its section", () => {
    expect(() => assertEnvelopeMatchesModules({ hud: {} }, { title: "T", hud: null })).not.toThrow()
  })

  test("throws where a declared module has no section", () => {
    expect(() => assertEnvelopeMatchesModules({ hud: {} }, { title: "T" })).toThrow(
      /module "hud" is declared but its section is missing/
    )
  })

  test("throws where a section arrives undeclared", () => {
    expect(() => assertEnvelopeMatchesModules({}, { title: "T", hud: null })).toThrow(
      /module "hud" is undeclared but its section is present/
    )
  })
})

describe("composeSessionEnvelope", () => {
  test("carries only the title where no module is declared", () => {
    expect(composeSessionEnvelope("A Game", {}, { state: STATE, story: STORY })).toEqual({
      title: "A Game",
    })
  })

  test("gives the turns straight through where system windows are not inline", () => {
    const modules: GameDisplayModules = { chapterProse: {} }
    const out = composeSessionEnvelope("A Game", modules, { state: STATE, story: STORY })
    expect(out.chapterProse).toEqual([...STORY.current])
  })

  test("leaves every section null where there is no state", () => {
    const modules: GameDisplayModules = { beatLog: {}, hud: {}, quests: {}, sheet: {} }
    const out = composeSessionEnvelope("A Game", modules, { state: null, story: null })
    expect(out.beatLog).toBeNull()
    expect(out.hud).toBeNull()
    expect(out.quests).toBeNull()
    expect(out.sheet).toBeNull()
  })

  test("drops the system beats from the beat log by default", () => {
    const out = composeSessionEnvelope("A Game", { beatLog: {} }, { state: STATE, story: null })
    expect(out.beatLog?.map((b) => b.type)).toEqual(["narrative"])
  })

  test("keeps the system beats where the beat log asks for windows", () => {
    const modules: GameDisplayModules = { beatLog: { systemWindows: true } }
    const out = composeSessionEnvelope("A Game", modules, { state: STATE, story: null })
    expect(out.beatLog?.map((b) => b.type)).toEqual(["narrative", "system"])
  })

  test("takes the story's published state over the live one", () => {
    const published = GameStateSchema.parse({ turn: 1, hud: { level: 9 } })
    const out = composeSessionEnvelope(
      "A Game",
      { hud: {} },
      { state: STATE, story: { ...STORY, publishedState: published } }
    )
    expect(out.hud?.level).toBe(9)
  })

  test("takes the story's own chapters where the source is turns", () => {
    const modules: GameDisplayModules = { storySoFar: { source: "turns" } }
    const out = composeSessionEnvelope("A Game", modules, { state: STATE, story: STORY })
    expect(out.storySoFar).toEqual([...STORY.chapters])
  })

  test("takes the state's chapter links where the source is the ledger", () => {
    const modules: GameDisplayModules = { storySoFar: { source: "stateLedger" } }
    const out = composeSessionEnvelope("A Game", modules, { state: STATE, story: STORY })
    expect(out.storySoFar).toEqual([
      { id: "one-abc", title: "The Threshold", href: "/game-turn/one-abc", chapterNumber: 1 },
    ])
  })

  test("sorts the action box and tells a bracketed note from an act", () => {
    const modules: GameDisplayModules = { actionBox: {} }
    const out = composeSessionEnvelope("A Game", modules, {
      state: null,
      story: null,
      actions: [
        { text: "[a note]", submittedAt: 30 },
        { text: "swing", submittedAt: 20 },
        { text: "old", submittedAt: 5 },
      ],
      latestTurnAt: 10,
    })
    expect(out.actionBox).toEqual([
      { text: "swing", submittedAt: 20, kind: "action" },
      { text: "[a note]", submittedAt: 30, kind: "feedback" },
    ])
  })

  test("sets the system beats into the prose where the prose asks for windows", () => {
    const modules: GameDisplayModules = { chapterProse: { systemWindows: true } }
    const story: StoryLedger = {
      chapters: [],
      current: [{ id: "t9", title: "T", text: "a\n\n{{system}}\n\nb", turnNumber: 4 }],
    }
    const out = composeSessionEnvelope("A Game", modules, { state: STATE, story })
    expect(out.chapterProse?.[0]?.segments).toEqual([
      { kind: "prose", text: "a" },
      { kind: "system", title: "Threshold", lines: ["Level 4."] },
      { kind: "prose", text: "b" },
    ])
  })

  test("hands a mismatch to the watcher and leaves the marker unavailable", () => {
    const modules: GameDisplayModules = { chapterProse: { systemWindows: true } }
    const story: StoryLedger = {
      chapters: [],
      current: [{ id: "t9", title: "T", text: "a\n\n{{system}}\n\nb", turnNumber: 7 }],
    }
    const seen: string[] = []
    const out = composeSessionEnvelope("A Game", modules, { state: STATE, story }, (m) => {
      seen.push(m.reason)
    })
    expect(seen).toEqual(["count"])
    expect(out.chapterProse?.[0]?.segments?.[1]).toEqual({ kind: "unavailable" })
  })
})
