import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  configOf,
  inferenceEdit,
  refsIn,
} from "akasha/commands/pages/inference/edit/inference-edit.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference edit",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a comma list of references is parted and trimmed", () => {
  expect(refsIn(" a.png , b.png ,, ")).toEqual(["a.png", "b.png"])
  expect(refsIn(undefined)).toEqual([])
})

test("a config nothing narrowed is left off the call", () => {
  expect(configOf(undefined, undefined)).toBeUndefined()
  expect(configOf("16:9", undefined)).toEqual({ aspectRatio: "16:9" })
})

test("naming neither an image nor a prompt is refused for both", async () => {
  const said = await inferenceEdit([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals).toEqual([
    "`akasha inference edit` takes `--image`, and nothing said it",
    "`akasha inference edit` takes `--prompt-file` or `--prompt`, and nothing said either",
  ])
})

test("a value said at the flag with an equals sign is taken", async () => {
  const said = await inferenceEdit(["--image=a.png", "--prompt=x", "--aspect-ratio=7:7"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`7:7` is none of them")
})

test("a ratio the engine does not take is refused", async () => {
  const said = await inferenceEdit(
    ["--image", "a.png", "--prompt", "x", "--aspect-ratio", "7:7"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`7:7` is none of them")
})

test("a size the engine does not take is refused", async () => {
  const said = await inferenceEdit(["--image", "a.png", "--prompt", "x", "--size", "9K"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`9K` is none of them")
})

test("an engine this does not go through is refused", async () => {
  const said = await inferenceEdit(
    ["--image", "a.png", "--prompt", "x", "--engine", "other"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`other` is none of them")
})

test("a flag this takes none of is refused, and the flags it takes are named", async () => {
  const said = await inferenceEdit(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
  expect(said.refusals[0]).toContain("--aspect-ratio")
})
