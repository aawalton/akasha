import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  bytesAt,
  textAt,
  textOf,
} from "akasha/commands/modules/body-reaching/body-reaching.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootFor(): string {
  return scratch.rootFor("akasha-body-reaching-")
}

test("a path nothing is at is reached as absent rather than as a body that would not open", () => {
  expect(bytesAt(join(rootFor(), "nothing.txt"))).toEqual({ absent: true })
})

test("a body that will not open is answered with why that body would not", () => {
  const root = rootFor()
  mkdirSync(join(root, "folder"))
  const held = bytesAt(join(root, "folder"))
  expect("unreadable" in held ? held.unreadable : "").toContain("EISDIR")
})

test("the bytes at a path are the text that path was written with", () => {
  const at = put(rootFor(), "held.txt", "one line\n")
  const held = bytesAt(at)
  expect("bytes" in held ? textOf(held.bytes) : null).toBe("one line\n")
  expect(textAt(at)).toBe("one line\n")
})

test("a body that is no UTF-8 text is answered as no text rather than as bytes", () => {
  const at = join(rootFor(), "held.bin")
  writeFileSync(at, new Uint8Array([0xff, 0xfe, 0x00]))
  expect("bytes" in bytesAt(at)).toBe(true)
  expect(textAt(at)).toBe(null)
})

test("the text at a path nothing is at is nothing", () => {
  expect(textAt(join(rootFor(), "nothing.txt"))).toBe(null)
})
