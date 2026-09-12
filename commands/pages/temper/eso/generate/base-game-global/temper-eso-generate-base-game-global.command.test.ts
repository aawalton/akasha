import { expect, test } from "bun:test"
import {
  answeredWith,
  OK,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  staging,
  temperEsoGenerateBaseGameGlobal,
} from "akasha/commands/pages/temper/eso/generate/base-game-global/temper-eso-generate-base-game-global.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper eso generate base-game-global",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const STOPPED = new Error("the census was staged and the folder would not settle")

test("a flag this takes no argument for is refused before anything is staged", async () => {
  const said = await temperEsoGenerateBaseGameGlobal(["--nonsense"], GIVEN)

  expect(said.code).not.toBe(OK)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})

test("a word this takes no argument for is refused before anything is staged", async () => {
  const said = await temperEsoGenerateBaseGameGlobal(["esoui"], GIVEN)

  expect(said.code).not.toBe(OK)
  expect(said.refusals.join("\n")).toContain("`esoui` is no argument")
})

test("the clone said twice is refused rather than read as the first saying", async () => {
  const said = await temperEsoGenerateBaseGameGlobal(
    ["--eso-root", "/nowhere", "--eso-root", "/nowhere"],
    GIVEN
  )

  expect(said.code).not.toBe(OK)
  expect(said.refusals.join("\n")).toContain("`--eso-root` is said twice")
})

test("a flag taking a value with nothing after it is refused", async () => {
  const said = await temperEsoGenerateBaseGameGlobal(["--stage"], GIVEN)

  expect(said.code).not.toBe(OK)
  expect(said.refusals.join("\n")).toContain("`--stage` takes a value, and none follows it")
})

test("what the call said reaches the staging under the keys the argument pages name", async () => {
  let held: Record<string, unknown> = {}
  await staging(
    ["--code-root", "/one", "--stage", "/two", "--eso-root", "/three"],
    GIVEN,
    (_done, taken) => {
      held = { ...taken }
      return answeredWith([], [], OK)
    }
  )

  expect(held).toEqual({ codeRoot: "/one", stage: "/two", esoRoot: "/three" })
})

test("a staging that threw after staging says what that run had staged", async () => {
  const said = await staging([], GIVEN, (done) => {
    done.push("a run body was staged")
    throw STOPPED
  })

  expect(said.report).toEqual(["a run body was staged"])
  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: a run body was staged. Nothing after that ran."
  )
})
