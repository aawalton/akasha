import { describe, expect, it } from "bun:test"
import {
  listedIn,
  unlistedIn,
} from "akasha/temper/addon-build/modules/addon-metadata-copy/addon-metadata-copy.module.code.ts"

const MANIFEST = [
  "## Title: Temper Housing",
  "## APIVersion: 101050",
  "",
  "build-id.lua",
  "TemperHousing.lua",
  "Bindings.xml",
  "",
].join("\n")

describe("listedIn", () => {
  it("takes the file lines and leaves the header and the blanks", () => {
    expect(listedIn(MANIFEST)).toEqual(["build-id.lua", "TemperHousing.lua", "Bindings.xml"])
  })

  it("leaves a line the manifest comments out", () => {
    expect(listedIn("## Title: One\n\n#Lib/LibStub.lua\none.lua\n")).toEqual(["one.lua"])
  })
})

describe("unlistedIn", () => {
  it("says nothing where every document the build wrote is loaded", () => {
    const held = ["build-id.lua", "TemperHousing.lua", "Bindings.xml", "TemperHousing.txt"]
    expect(unlistedIn(held, MANIFEST)).toEqual([])
  })

  it("names markup the manifest does not load", () => {
    expect(unlistedIn(["TemperHousing.lua", "TemperHousing.xml"], MANIFEST)).toEqual([
      "TemperHousing.xml",
    ])
  })

  it("names Lua the manifest does not load", () => {
    expect(unlistedIn(["strings.lua"], MANIFEST)).toEqual(["strings.lua"])
  })

  it("leaves an asset alone, which a path reaches rather than the manifest", () => {
    expect(unlistedIn(["Chest_1.dds", "art/WorldMapFrame.dds"], MANIFEST)).toEqual([])
  })

  it("names a document under a folder by the path the manifest would load it at", () => {
    expect(unlistedIn(["parts/one.xml"], MANIFEST)).toEqual(["parts/one.xml"])
  })

  it("leaves markup a line the game fills in while running reaches", () => {
    const manifest = "## Title: One\n\nPC/backupfont_$(language).xml\n"
    expect(unlistedIn(["PC/backupfont_en.xml", "PC/backupfont_zh.xml"], manifest)).toEqual([])
  })

  it("names markup a line the game fills in while running does not reach", () => {
    const manifest = "## Title: One\n\nPC/backupfont_$(language).xml\n"
    expect(unlistedIn(["Console/backupfont_en.xml"], manifest)).toEqual([
      "Console/backupfont_en.xml",
    ])
  })
})
