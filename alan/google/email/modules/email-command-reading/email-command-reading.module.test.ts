import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  BODY_FILING,
  SUBJECT_FILING,
  wrongIn,
} from "akasha/alan/google/email/modules/email-command-reading/email-command-reading.module.code.ts"
import { proseIn } from "akasha/command/modules/filling/command-filling.module.test-fixtures.ts"
import { terminal } from "akasha/command/modules/piping/piping.module.test-fixtures.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootAt(): string {
  return scratch.rootFor("email-command-reading-")
}

const NOTHING = { toAddress: [], cc: [], bcc: [], attach: [] }

test("two file flags naming the input are refused, since one call reads it once", () => {
  expect(wrongIn({ ...NOTHING, subjectFile: "-", bodyFile: "-" }).join(" | ")).toContain(
    "each name the input"
  )
})

test("one file flag naming the input is read rather than refused", () => {
  expect(wrongIn({ ...NOTHING, subjectFile: "-", body: "b" })).toEqual([])
})

test("a subject read from a file loses its line ending and a whole body keeps it", () => {
  const root = rootAt()
  writeFileSync(join(root, "subject.txt"), "Hello\n")
  writeFileSync(join(root, "body.md"), "Line one\n\n")
  const said = { "--subject-file": "subject.txt", "--body-file": "body.md" }
  expect(proseIn(root, said, SUBJECT_FILING, terminal)).toEqual({ text: "Hello" })
  expect(proseIn(root, said, BODY_FILING, terminal)).toEqual({ text: "Line one\n\n" })
})

test("text said at its flag is taken without the file being reached for", () => {
  expect(proseIn(rootAt(), { "--subject": "Said inline" }, SUBJECT_FILING, terminal)).toEqual({
    text: "Said inline",
  })
})
