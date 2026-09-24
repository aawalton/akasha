import { describe, expect, test } from "bun:test"
import type { GameDisplayModules } from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import { GameStateSchema } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import {
  assertEnvelopeMatchesModules,
  composeSessionEnvelope,
  proseSegmentsOf,
  type StoryLedger,
} from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"

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

describe("proseSegmentsOf", () => {
  test("gives nothing for prose with no window written in it", () => {
    expect(proseSegmentsOf("White grit.\n\nThe gate opens.")).toBeUndefined()
  })

  test("draws a window written in a chapter's prose as its card, with no line of its block as prose", () => {
    const text =
      "The lens was warm.\n\n:::item-award\nname: Clouded lens\nnote: Recovered from: the Host's seat\n:::\n\nHe pocketed it."
    const segments = proseSegmentsOf(text)
    expect(segments).toEqual([
      { kind: "prose", text: "The lens was warm." },
      {
        kind: "system",
        window: {
          type: "item-award",
          award: {
            item: "Clouded lens",
            descriptors: [{ label: "Recovered from", value: "the Host's seat" }],
          },
        },
      },
      { kind: "prose", text: "He pocketed it." },
    ])
    const prose = (segments ?? []).flatMap((one) => (one.kind === "prose" ? [one.text] : []))
    expect(prose.some((line) => line.includes(":::"))).toBe(false)
  })
})

describe("composeSessionEnvelope", () => {
  test("carries only the title where no module is declared", () => {
    expect(composeSessionEnvelope("A Game", {}, { state: STATE, story: STORY })).toEqual({
      title: "A Game",
    })
  })

  test("gives a turn with no window written in it straight through", () => {
    const modules: GameDisplayModules = { chapterProse: {} }
    const out = composeSessionEnvelope("A Game", modules, { state: STATE, story: STORY })
    expect(out.chapterProse).toEqual([...STORY.current])
  })

  test("draws each window written in a turn's prose as a card where it is written", () => {
    const text =
      "a\n\n:::level-up\nlevel: 5\n:::\n\nb\n\n:::system-choice\nname: THE LINK\nnote: bind one\n:::"
    const story: StoryLedger = {
      chapters: [],
      current: [{ id: "t9", title: "T", text, turnNumber: 4 }],
    }
    const out = composeSessionEnvelope("A Game", { chapterProse: {} }, { state: STATE, story })
    expect(out.chapterProse?.[0]?.segments).toEqual([
      { kind: "prose", text: "a" },
      { kind: "system", window: { type: "level-up", level: 5 } },
      { kind: "prose", text: "b" },
      { kind: "system", title: "THE LINK", lines: ["bind one"] },
    ])
  })

  test("leaves every section null where there is no state", () => {
    const modules: GameDisplayModules = { beatLog: {}, hud: {}, quests: {}, sheet: {} }
    const out = composeSessionEnvelope("A Game", modules, { state: null, story: null })
    expect(out.beatLog).toBeNull()
    expect(out.hud).toBeNull()
    expect(out.quests).toBeNull()
    expect(out.sheet).toBeNull()
  })

  test("carries every beat of the state's log", () => {
    const out = composeSessionEnvelope("A Game", { beatLog: {} }, { state: STATE, story: null })
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
})
