import { expect, test } from "bun:test"
import {
  DATA,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answering, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Staging } from "akasha/commands/pages/temper/eso/generate/colon-method/temper-eso-generate-colon-method.command.code.ts"
import {
  methoding,
  temperEsoGenerateColonMethod,
} from "akasha/commands/pages/temper/eso/generate/colon-method/temper-eso-generate-colon-method.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper eso generate colon-method",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const SAYING = ["--code-root", "/checkout", "--stage", "/stage", "--eso-root", "/lua"]

const UNRUN: Staging = () => {
  throw new Error("the staging ran, and this call is refused before anything is read")
}

test("the world reaches this where the dispatcher hands it, rather than the test seam", () => {
  const answers: Answering = temperEsoGenerateColonMethod

  expect(answers.length).toBe(2)
})

test("an argument this command does not take is refused rather than passed over", async () => {
  const said = await methoding(["--json"], GIVEN, UNRUN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--json` is no argument")
})

test("the Lua root said twice is refused rather than read as the first saying", async () => {
  const said = await methoding(["--eso-root", "/one", "--eso-root", "/two"], GIVEN, UNRUN)

  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("`--eso-root` is said twice")
})

test("what the call said reaches the work under the keys the argument pages name", async () => {
  const seen: string[] = []
  const staging: Staging = (_done, taken) => {
    seen.push(taken.codeRoot ?? "none", taken.stage ?? "none", taken.esoRoot ?? "none")
    return told([])
  }

  const said = await methoding(SAYING, GIVEN, staging)

  expect(seen).toEqual(["/checkout", "/stage", "/lua"])
  expect(said.code).toBe(0)
})

test("a staging that refused after writing names what it had written", async () => {
  const staging: Staging = (done) => {
    done.push("staged")
    return refused("the census would not render", DATA)
  }

  const said = await methoding([], GIVEN, staging)

  expect(said.refusals.at(-1)).toBe(
    "this stopped part way. What it had done by then is this: staged. Nothing after that ran."
  )
})
