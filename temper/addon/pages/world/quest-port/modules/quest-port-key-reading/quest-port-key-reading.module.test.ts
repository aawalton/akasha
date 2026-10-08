import { describe, expect, test } from "bun:test"
import {
  KEY_OWNERS,
  keyOwnerLines,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-key-reading/quest-port-key-reading.module.code.ts"

const BOUND = {
  layer: "General",
  category: "Interface",
  action: "ASSIST_NEXT_TRACKED_QUEST",
  bindingIndex: 1,
  keyCode: 51,
  mod1: 0,
  mod2: 0,
  mod3: 0,
  mod4: 0,
}

describe("quest-port-key-reading", () => {
  test("a record shows the scene, the layers, what T reaches and every binding", () => {
    const owners = KEY_OWNERS.parse({
      at: 400,
      character: "Maviola El",
      occasion: "port-press",
      scene: "hud",
      baseScene: true,
      activeLayers: { "1": "General", "2": "SI_KEYBINDINGS_LAYER_USER_INTERFACE_SHORTCUTS" },
      actionsOnKey: [{ layer: "General", action: "ASSIST_NEXT_TRACKED_QUEST" }],
      onKey: [BOUND, { ...BOUND, layer: "Housing Editor", action: "HOUSING_EDITOR", mod1: 7 }],
      cycleBindings: [BOUND],
    })
    expect(keyOwnerLines(owners)).toEqual([
      't=400 port-press by Maviola El: scene "hud" base=true',
      "    active layers: General, SI_KEYBINDINGS_LAYER_USER_INTERFACE_SHORTCUTS",
      "    T reaches: General -> ASSIST_NEXT_TRACKED_QUEST",
      "    bound to T (2):",
      "      General / Interface / ASSIST_NEXT_TRACKED_QUEST #1 key=51 mods=none",
      "      Housing Editor / Interface / HOUSING_EDITOR #1 key=51 mods=7",
      "    next-quest keys (1):",
      "      General / Interface / ASSIST_NEXT_TRACKED_QUEST #1 key=51 mods=none",
    ])
  })

  test("a part never read says so, and a move bound to nothing says none", () => {
    const owners = KEY_OWNERS.parse({
      at: 500,
      character: "Maviola El",
      occasion: "activated",
      actionsOnKey: {},
      cycleBindings: {},
    })
    expect(keyOwnerLines(owners)).toEqual([
      't=500 activated by Maviola El: scene "-" base=-',
      "    active layers: not read",
      "    T reaches: nothing in an active layer",
      "    bound to T: not read",
      "    next-quest keys: none",
    ])
  })
})
