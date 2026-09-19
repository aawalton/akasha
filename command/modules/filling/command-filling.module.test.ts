import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  filing,
  filledIn,
  heldAt,
} from "akasha/command/modules/filling/command-filling.module.code.ts"
import { proseIn } from "akasha/command/modules/filling/command-filling.module.test-fixtures.ts"
import { piping, terminal } from "akasha/command/modules/piping/piping.module.test-fixtures.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const TEXT = filing("--text")

const WHOLE = { ...TEXT, whole: true }

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a filing names the flag and the file flag beside it, and keeps no line endings", () => {
  expect(filing("--text")).toEqual({ said: "--text", file: "--text-file", whole: false })
})

test("a value said at its flag is taken without the file being reached for", () => {
  expect(proseIn("/nowhere", { [TEXT.said]: "hello" }, TEXT, terminal)).toEqual({ text: "hello" })
})

test("neither way said carries nothing", () => {
  expect(proseIn("/nowhere", {}, TEXT, terminal)).toEqual({ text: undefined })
})

test("a value said at its flag and at its file at once is refused", () => {
  const said = { [TEXT.said]: "hello", [TEXT.file]: "./body.md" }
  expect("refused" in proseIn("/nowhere", said, TEXT, terminal)).toBe(true)
})

test("a value read whole keeps the line endings at its end, and any other loses them", () => {
  const root = scratch.rootFor("command-filling-")
  writeFileSync(join(root, "body.md"), "Line one\n\n")
  const said = { [TEXT.file]: "body.md" }
  expect(proseIn(root, said, TEXT, terminal)).toEqual({ text: "Line one" })
  expect(proseIn(root, said, WHOLE, terminal)).toEqual({ text: "Line one\n\n" })
})

test("a file that would not open is refused rather than thrown", () => {
  const root = scratch.rootFor("command-filling-")
  const held = proseIn(root, { [TEXT.file]: "gone.md" }, TEXT, terminal)
  expect("refused" in held ? held.refused.join("") : "").toContain("would not open")
})

test("a terminal where the file is `-` is nothing piped in", () => {
  const held = proseIn("/nowhere", { [TEXT.file]: "-" }, TEXT, terminal)
  expect("refused" in held ? held.refused.join("") : "").toContain("nothing is piped in")
})

test("a file named `-` is the input, and no root is reached for it", () => {
  expect(heldAt("/nowhere", TEXT.file, "-", piping("hello"))).toEqual({ text: "hello" })
})

test("what is piped in fills the value where the file is `-`", () => {
  expect(proseIn("/nowhere", { [TEXT.file]: "-" }, TEXT, piping("Line one\n"))).toEqual({
    text: "Line one",
  })
})

test("a value piped in is read whole or loses its line endings as the filing says", () => {
  expect(proseIn("/nowhere", { [TEXT.file]: "-" }, TEXT, piping("Line one\n\n"))).toEqual({
    text: "Line one",
  })
  expect(proseIn("/nowhere", { [TEXT.file]: "-" }, WHOLE, piping("Line one\n\n"))).toEqual({
    text: "Line one\n\n",
  })
})

test("the two values a filing holds are read the same handed in as looked up", () => {
  const root = scratch.rootFor("command-filling-")
  writeFileSync(join(root, "handed.md"), "Line one\n")
  expect(filledIn(root, "hello", undefined, TEXT, terminal)).toEqual({ text: "hello" })
  expect(filledIn(root, undefined, "handed.md", TEXT, terminal)).toEqual({ text: "Line one" })
  expect(filledIn(root, undefined, undefined, TEXT, terminal)).toEqual({ text: undefined })
  expect("refused" in filledIn(root, "hello", "handed.md", TEXT, terminal)).toBe(true)
})
