import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { throwingAfter } from "akasha/commands/modules/answering/command-answering.module.test-fixtures.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { temperEsoGenerateChatterName } from "akasha/commands/pages/temper/eso/generate/chatter-name/temper-eso-generate-chatter-name.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper eso generate chatter-name",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const LOST = new Error("the registry landed and the working tree would not settle")

const LANDED = "abc123"

test("a run that landed the registry and then threw says that commit in its refusal", async () => {
  const said = await temperEsoGenerateChatterName([], GIVEN, throwingAfter([LANDED], LOST))

  expect(said.report).toEqual([LANDED])
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: ${LANDED}. Nothing after that ran.`
  )
  expect(said.code).toBe(OPERATIONAL)
})

test("a run that threw with the registry unwritten says why it threw and no more", async () => {
  const said = await temperEsoGenerateChatterName([], GIVEN, throwingAfter([], LOST))

  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("the working tree would not settle")
  expect(said.refusals.some((one) => one.startsWith("this stopped part way"))).toBe(false)
})

test("a run that wrote twice names each write in the order it was written", async () => {
  const wrote = ["the registry was written", LANDED]
  const said = await temperEsoGenerateChatterName([], GIVEN, throwingAfter(wrote, LOST))

  expect(said.report).toEqual(wrote)
  expect(said.refusals.at(-1)).toBe(
    `this stopped part way. What it had done by then is this: the registry was written; ` +
      `${LANDED}. Nothing after that ran.`
  )
})

test("a flag this takes no argument for is refused before anything is read", async () => {
  const said = await temperEsoGenerateChatterName(["--json"], GIVEN, throwingAfter([], LOST))

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--json` is no argument")
})

test("a word this takes no argument for is refused before anything is read", async () => {
  const said = await temperEsoGenerateChatterName(["enums.d.ts"], GIVEN, throwingAfter([], LOST))

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`enums.d.ts` is no argument")
})

test("the checkout said twice is refused rather than read as the first saying", async () => {
  const said = await temperEsoGenerateChatterName(
    ["--code-root", "/nowhere", "--code-root", "/nowhere"],
    GIVEN,
    throwingAfter([], LOST)
  )

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--code-root` is said twice")
})
