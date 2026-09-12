import { expect, test } from "bun:test"
import {
  buildIdLua,
  manifestLines,
} from "akasha/temper/addon-build/modules/addon-load-order/addon-load-order.module.code.ts"

const NAME = "TemperProbe"

const NAME_XML = `${NAME}.xml`

const NAME_LUA = `${NAME}.lua`

function filesIn(
  over: {
    readonly xmlBeforeBundle?: readonly string[]
    readonly xmlAfterBundle?: readonly string[]
    readonly bindingsXmlThere?: boolean
  } = {}
): readonly string[] {
  const lines = manifestLines({
    metadataHeader: `## Title: ${NAME}`,
    buildIdFile: "build-id.lua",
    additionalLuaFiles: [],
    xmlBeforeBundle: over.xmlBeforeBundle ?? [],
    xmlAfterBundle: over.xmlAfterBundle ?? [],
    luaPaths: [NAME_LUA],
    addonName: NAME,
    nameXmlThere: true,
    bindingsXmlThere: over.bindingsXmlThere ?? false,
  })
  return lines.filter((line) => line !== "" && !line.startsWith("##"))
}

function timesIn(said: readonly string[], line: string): number {
  return said.filter((one) => one === line).length
}

test("markup the addon's own manifest lists after the bundle is listed once", () => {
  expect(timesIn(filesIn({ xmlAfterBundle: [NAME_XML] }), NAME_XML)).toBe(1)
})

test("markup the addon's own manifest lists before the bundle is listed once", () => {
  const said = filesIn({ xmlBeforeBundle: [NAME_XML] })
  expect(timesIn(said, NAME_XML)).toBe(1)
  expect(said.indexOf(NAME_XML)).toBeLessThan(said.indexOf(NAME_LUA))
})

test("markup the addon's own manifest leaves out is listed by name", () => {
  expect(filesIn()).toContain(NAME_XML)
})

test("markup the addon's own manifest lists keeps the place that manifest gave it", () => {
  const said = filesIn({ xmlAfterBundle: [NAME_XML, "Other.xml"] })
  expect(said.indexOf(NAME_XML)).toBeLessThan(said.indexOf("Other.xml"))
})

test("no file is listed twice", () => {
  const said = filesIn({
    xmlBeforeBundle: ["Early.xml"],
    xmlAfterBundle: [NAME_XML],
    bindingsXmlThere: true,
  })
  expect(said.length).toBe(new Set(said).size)
})

test("an addon name the Lua string would not hold refuses the call", () => {
  expect(() => buildIdLua(`X"] = nil --`, "abc12345")).toThrow("no usable addon name")
  expect(() => buildIdLua("", "abc12345")).toThrow()
  expect(() => buildIdLua("../evil", "abc12345")).toThrow()
})

test("a bare addon name is written as the Lua table key", () => {
  expect(buildIdLua("LibAddonMenu-2.0", "abc12345")).toContain(
    `TemperBuildIds["LibAddonMenu-2.0"] = "abc12345"`
  )
})
