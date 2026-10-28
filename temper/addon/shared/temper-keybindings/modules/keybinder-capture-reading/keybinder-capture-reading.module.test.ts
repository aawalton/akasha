import { expect, test } from "bun:test"
import {
  type KeybinderCapture,
  keybinderCaptureIn,
  landedKeybindings,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinder-capture-reading/keybinder-capture-reading.module.code.ts"
import {
  type Keybinding,
  keybindingsConfigOf,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-pages/keybinding-pages.module.code.ts"

const NONE = { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const HOME = { keyCode: 17, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const CTRL_G = { keyCode: 38, mod1: 4, mod2: 0, mod3: 0, mod4: 0 }

const PORT = "PORTTOFRIENDSHOUSE_FAV_MYHOUSE_INSIDE_1"

const EARLIER = "2026-10-28T21:29:00.000Z"

const EARLIER_SECONDS = 1793222940

const SEEDED_AT = "2026-10-28T22:00:00.000Z"

const PAGE: Keybinding = {
  key: PORT,
  bindings: [{ slot: 1, key: "KEY_HOME" }],
  shared: true,
  changedAt: EARLIER,
}

const NOTHING: KeybinderCapture = { shared: {}, changes: {}, capturedAt: null, actions: {} }

function heldAs(...pages: readonly Keybinding[]): ReadonlyMap<string, Keybinding> {
  return new Map(pages.map((one) => [one.key, one]))
}

function rebound(at: number): KeybinderCapture {
  return {
    ...NOTHING,
    changes: { [PORT]: { at, shared: true, bindings: [CTRL_G, NONE, NONE, NONE] } },
  }
}

const SAVED = `TemperKeybinder_SavedVariables =
{
    ["Default"] =
    {
        ["$Machine"] =
        {
            ["$UserProfileWide"] =
            {
                ["version"] = 1,
                ["Keybindings"] =
                {
                    ["${PORT}"] =
                    {
                        [4] = { ["keyCode"] = 0, ["mod1"] = 0, ["mod4"] = 0, ["mod3"] = 0, ["mod2"] = 0, },
                        [1] = { ["keyCode"] = 17, ["mod1"] = 0, ["mod4"] = 0, ["mod3"] = 0, ["mod2"] = 0, },
                        [2] = { ["keyCode"] = 0, ["mod1"] = 0, ["mod4"] = 0, ["mod3"] = 0, ["mod2"] = 0, },
                        [3] = { ["keyCode"] = 0, ["mod1"] = 0, ["mod4"] = 0, ["mod3"] = 0, ["mod2"] = 0, },
                    },
                },
            },
        },
    },
}
`

test("the saved variables read back the shared bindings slot by slot", () => {
  expect(keybinderCaptureIn(SAVED)?.shared[PORT]).toEqual([HOME, NONE, NONE, NONE])
})

test("saved variables holding no keybinder capture read as none", () => {
  expect(keybinderCaptureIn("TemperErrors_SavedVariables = {}")).toBeNull()
})

test("a shared action with no page lands at the instant handed in", () => {
  const capture = keybinderCaptureIn(SAVED)
  expect(capture).not.toBeNull()
  if (capture === null) return
  expect(landedKeybindings(capture, heldAs(), SEEDED_AT)).toEqual([
    { ...PAGE, changedAt: SEEDED_AT },
  ])
})

test("a key rebound in the game later than its page lands on the page", () => {
  expect(landedKeybindings(rebound(EARLIER_SECONDS + 60), heldAs(PAGE), SEEDED_AT)).toEqual([
    {
      key: PORT,
      bindings: [{ slot: 1, key: "KEY_G", modifiers: ["KEY_CTRL"] }],
      shared: true,
      changedAt: "2026-10-28T21:30:00.000Z",
    },
  ])
})

test("a page changed later than the game keeps its keys", () => {
  expect(landedKeybindings(rebound(EARLIER_SECONDS - 60), heldAs(PAGE), SEEDED_AT)).toEqual([])
})

test("a change in the game at the instant its page changed keeps the page", () => {
  expect(landedKeybindings(rebound(EARLIER_SECONDS), heldAs(PAGE), SEEDED_AT)).toEqual([])
})

test("a capture gives a page the layer and category it lacks and keeps when it changed", () => {
  const capture: KeybinderCapture = {
    ...NOTHING,
    capturedAt: EARLIER_SECONDS + 600,
    actions: {
      [PORT]: {
        bindings: [HOME, NONE, NONE, NONE],
        layer: "General",
        category: "|c00FF00Temper|r",
      },
    },
  }
  expect(landedKeybindings(capture, heldAs(PAGE), SEEDED_AT)).toEqual([
    { ...PAGE, layer: "general", category: "temper" },
  ])
})

test("a captured action no page holds lands unshared at the capture's instant", () => {
  const capture: KeybinderCapture = {
    ...NOTHING,
    capturedAt: EARLIER_SECONDS,
    actions: {
      TOGGLE_MAP: { bindings: [{ ...NONE, keyCode: 44 }, NONE, NONE, NONE], title: "Map" },
    },
  }
  expect(landedKeybindings(capture, heldAs(), SEEDED_AT)).toEqual([
    {
      key: "TOGGLE_MAP",
      title: "Map",
      bindings: [{ slot: 1, key: "KEY_M" }],
      shared: false,
      changedAt: EARLIER,
    },
  ])
})

test("a key rebound in the game goes round to the config and lands nothing more", () => {
  const capture = rebound(EARLIER_SECONDS + 60)
  const landed = landedKeybindings(capture, heldAs(PAGE), SEEDED_AT)
  expect(keybindingsConfigOf(landed)[PORT]?.bindings).toEqual(capture.changes[PORT]?.bindings)
  expect(landedKeybindings(capture, heldAs(...landed), SEEDED_AT)).toEqual([])
})
