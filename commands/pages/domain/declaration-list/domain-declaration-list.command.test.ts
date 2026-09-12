import { expect, test } from "bun:test"
import { declarationSubject } from "akasha/commands/arguments/pages/declaration-subject.argument.ts"
import {
  readIn,
  SUBJECT,
} from "akasha/commands/pages/domain/declaration-list/domain-declaration-list.command.code.ts"
import { domainDeclarationList } from "akasha/commands/pages/domain/declaration-list/domain-declaration-list.command.ts"

function refusedIn(argv: readonly string[]): string {
  const read = readIn(argv)
  return "refused" in read ? read.refused.join(" ") : ""
}

test("a call naming no subject is handed both", () => {
  const read = readIn([])
  expect("refused" in read ? [] : read.subjects).toEqual([])
})

test("a subject it names is read as it is said", () => {
  const read = readIn([SUBJECT, "personas"])
  expect("refused" in read ? [] : read.subjects).toEqual(["personas"])
})

test("a subject that is neither domains nor personas is refused", () => {
  expect(refusedIn([SUBJECT, "widgets"])).toContain("`widgets` is no subject")
})

test("a flag it does not take is refused by name", () => {
  expect(refusedIn(["--paths"])).toContain("`--paths` is no flag this takes")
})

test("a flag wanting a word and given none is refused", () => {
  expect(refusedIn([SUBJECT])).toContain("nothing followed it")
})

const SHOWN: Readonly<Record<string, string>> = {
  "argument/declaration-subject": declarationSubject.said,
}

test("the page takes one flag", () => {
  const shown = domainDeclarationList.arguments.map((one) => SHOWN[one.argument] ?? "")
  expect(shown).toEqual([SUBJECT])
})
