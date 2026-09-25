import { describe, expect, test } from "bun:test"
import {
  addonTextureOf,
  bindingsIn,
  isGameTexture,
  texturesIn,
} from "akasha/temper/addon/build/deploy-check/modules/addon-texture-names/addon-texture-names.module.code.ts"

function boundBy(text: string): Map<string, string[]> {
  const held = new Map<string, string[]>()
  bindingsIn(text, held)
  return held
}

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

  test("the bare extension names no texture", () => {
    const found = texturesIn('const DDS = ".dds"\nx = path.indexOf(".dds")', "f.ts")
    expect(found.named).toEqual([])
    expect(found.built).toEqual([])
  })

  test("a name bound once to text fills in a path", () => {
    const bindings = boundBy('export const ROOT = "TemperWorld"')
    const found = texturesIn("t = `/${ROOT}/Chest_1.dds`", "f.ts", bindings)
    expect(found.named.map((one) => one.path)).toEqual(["/TemperWorld/Chest_1.dds"])
    expect(found.built).toEqual([])
  })

  test("a name bound once is joined onto a piece", () => {
    const bindings = boundBy('const prefix = "/esoui/art/x_"')
    const found = texturesIn('n = prefix + "up.dds"', "f.ts", bindings)
    expect(found.named.map((one) => one.path)).toEqual(["/esoui/art/x_up.dds"])
  })

  test("a name bound twice, or a field, stays set apart", () => {
    const bindings = boundBy('const prefix = "a_"\nconst prefix = "b_"')
    const found = texturesIn('n = prefix + "up.dds"\nm = tab.prefix + "up.dds"', "f.ts", bindings)
    expect(found.named).toEqual([])
    expect(found.built.map((one) => one.path)).toEqual(["up.dds", "up.dds"])
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
