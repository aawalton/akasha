import { expect, test } from "bun:test"
import { resolve } from "node:path"
import noRawNulBytes from "./no-raw-nul-bytes.check.code.attachment.ts"

const AKASHA = resolve(import.meta.dir, "../../..")

function verdict(path: string, body: Buffer): readonly string[] {
  return noRawNulBytes.run({ root: AKASHA, path: `${AKASHA}/${path}`, body })
}

function text(path: string, said: string): readonly string[] {
  return verdict(path, Buffer.from(said))
}

test("a text file carrying no NUL passes", () => {
  expect(text("a/thing.ts", "export const x = 1\n")).toEqual([])
})

test("a text file carrying a NUL fails", () => {
  expect(text("a/thing.ts", "export const x = \u0000\n")).toHaveLength(1)
})

test("a file kind declaring bytes is not judged", () => {
  expect(verdict("a/thing.png", Buffer.from([0x89, 0x50, 0x00, 0x00]))).toEqual([])
  expect(verdict("a/thing.ico", Buffer.from([0x00, 0x00, 0x01, 0x00]))).toEqual([])
})

test("a file kind not declaring bytes is judged, whatever its extension", () => {
  expect(verdict("a/thing.svg", Buffer.from([0x3c, 0x00, 0x3e]))).toHaveLength(1)
})

test("a generated file is judged, a NUL hiding it from a search just the same", () => {
  expect(text("a/generated/thing.ts", "const x = \u0000\n")).toHaveLength(1)
  expect(text("a/thing.generated.ts", "const x = \u0000\n")).toHaveLength(1)
})

test("a file under a fixtures directory is judged for the same reason", () => {
  expect(text("a/__fixtures__/thing.ts", "const x = \u0000\n")).toHaveLength(1)
})

test("an empty body passes", () => {
  expect(verdict("a/thing.ts", Buffer.alloc(0))).toEqual([])
})

test("the reason names the line and column of the NUL", () => {
  const said = text("a/thing.ts", "one\ntwo\nab\u0000cd\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("column 3")
})

test("a NUL on the first line is column one where it leads", () => {
  const said = text("a/thing.ts", "\u0000rest\n")
  expect(said[0]).toContain("line 1")
  expect(said[0]).toContain("column 1")
})

test("several NULs are reported once, at the first, with the count", () => {
  const said = text("a/thing.ts", "a\u0000b\u0000c\u0000\n")
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("first of 3")
  expect(said[0]).toContain("column 2")
})

test("a NUL is found however deep in the body it lies", () => {
  const said = text("a/thing.ts", `${"x".repeat(20000)}\u0000\n`)
  expect(said).toHaveLength(1)
})

test("an escaped NUL written as four digits is not a raw NUL", () => {
  expect(text("a/thing.ts", "export const x = \"\\u0000\"\n")).toEqual([])
})
