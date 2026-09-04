import { expect, test } from "bun:test"
import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { Given } from "@akasha/command-system/calling"
import {
  BODY_FILING,
  COMPOSING,
  MAX,
  MESSAGE,
  proseIn,
  readTaking,
  SUBJECT_FILING,
  type Taking,
} from "./email-command-reading.module.code.ts"

const NAMING: Taking = { valued: [MESSAGE], needed: [MESSAGE], named: MESSAGE }

const COUNTING: Taking = { valued: [MAX], numbered: [MAX] }

function refusedIn(argv: readonly string[], taking: Taking): string {
  const held = readTaking(argv, taking)
  return "refused" in held ? held.refused.join(" | ") : ""
}

function rootAt(): string {
  return mkdtempSync(join(tmpdir(), "email-command-reading-"))
}

function givenAt(root: string): Given {
  return { root, calledAs: "akasha email-messages-send", from: root, writer: null, agentId: null }
}

const TTY = () => ({ tty: true }) as const

test("a word standing alone fills the flag the command names for it", () => {
  expect(readTaking(["18c1f2a3"], NAMING)).toEqual({ one: { [MESSAGE]: "18c1f2a3" }, many: {} })
})

test("the flag and the word name the same thing, so saying both is refused", () => {
  expect(refusedIn(["18c1f2a3", MESSAGE, "other"], NAMING)).toContain("said both as")
})

test("a second word standing alone is refused rather than passed over", () => {
  expect(refusedIn(["one", "two"], NAMING)).toContain("one call names one of these")
})

test("a word standing alone is refused where the command names no flag for one", () => {
  expect(refusedIn(["one"], COUNTING)).toContain("takes no word standing on its own")
})

test("a flag the command does not take is refused, and the ones it takes are named", () => {
  const said = refusedIn(["--force"], NAMING)
  expect(said).toContain("`--force` is no flag this takes")
  expect(said).toContain(MESSAGE)
})

test("a flag whose value is another flag is a flag no value follows", () => {
  expect(refusedIn([MESSAGE, MAX], { valued: [MESSAGE, MAX] })).toContain(
    "takes a value, and none follows it"
  )
})

test("a needed flag nothing said is refused", () => {
  expect(refusedIn([], NAMING)).toContain("this names `--message`, and nothing said it")
})

test("a needed flag names its file route where it has one", () => {
  expect(refusedIn(["--to", "a@x.com"], COMPOSING)).toContain("`--subject` or at `--subject-file`")
})

test("a flag that does not repeat is refused where it is said twice", () => {
  expect(refusedIn([MESSAGE, "one", MESSAGE, "two"], { valued: [MESSAGE] })).toContain(
    "said more than once"
  )
})

test("a repeating flag gathers its values in the order the values are said", () => {
  const held = readTaking(["--to", "a@x.com", "--to", "b@y.com"], {
    valued: [],
    repeats: ["--to"],
  })
  expect("refused" in held ? [] : held.many["--to"]).toEqual(["a@x.com", "b@y.com"])
})

test("text said at its flag and at its file both is refused", () => {
  const said = refusedIn(
    ["--to", "a@x.com", "--subject", "one", "--subject-file", "./s.txt", "--body", "b"],
    COMPOSING
  )
  expect(said).toContain("said both there and at `--subject-file`")
})

test("two file flags naming the input are refused, since one call reads it once", () => {
  const said = refusedIn(["--to", "a@x.com", "--subject-file", "-", "--body-file", "-"], COMPOSING)
  expect(said).toContain("each name the input")
})

test("one file flag naming the input is read rather than refused", () => {
  const held = readTaking(["--to", "a@x.com", "--subject-file", "-", "--body", "b"], COMPOSING)
  expect("refused" in held).toBe(false)
})

test("a count that is no whole number is refused", () => {
  expect(refusedIn([MAX, "five"], COUNTING)).toContain("no whole number of nought or more")
  expect(refusedIn([MAX, "-2"], COUNTING)).toContain("no whole number of nought or more")
  expect("refused" in readTaking([MAX, "5"], COUNTING)).toBe(false)
})

test("a command naming either of two flags is refused where neither was said", () => {
  const taking: Taking = {
    valued: [],
    repeats: ["--add", "--remove"],
    either: ["--add", "--remove"],
  }
  expect(refusedIn([], taking)).toContain("and nothing said either")
  expect("refused" in readTaking(["--add", "STARRED"], taking)).toBe(false)
})

test("every refusal a call earns is gathered rather than the first alone", () => {
  const held = readTaking(["--force", "--other"], NAMING)
  expect("refused" in held ? held.refused.length : 0).toBe(3)
})

test("a line read from a file loses its line ending and a whole body keeps it", () => {
  const root = rootAt()
  writeFileSync(join(root, "subject.txt"), "Hello\n")
  writeFileSync(join(root, "body.md"), "Line one\n\n")
  const said = { one: { "--subject-file": "subject.txt", "--body-file": "body.md" }, many: {} }
  expect(proseIn(givenAt(root), said, SUBJECT_FILING, TTY)).toEqual({ said: "Hello" })
  expect(proseIn(givenAt(root), said, BODY_FILING, TTY)).toEqual({ said: "Line one\n\n" })
})

test("text said at its flag is taken without the file being reached for", () => {
  const root = rootAt()
  const said = { one: { "--subject": "Said inline" }, many: {} }
  expect(proseIn(givenAt(root), said, SUBJECT_FILING, TTY)).toEqual({ said: "Said inline" })
})

test("a file that is not there answers with why rather than throwing", () => {
  const root = rootAt()
  const said = { one: { "--body-file": "gone.md" }, many: {} }
  const held = proseIn(givenAt(root), said, BODY_FILING, TTY)
  expect("why" in held ? held.why : "").toContain("would not open")
})

test("a terminal at `-` is nothing piped in", () => {
  const root = rootAt()
  const said = { one: { "--body-file": "-" }, many: {} }
  const held = proseIn(givenAt(root), said, BODY_FILING, TTY)
  expect("why" in held ? held.why : "").toContain("nothing is piped in")
})
