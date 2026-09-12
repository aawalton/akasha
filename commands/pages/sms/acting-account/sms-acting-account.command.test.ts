import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { surfaceFile } from "akasha/commands/arguments/pages/surface-file.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { smsActingAccount } from "akasha/commands/pages/sms/acting-account/sms-acting-account.command.code.ts"
import { smsActingAccount as page } from "akasha/commands/pages/sms/acting-account/sms-acting-account.command.ts"

const CALLED_AS = "akasha sms acting-account"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [surfaceFile]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const DELIVERED = "a-delivered-surface.txt"

const readingRefused = (argv: readonly string[]): readonly string[] => {
  const answer = smsActingAccount(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the file read is the one argument the page names, and a call must say it", () => {
  expect(SAYS).toEqual([surfaceFile.said])
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[0]).not.toHaveProperty("saidAs")
})

test("a call naming no file asks for it at its flag", () => {
  const said = readingRefused([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${surfaceFile.said}\``)
})

test("a flag this takes no argument at is refused, and the file asked for besides", () => {
  const said = readingRefused(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(`\`${surfaceFile.said}\``)
  expect(said[1]).toContain(`\`${surfaceFile.said}\``)
})

test("a path said as a word is refused, this taking the file at its flag alone", () => {
  const said = readingRefused([DELIVERED])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${DELIVERED}\``)
  expect(said[0]).toContain(`\`${surfaceFile.said}\``)
  expect(said[1]).toContain(`\`${surfaceFile.said}\``)
})

test("the file at its flag with nothing after it is refused, and asked for besides", () => {
  const said = readingRefused([surfaceFile.said])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${surfaceFile.said}\``)
  expect(said[0]).toContain("takes a value")
  expect(said[1]).toContain(`\`${surfaceFile.said}\``)
})

test("the file joined to an empty value is refused as the call wrote it", () => {
  const said = readingRefused([`${surfaceFile.said}=`])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${surfaceFile.said}=\``)
  expect(said[1]).toContain(`\`${surfaceFile.said}\``)
})

test("the empty word after the file names no value", () => {
  const said = readingRefused([surfaceFile.said, ""])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("empty word")
  expect(said[1]).toContain(`\`${surfaceFile.said}\``)
})

test("the file said twice is refused rather than the later one winning", () => {
  const said = readingRefused([surfaceFile.said, DELIVERED, surfaceFile.said, "another.txt"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${surfaceFile.said}\``)
  expect(said[0]).toContain("twice")
})
