import { expect, test } from "bun:test"
import { declarationSubject } from "akasha/commands/arguments/pages/declaration-subject.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  domainDeclarationList as listing,
  wrongIn,
} from "akasha/commands/pages/domain/declaration-list/domain-declaration-list.command.code.ts"
import { domainDeclarationList } from "akasha/commands/pages/domain/declaration-list/domain-declaration-list.command.ts"

const SUBJECT = declarationSubject.said

const NOWHERE = "/nowhere"

function given(): Given {
  return {
    root: NOWHERE,
    calledAs: "akasha domain declaration-list",
    from: NOWHERE,
    writer: null,
    agentId: null,
  }
}

function refusedIn(argv: readonly string[]): string {
  return listing(argv, given()).refusals.join(" ")
}

test("a call naming no subject is refused nothing on the command line", () => {
  const said = refusedIn([])
  expect(said).not.toContain("is no argument")
  expect(said).not.toContain("is no subject")
})

test("a subject it names is read as it is said", () => {
  expect(wrongIn(["personas"])).toEqual([])
  expect(wrongIn(["domains", "personas"])).toEqual([])
})

test("a subject that is neither domains nor personas is refused", () => {
  expect(refusedIn([SUBJECT, "widgets"])).toContain("`widgets` is no subject")
})

test("a flag it does not take is refused by name", () => {
  expect(refusedIn(["--paths"])).toContain("`--paths` is no argument")
})

test("a flag wanting a word and given none is refused", () => {
  expect(refusedIn([SUBJECT])).toContain("takes a value, and none follows it")
})

const SHOWN: Readonly<Record<string, string>> = {
  "argument/declaration-subject": declarationSubject.said,
}

test("the page takes one flag", () => {
  const shown = domainDeclarationList.arguments.map((one) => SHOWN[one.argument] ?? "")
  expect(shown).toEqual([SUBJECT])
})
