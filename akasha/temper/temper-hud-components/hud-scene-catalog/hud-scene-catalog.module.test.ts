import { describe, expect, test } from "bun:test"
import { HUD_SCENE_CATALOG_SCHEMA } from "../hud-component-record/hud-component-record.module.code.ts"
import { HUD_CONTROLS } from "../hud-controls/hud-controls.module.code.ts"
import { HUD_FRAGMENT_GROUP } from "../hud-fragment-group/hud-fragment-group.module.code.ts"
import { HUD_SCENE_FRAGMENTS } from "../hud-scene-fragments/hud-scene-fragments.module.code.ts"
import { HUD_SCENE_CATALOG } from "./hud-scene-catalog.module.code.ts"

describe("hud-scene-catalog", () => {
  test("every record fits the record shape", () => {
    expect(() => HUD_SCENE_CATALOG_SCHEMA.parse(HUD_SCENE_CATALOG)).not.toThrow()
  })

  test("the catalog holds the three parts and nothing else", () => {
    expect(HUD_SCENE_CATALOG).toHaveLength(
      HUD_FRAGMENT_GROUP.length + HUD_SCENE_FRAGMENTS.length + HUD_CONTROLS.length
    )
  })

  test("the fragments come before the controls", () => {
    const firstControl = HUD_SCENE_CATALOG.findIndex((one) => one.kind === "non-fragment-control")
    const lastFragment = HUD_SCENE_CATALOG.map((one) => one.kind).lastIndexOf("fragment")
    expect(lastFragment).toBeLessThan(firstControl)
  })

  test("a fragment the group holds comes before a fragment a scene adds", () => {
    const group = HUD_SCENE_CATALOG.findIndex((one) => one.hideMechanism === "scene-fragment")
    const last = HUD_SCENE_CATALOG.map((one) => one.hideMechanism).lastIndexOf("fragment-group")
    expect(last).toBeLessThan(group)
  })

  test("no ESO global is catalogued twice", () => {
    const seen = new Set(HUD_SCENE_CATALOG.map((one) => one.esoGlobal))
    expect(seen.size).toBe(HUD_SCENE_CATALOG.length)
  })

  test("every record is walked out of the one scene source", () => {
    const files = new Set(HUD_SCENE_CATALOG.map((one) => one.source.file))
    expect([...files]).toEqual(["esoui/ingame/scenes/hudscene.lua"])
  })
})
