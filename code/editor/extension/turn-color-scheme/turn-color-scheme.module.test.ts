import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import * as path from "node:path"
import {
  colorNamed,
  PALETTE_NAMES,
} from "akasha/code/editor/extension/palette/palette.module.code.ts"
import {
  COLOR_ID_PREFIX,
  turnColorIn,
  turnStateSaid,
} from "akasha/code/editor/extension/turn-color-scheme/turn-color-scheme.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { z } from "zod"

const SHADES_SCHEMA = z.object({
  dark: z.string(),
  light: z.string(),
  highContrast: z.string(),
  highContrastLight: z.string(),
})

const MANIFEST_SCHEMA = z.object({
  contributes: z
    .object({
      colors: z.array(z.object({ id: z.string(), defaults: SHADES_SCHEMA }).loose()),
    })
    .loose(),
})

const MANIFEST_AT = path.join(rootOf(import.meta.dir), "package.json")

const contributed = MANIFEST_SCHEMA.parse(JSON.parse(readFileSync(MANIFEST_AT, "utf8"))).contributes
  .colors

test("a turn, a subagent and a stopped seat are read out of a path the same way", () => {
  expect(turnColorIn("/turn/green/s1")).toBe("ops.color.green")
  expect(turnColorIn("/subagent/green/s1")).toBe("ops.color.green")
  expect(turnColorIn("/stopped/green/s1")).toBe("ops.color.green")
})

test("a stopped seat's path is read for the text color", () => {
  expect(turnColorIn("/stopped/text/s1")).toBe("ops.color.text")
})

test("a path carrying no color is drawn in no color", () => {
  expect(turnColorIn("/stopped/s1")).toBeUndefined()
  expect(turnColorIn("/subagent/s1")).toBeUndefined()
})

test("a name the palette does not have is drawn in no color", () => {
  expect(turnColorIn("/turn/mauve/s1")).toBeUndefined()
})

test("every color id this answers is one the editor's manifest contributes", () => {
  const ids = new Set(contributed.map((one) => one.id))
  for (const name of PALETTE_NAMES) {
    const id = `${COLOR_ID_PREFIX}${name}`
    expect([id, ids.has(id)]).toEqual([id, true])
  }
})

test("a color the manifest contributes is the hex the palette answers that name with", () => {
  for (const one of contributed) {
    if (!one.id.startsWith(COLOR_ID_PREFIX)) continue
    const hex = colorNamed(one.id.slice(COLOR_ID_PREFIX.length)) ?? ""
    expect({ id: one.id, defaults: one.defaults }).toEqual({
      id: one.id,
      defaults: { dark: hex, light: hex, highContrast: hex, highContrastLight: hex },
    })
  }
})

test("a state of `unknown` is said as nothing", () => {
  expect(turnStateSaid("unknown", undefined)).toBeUndefined()
  expect(turnStateSaid(undefined, "alan")).toBeUndefined()
})

test("a state with something waited on is said as the state and that thing", () => {
  expect(turnStateSaid("idle", "alan")).toBe("idle on alan")
  expect(turnStateSaid("idle", undefined)).toBe("idle")
})
