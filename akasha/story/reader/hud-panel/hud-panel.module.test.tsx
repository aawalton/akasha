import { expect, test } from "bun:test"
import { HudPanel } from "./hud-panel.module.code.tsx"

test("no hud at all is nothing on screen", () => {
  expect(HudPanel({ hud: null })).toBe(null)
})

test("a hud with neither a level nor a pool is nothing on screen", () => {
  expect(HudPanel({ hud: {} })).toBe(null)
})

test("a hud with only a level is still a panel", () => {
  expect(HudPanel({ hud: { level: 3 } })).not.toBe(null)
})

test("a hud with only a pool is still a panel", () => {
  expect(HudPanel({ hud: { pools: { hp: 4 } } })).not.toBe(null)
})
