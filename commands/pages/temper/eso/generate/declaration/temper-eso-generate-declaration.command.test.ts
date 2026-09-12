import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  declaredIn,
  declaring,
  heldAlready,
  temperEsoGenerateDeclaration,
} from "akasha/commands/pages/temper/eso/generate/declaration/temper-eso-generate-declaration.command.code.ts"

const HELD = "somewhere/held-already.type-declaration.d.ts"

const ENUMS = "enums.d.ts"

const ONE = "declare const ACTION_TYPE_ABILITY: number\n"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper eso generate declaration",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const STOPPED = new Error("the declarations landed and the stamp could not be read back")

test("a run that landed the declarations and then threw names that commit", async () => {
  const said = await declaring([], GIVEN, throwingAfter(["abc123"], STOPPED))

  expect(said.report).toEqual(["abc123"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: abc123. Nothing after that ran."
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw with no declaration landed says the fault by itself", async () => {
  const said = await declaring([], GIVEN, throwingAfter([], STOPPED))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the stamp could not be read back")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote more than one thing names each of them in turn", async () => {
  const wrote = ["five declaration files were written", "abc123"]
  const said = await declaring([], GIVEN, throwingAfter(wrote, STOPPED))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: " +
      "five declaration files were written; abc123. Nothing after that ran."
  )
})

test("a flag this takes no argument for is refused before anything is read", async () => {
  const said = await temperEsoGenerateDeclaration(["--nonsense"], GIVEN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})

test("a word this takes no argument for is refused before anything is read", async () => {
  const said = await temperEsoGenerateDeclaration(["enums.d.ts"], GIVEN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`enums.d.ts` is no argument")
})

test("the checkout said twice is refused rather than read as the first saying", async () => {
  const said = await temperEsoGenerateDeclaration(
    ["--code-root", "/nowhere", "--code-root", "/nowhere"],
    GIVEN
  )

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--code-root` is said twice")
})

test("a name a declaration file carries already is named against the file that carries it", () => {
  const held = declaredIn([HELD], () => ONE)

  expect(heldAlready([[ENUMS, ONE]], held)).toEqual([`\`ACTION_TYPE_ABILITY\` at ${HELD}:1`])
})

test("a name nothing else declares stops nothing", () => {
  const held = declaredIn([HELD], () => "declare const ACTION_TYPE_EMOTE: number\n")

  expect(heldAlready([[ENUMS, ONE]], held)).toEqual([])
})

test("an interface two declaration files merge is no second home for a name", () => {
  const held = declaredIn([HELD], () => "interface AddOnManager { areEnabled: () => boolean }\n")

  expect(
    heldAlready([["objects.d.ts", "interface AddOnManager { isOld: () => boolean }\n"]], held)
  ).toEqual([])
})

test("a member two declaration files both declare is a second home", () => {
  const body = "interface AddOnManager { areEnabled: () => boolean }\n"
  const held = declaredIn([HELD], () => body)

  expect(heldAlready([["objects.d.ts", body]], held)).toEqual([
    `\`AddOnManager.areEnabled\` at ${HELD}:1`,
  ])
})

test("a file with no body to read declares nothing", () => {
  expect(declaredIn([HELD], () => null).size).toBe(0)
})
