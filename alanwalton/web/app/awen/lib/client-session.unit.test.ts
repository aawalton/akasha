import { describe, expect, test } from "bun:test"
import { GameStateSchema } from "@alanwalton/awen-core/state-schema"
import {
  ClientHudSchema,
  ClientSheetSchema,
  projectClientBeats,
  projectClientHud,
  projectClientSheet,
  projectStateChapterLinks,
} from "./client-session"

describe("per-module state projectors — loop-dark crunchy projection", () => {
  test("strips coordinator-only keys from state, sheet, and beats (fog-of-war)", () => {
    const state = GameStateSchema.parse({
      turn: 3,
      designerNotes: "the death = time-loop secret",
      hud: { level: 4, pools: { vitae: 42, focus: 18 }, delta: { vitae: -5 } },
      revealed: {
        name: "Aldric",
        kind: "pc",
        level: 4,
        class: "Warden",
        attributes: { might: 14 },
        skills: [{ name: "Blade", rank: 3 }],
        inventory: [{ name: "Iron key", qty: 1 }],
        titles: ["Threshold-Walker"],
        derived: { armor: 6 },
        canonicalSecret: "hidden",
        rollSeed: 99,
      },
      log: [
        { type: "narrative", text: "The iron door groans open.", designerNotes: "DC 15 passed" },
        { type: "system", title: "Threshold", lines: ["Floor 4."], rollSeed: 42 },
        { type: "whisper", text: "unknown vocab collapses to narrative" },
        "not-an-object",
      ],
    })

    const hud = projectClientHud(state)
    const sheet = projectClientSheet(state)
    const log = projectClientBeats(state)

    expect(() => ClientHudSchema.nullable().parse(hud)).not.toThrow()
    expect(() => ClientSheetSchema.nullable().parse(sheet)).not.toThrow()

    expect(hud?.pools).toEqual({ vitae: 42, focus: 18 })
    expect(hud?.delta).toEqual({ vitae: -5 })
    expect(hud?.level).toBe(4)

    expect(sheet?.name).toBe("Aldric")
    expect(sheet?.items).toEqual([{ name: "Iron key" }])
    expect(sheet).not.toHaveProperty("canonicalSecret")
    expect(sheet).not.toHaveProperty("designerNotes")
    expect(sheet).not.toHaveProperty("rollSeed")

    expect(log).toHaveLength(3)
    expect(log[0]).toEqual({ type: "narrative", text: "The iron door groans open." })
    expect(log[1]).toEqual({ type: "system", title: "Threshold", lines: ["Floor 4."] })
    expect(log[2]?.type).toBe("narrative")
    for (const beat of log) {
      expect(beat).not.toHaveProperty("designerNotes")
      expect(beat).not.toHaveProperty("rollSeed")
    }
  })

  test("drops content-less beats so no empty card can ride out (#14442)", () => {
    const state = GameStateSchema.parse({
      turn: 7,
      log: [
        { type: "narrative", text: "The lantern gutters.", turn: 7 },
        { type: "system", title: "Threshold", lines: ["Floor 4."], turn: 7 },
        { type: "system", text: "orphaned system text", turn: 7 },
        { type: "narrative", turn: 7 },
        { type: "narrative", text: "   ", turn: 7 },
      ],
    })

    const log = projectClientBeats(state)
    expect(log).toHaveLength(2)
    expect(log[0]).toEqual({ type: "narrative", text: "The lantern gutters.", turn: 7 })
    expect(log[1]).toEqual({ type: "system", title: "Threshold", lines: ["Floor 4."], turn: 7 })
    for (const beat of log) {
      if (beat.type === "system") {
        const hasContent =
          (beat.title !== undefined && beat.title.trim() !== "") ||
          (beat.lines ?? []).some((l) => l.trim() !== "")
        expect(hasContent).toBe(true)
      }
    }
  })

  test("renders a mechanics-only system beat through the deterministic template (#14588)", () => {
    const state = GameStateSchema.parse({
      turn: 5,
      log: [
        {
          type: "system",
          turn: 5,
          mechanics: { poolChanges: [{ pool: "VITAE", delta: -6, newTotal: 22 }] },
        },
        { type: "system", title: "The System stirs.", lines: ["It watches."], turn: 5 },
      ],
    })

    const log = projectClientBeats(state)
    expect(log).toHaveLength(2)
    expect(log[0]).toEqual({ type: "system", lines: ["VITAE -6 → 22"], turn: 5 })
    expect(log[0]).not.toHaveProperty("mechanics")
    expect(log[1]).toEqual({
      type: "system",
      title: "The System stirs.",
      lines: ["It watches."],
      turn: 5,
    })
  })

  test("carries rich revealed skill / affinity / bond / item / equipment fidelity", () => {
    const state = GameStateSchema.parse({
      turn: 82,
      hud: { level: 6, pools: { hp: 118, hpMax: 124 }, delta: { hp: -6 } },
      revealed: {
        class: "None",
        skills: [
          {
            name: "Ember Burst",
            note: "Discharges Ember.",
            rung: "Apprentice",
            score: 6,
            designerNotes: "secret",
          },
        ],
        affinities: [{ name: "Ember Manipulation", note: "Sense of heat.", value: 7 }],
        bonds: [
          { name: "The Link", note: "+1 PRESENCE from THE LINK.", value: 1, scaling: "secret" },
        ],
        inventory: [{ name: "River-stone", note: "Cold-imbued." }],
        equipment: { mainHand: { atk: 10, name: "Burning Anger", note: "ember maul" } },
      },
    })

    const sheet = projectClientSheet(state)
    expect(sheet?.skills).toEqual([
      { name: "Ember Burst", rank: "Apprentice", score: 6, note: "Discharges Ember." },
    ])
    expect(sheet?.affinities).toEqual([
      { name: "Ember Manipulation", value: 7, note: "Sense of heat." },
    ])
    expect(sheet?.bonds).toEqual([
      { name: "The Link", value: 1, note: "+1 PRESENCE from THE LINK." },
    ])
    expect(sheet?.items).toEqual([{ name: "River-stone", note: "Cold-imbued." }])
    expect(sheet?.equipment).toEqual({ mainHand: { name: "Burning Anger" } })
  })

  test("equipment survives narrow iff 'equipment' is in the resolved reveal keys", () => {
    const state = GameStateSchema.parse({
      turn: 1,
      revealed: {
        name: "Vael",
        attributes: { INTELLECT: 4 },
        equipment: { armor: { name: "Leather Vest", atk: 3 } },
      },
    })
    expect(projectClientSheet(state, ["name", "attributes", "equipment"])?.equipment).toEqual({
      armor: { name: "Leather Vest" },
    })
    expect(projectClientSheet(state, ["name", "attributes"])?.equipment).toBeUndefined()
  })

  test("null hud/sheet when absent; empty log tolerated (turn-0 / light state)", () => {
    const state = GameStateSchema.parse({ turn: 0 })
    expect(projectClientHud(state)).toBeNull()
    expect(projectClientSheet(state)).toBeNull()
    expect(projectClientBeats(state)).toEqual([])
    expect(projectStateChapterLinks(state)).toEqual([])
  })

  test("chapters derive from the state's own ledger as reader links (#14199)", () => {
    const state = GameStateSchema.parse({
      turn: 9,
      chapters: [
        {
          floor: 1,
          number: 1,
          title: "The Threshold",
          status: "archived",
          chapterId: "019efbd1-d698-7f76-910f-ec1293b884b2",
          heroBeat: "b9",
        },
        { floor: 4, number: 4, title: "The Ascending Dark", status: "closed" },
        { floor: 5, number: 5, title: "The Haven", status: "open" },
        "not-an-object",
      ],
    })
    expect(projectStateChapterLinks(state)).toEqual([
      {
        id: "019efbd1-d698-7f76-910f-ec1293b884b2",
        title: "The Threshold",
        href: "/story-chapter-played/the-threshold-93b884b2",
        chapterNumber: 1,
      },
    ])
  })

  test("an archived chapter is reached by the reader link the archiver wrote", () => {
    const state = GameStateSchema.parse({
      turn: 9,
      chapters: [
        {
          floor: 1,
          number: 2,
          title: "The Cistern",
          status: "archived",
          page: "personas/played/the-tower/chapters/0002-the-cistern.md",
          readerLink: "/story-chapter-played/the-cistern",
        },
      ],
    })
    expect(projectStateChapterLinks(state)).toEqual([
      {
        id: "the-cistern",
        title: "The Cistern",
        href: "/story-chapter-played/the-cistern",
        chapterNumber: 2,
      },
    ])
  })
})
