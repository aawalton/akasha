import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  answeredBy,
  asJsonLines,
  BODY_FILING,
  COMPOSING,
  MAX,
  MESSAGE,
  readTaking,
  SUBJECT_FILING,
  type Taking,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import {
  DataError,
  OperationalError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  DATA,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { proseIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { TERMINAL } from "akasha/commands/modules/piping/piping.module.test-fixtures.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const WENT = "gmail sent the message to one@example.com, and sending cannot be undone"

test("a call gmail took is answered as the value gmail gave", async () => {
  const held = await answeredBy(async () => asJsonLines({ id: "abc123" }))

  expect(held.code).toBe(0)
  expect(held.report.join("")).toContain("abc123")
})

test("a call that threw after gmail took the write names that write in its refusal", async () => {
  const held = await answeredBy(async (done) => {
    done.push(WENT)
    throw new OperationalError("the reply would not read")
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([WENT])
  expect(held.refusals[0]).toBe("the reply would not read")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain(WENT)
})

test("a call that threw before gmail took anything names no write", async () => {
  const held = await answeredBy(async () => {
    throw new OperationalError("gmail would not answer")
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a fault carrying a code of its own is answered with that code", async () => {
  const held = await answeredBy(async () => {
    throw new DataError("no message answers that id")
  })

  expect(held.code).toBe(DATA)
})

test("a fault says where that fault was thrown", async () => {
  const held = await answeredBy(async () => {
    throw new OperationalError("gmail would not answer")
  })

  expect(held.refusals[1]).toMatch(/^thrown at \/.+\.module\.test\.ts:\d+:\d+$/)
})

const NAMING: Taking = { valued: [MESSAGE], needed: [MESSAGE], named: MESSAGE }

const COUNTING: Taking = { valued: [MAX], numbered: [MAX] }

function refusedIn(argv: readonly string[], taking: Taking): string {
  const held = readTaking(argv, taking)
  return "refused" in held ? held.refused.join(" | ") : ""
}

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootAt(): string {
  return scratch.rootFor("email-command-reading-")
}

test("a word alone fills the flag the command names for it", () => {
  expect(readTaking(["18c1f2a3"], NAMING)).toEqual({ one: { [MESSAGE]: "18c1f2a3" }, many: {} })
})

test("the flag and the word name the same thing, so saying both is refused", () => {
  expect(refusedIn(["18c1f2a3", MESSAGE, "other"], NAMING)).toContain("said both as")
})

test("a second word alone is refused rather than passed over", () => {
  expect(refusedIn(["one", "two"], NAMING)).toContain("one call names one of these")
})

test("a word alone is refused where the command names no flag for one", () => {
  expect(refusedIn(["one"], COUNTING)).toContain("takes no word on its own")
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

test("a subject read from a file loses its line ending and a whole body keeps it", () => {
  const root = rootAt()
  writeFileSync(join(root, "subject.txt"), "Hello\n")
  writeFileSync(join(root, "body.md"), "Line one\n\n")
  const said = { "--subject-file": "subject.txt", "--body-file": "body.md" }
  expect(proseIn(root, said, SUBJECT_FILING, TERMINAL)).toEqual({ text: "Hello" })
  expect(proseIn(root, said, BODY_FILING, TERMINAL)).toEqual({ text: "Line one\n\n" })
})

test("text said at its flag is taken without the file being reached for", () => {
  expect(proseIn(rootAt(), { "--subject": "Said inline" }, SUBJECT_FILING, TERMINAL)).toEqual({
    text: "Said inline",
  })
})
