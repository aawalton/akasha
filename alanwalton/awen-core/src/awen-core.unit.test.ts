import { describe, expect, test } from "bun:test"
import { EntitySheetSchema } from "./entity-schema.ts"
import {
  ControlledEntityKindSchema,
  GameConfigSchema,
  GameDisplayConfigSchema,
  GameRulebookSchema,
  MechanicsWeightSchema,
  ResolutionSchema,
} from "./game-schema.ts"
import { RevealedSheetSchema } from "./revealed.ts"
import { GameStateSchema, HudSchema } from "./state-schema.ts"
import { TurnOptionsSchema } from "./turn-schema.ts"

function asRecord(value: object): Record<string, unknown> {
  return { ...value }
}

describe("span axis enums", () => {
  test("classify the light and crunchy poles", () => {
    expect(MechanicsWeightSchema.parse("zero")).toBe("zero")
    expect(MechanicsWeightSchema.parse("heavy")).toBe("heavy")
    expect(ResolutionSchema.parse("none")).toBe("none")
    expect(ResolutionSchema.parse("formula")).toBe("formula")
    expect(ControlledEntityKindSchema.parse("single")).toBe("single")
    expect(ControlledEntityKindSchema.parse("dungeon")).toBe("dungeon")
  })

  test("reject an off-axis value", () => {
    expect(() => MechanicsWeightSchema.parse("crunchy")).toThrow()
  })

  test("config escape hatch tolerates not-yet-promoted per-game capability", () => {
    const config = GameConfigSchema.parse({ experimentalFeature: { enabled: true } })
    expect(asRecord(config).experimentalFeature).toEqual({ enabled: true })
  })
})

describe("LIGHT pole — authored narrative, zero mechanics", () => {
  test("rulebook stores prose rules", () => {
    const rulebook = GameRulebookSchema.parse({
      systemType: "authored",
      summary: "A choose-your-path dragon saga; choices shape the bond, not stats.",
      progression: "narrative",
      turnScale: "chapter",
      goal: "raise a dragon to adulthood",
    })
    expect(rulebook.systemType).toBe("authored")
  })

  test("display config declares the story module set", () => {
    const display = GameDisplayConfigSchema.parse({
      modules: { chapterProse: {}, storySoFar: { source: "turns" }, actionBox: {} },
      pollMs: 4000,
    })
    expect(display.modules.chapterProse).toEqual({})
    expect(display.modules.beatLog).toBeUndefined()
  })

  test("entity is a pure narrative being — no mechanics fields", () => {
    const dragon = EntitySheetSchema.parse({
      name: "Vis'rax the Ember",
      kind: "dragon",
      titles: ["hatchling of the third clutch"],
    })
    expect(dragon.attributes).toBeUndefined()
    expect(dragon.name).toBe("Vis'rax the Ember")
  })

  test("state carries only the beat log, no HUD", () => {
    const state = GameStateSchema.parse({
      turn: 4,
      build: "the bond deepens",
      log: ["You shared the last of the smoked fish."],
    })
    expect(state.hud).toBeUndefined()
    expect(state.turn).toBe(4)
  })
})

describe("CRUNCHY pole — hard mechanics, formula resolution", () => {
  test("rulebook stores a structured system", () => {
    const rulebook = GameRulebookSchema.parse({
      systemType: "leveled-rpg",
      attributes: [{ id: "might", name: "Might" }],
      progression: "xp-levels",
      turnScale: "encounter",
      goal: "ascend by clearing challenges",
      damageFormula: "floor((might + weapon) * crit)",
    })
    expect(rulebook.attributes).toHaveLength(1)
    expect(asRecord(rulebook).damageFormula).toBe("floor((might + weapon) * crit)")
  })

  test("display config declares HUD + sheet + system windows via modules", () => {
    const display = GameDisplayConfigSchema.parse({
      modules: {
        beatLog: { systemWindows: true },
        hud: {},
        sheet: {},
        storySoFar: { source: "stateLedger" },
        actionBox: {},
      },
      pollMs: 1800,
    })
    expect(display.modules.hud).toEqual({})
    expect(display.modules.beatLog?.systemWindows).toBe(true)
  })

  test("entity carries the full mechanical sheet AND coordinator-only truth", () => {
    const fighter = EntitySheetSchema.parse({
      name: "Kael",
      kind: "character",
      level: 7,
      class: "vanguard",
      attributes: { might: 14, focus: 9 },
      skills: [{ id: "cleave", rank: 3 }],
      affinities: ["fire"],
      equipment: { mainHand: "ashbrand" },
      inventory: [{ id: "potion", qty: 2 }],
      designerNotes: "secretly weak to frost",
      hiddenDcs: { trap: 18 },
    })
    expect(fighter.level).toBe(7)
    expect(asRecord(fighter).designerNotes).toBe("secretly weak to frost")
  })

  test("HUD pools and deltas validate", () => {
    const hud = HudSchema.parse({
      level: 7,
      pools: { hp: 42, focus: 9 },
      delta: { hp: -5 },
    })
    expect(hud.pools?.hp).toBe(42)
  })

  test("HUD rejects an unknown top-level key (strict player surface)", () => {
    expect(() => HudSchema.parse({ secretBuff: true })).toThrow()
  })
})

describe("turn decision-as-data", () => {
  test("options parse with label + optional effect/value", () => {
    const options = TurnOptionsSchema.parse([
      { label: "Approach the dragon", description: "Risk the claws.", effect: "+bond" },
      { label: "Retreat", value: "retreat" },
    ])
    expect(options).toHaveLength(2)
  })

  test("rejects an option with an unknown field (authored, strict)", () => {
    expect(() => TurnOptionsSchema.parse([{ label: "x", weight: 5 }])).toThrow()
  })
})

describe("loop-dark — fog-of-war projection", () => {
  test("a coordinator field injected at the revealed boundary is stripped", () => {
    const parsed = RevealedSheetSchema.parse({ name: "Kael", designerNotes: "leak attempt" })
    expect(asRecord(parsed).designerNotes).toBeUndefined()
  })
})
