import { describe, expect, test } from "bun:test"
import {
  addonTextureOf,
  isGameTexture,
  texturesIn,
} from "akasha/temper/addon/build/deploy-check/modules/addon-texture-names/addon-texture-names.module.code.ts"

describe("texturesIn", () => {
  test("a quoted path is named, with its line", () => {
    const found = texturesIn('a\nb.SetTexture("/esoui/art/icons/x.dds")\n', "f.ts")
    expect(found.named).toEqual([{ path: "/esoui/art/icons/x.dds", file: "f.ts", line: 2 }])
    expect(found.built).toEqual([])
  })

  test("a markup attribute is named", () => {
    const found = texturesIn('<Texture textureFile="TemperItems/art/yes.dds" />', "f.xml")
    expect(found.named.map((one) => one.path)).toEqual(["TemperItems/art/yes.dds"])
  })

  test("a filled-in path is set apart", () => {
    const found = texturesIn("const p = `/${ROOT}/Chest_1.dds`", "f.ts")
    expect(found.named).toEqual([])
    expect(found.built.map((one) => one.path)).toEqual(["/${ROOT}/Chest_1.dds"])
  })

  test("a piece joined on is set apart", () => {
    const found = texturesIn('icon = base .. "up.dds"\nother = root + "art/over.dds"', "f.lua")
    expect(found.named).toEqual([])
    expect(found.built.map((one) => one.path)).toEqual(["up.dds", "art/over.dds"])
  })
})

describe("where a path points", () => {
  test("the game's interface folder is the game's, in any case or slash", () => {
    expect(isGameTexture("EsoUI\\Art\\Tooltips\\UI-Border.dds")).toBe(true)
    expect(isGameTexture("/esoui/art/icons/x.dds")).toBe(true)
    expect(isGameTexture("art/fx/texture/footprint_wolf_01.dds")).toBe(true)
    expect(isGameTexture("TemperCombat/icons/x.dds")).toBe(false)
  })

  test("any other path names its add-on by its first folder", () => {
    expect(addonTextureOf("/TemperWorld/Pins/A.dds")).toEqual({
      addon: "temperworld",
      rest: "pins/a.dds",
    })
    expect(addonTextureOf("esoui/art/x.dds")).toBeNull()
  })
})
