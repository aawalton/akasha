import { expect, test } from "bun:test"
import {
  couldTurn,
  generateChange,
  manifestText,
} from "akasha/temper/addon/build/deploy-check/modules/eso-sandbox-manifest-writing/eso-sandbox-manifest-writing.change-generator.code.ts"

const TABLE_AT =
  "temper/addon/build/deploy-check/modules/sandbox-library/sandbox-library.data-table.data.json"

const MANIFEST_AT =
  "temper/addon/build/deploy-check/modules/eso-sandbox-manifest/eso-sandbox-manifest.module.code.ts"

const UNREAD = { root: "/nowhere", before: () => null, after: () => null }

const LIBRARY = {
  apiVersion: 101047,
  globals: { dofile: "nil", pairs: "function", rawlen: "nil" },
  libraries: { debug: "table", io: "nil", os: "table" },
  members: { debug: ["traceback"], os: ["time", "clock", "date"] },
}

function bytes(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

function changeOver(table: string | null, manifest: string, changed: string) {
  const bodies = new Map<string, string | null>([
    [TABLE_AT, table],
    [MANIFEST_AT, manifest],
  ])
  return {
    ...UNREAD,
    changed: [changed],
    after: (path: string) => {
      const body = bodies.get(path) ?? null
      return body === null ? null : bytes(body)
    },
  }
}

test("a change to the capture could turn the manifest", () => {
  expect(couldTurn({ ...UNREAD, changed: [TABLE_AT] })).toBe(true)
})

test("a hand edit to the manifest could turn the manifest", () => {
  expect(couldTurn({ ...UNREAD, changed: [MANIFEST_AT] })).toBe(true)
})

test("a change touching neither writes nothing", () => {
  expect(generateChange({ ...UNREAD, changed: ["alan/notes/today.md"] })).toEqual({
    edits: [],
    said: [],
  })
})

test("a global the game answers nil for is stripped, and one it holds is not", () => {
  expect(manifestText(LIBRARY)).toContain(
    'export const ESO_STRIPPED_GLOBALS = ["dofile", "rawlen"] as const\n'
  )
})

test("a library the game holds no table for is wholly stripped", () => {
  expect(manifestText(LIBRARY)).toContain(
    'export const ESO_WHOLLY_STRIPPED_NAMESPACES = ["io"] as const\n'
  )
})

test("each library the game holds lists its members sorted", () => {
  const text = manifestText(LIBRARY)
  expect(text).toContain('export const ESO_AVAILABLE_DEBUG = ["traceback"] as const\n')
  expect(text).toContain('export const ESO_AVAILABLE_OS = ["clock", "date", "time"] as const\n')
  expect(text).not.toContain("ESO_AVAILABLE_IO")
})

test("a list past the line width is written one member to a line", () => {
  const members = Array.from({ length: 20 }, (_, at) => `member${String(at).padStart(2, "0")}`)
  const text = manifestText({ ...LIBRARY, members: { ...LIBRARY.members, os: members } })
  expect(text).toContain('export const ESO_AVAILABLE_OS = [\n  "member00",\n  "member01",\n')
})

test("a kept capture writes the manifest over a hand list", () => {
  const written = generateChange(changeOver(JSON.stringify(LIBRARY), "old\n", TABLE_AT))
  expect(written.edits).toEqual([
    { kind: "replace", path: MANIFEST_AT, contentFrom: "old\n", contentTo: manifestText(LIBRARY) },
  ])
})

test("a manifest already as the capture says is left alone", () => {
  const written = generateChange(
    changeOver(JSON.stringify(LIBRARY), manifestText(LIBRARY), TABLE_AT)
  )
  expect(written).toEqual({ edits: [], said: [] })
})

test("with no capture kept, a hand edit to the manifest is left alone", () => {
  expect(generateChange(changeOver(null, "by hand\n", MANIFEST_AT))).toEqual({
    edits: [],
    said: [],
  })
})
