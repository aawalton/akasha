import { describe, expect, test } from "bun:test"
import { type GameDisplayModules } from "@alanwalton/awen-core/game-schema"
import { GameStateSchema } from "@alanwalton/awen-core/state-schema"
import { composeSessionEnvelope } from "./session-envelope"

const QUEST_MODULES: GameDisplayModules = { hud: {}, quests: {}, actionBox: {} }

const STATE_WITH_QUESTS = GameStateSchema.parse({
  turn: 5,
  hud: { level: 1, pools: { health: 70 } },
  quests: [
    { id: "q1", title: "Ascend", objective: "Reach floor 3", status: "offered" },
    { id: "q2", title: "Done", objective: "x", status: "complete" },
  ],
})

describe("composeSessionEnvelope — quests section", () => {
  test("declared quests module projects the state's quest ledger verbatim", () => {
    const envelope = composeSessionEnvelope("Hotel", QUEST_MODULES, {
      state: STATE_WITH_QUESTS,
      story: null,
    })
    expect(envelope.quests?.map((q) => q.id)).toEqual(["q1", "q2"])
    expect(envelope.quests?.map((q) => q.status)).toEqual(["active", "complete"])
  })

  test("null state → null quests section (mirrors hud/beatLog)", () => {
    const envelope = composeSessionEnvelope("Hotel", QUEST_MODULES, { state: null, story: null })
    expect(envelope.quests).toBeNull()
  })

  test("a live state with no quests → empty array (distinct from null)", () => {
    const bare = GameStateSchema.parse({ turn: 1, hud: { pools: { health: 70 } } })
    const envelope = composeSessionEnvelope("Hotel", QUEST_MODULES, { state: bare, story: null })
    expect(envelope.quests).toEqual([])
  })

  test("undeclared quests module → no section (drift guard holds)", () => {
    const envelope = composeSessionEnvelope(
      "Hotel",
      { hud: {} },
      {
        state: STATE_WITH_QUESTS,
        story: null,
      }
    )
    expect(Object.keys(envelope)).not.toContain("quests")
  })
})
