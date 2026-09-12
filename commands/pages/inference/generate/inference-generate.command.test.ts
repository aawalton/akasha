import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  generates,
  inferenceGenerate,
} from "akasha/commands/pages/inference/generate/inference-generate.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference generate",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a service binding no image-generation model type renders nothing", () => {
  expect(generates(["--model-type", "image-generation"])).toBe(true)
  expect(generates(["--model-type", "speech"])).toBe(false)
  expect(generates([])).toBe(false)
})

test("naming no prompt either way is refused", async () => {
  const said = await inferenceGenerate([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe(
    "`akasha inference generate` takes `--prompt-file` or `--prompt`, and nothing said either"
  )
})

test("a value said at the flag with an equals sign is taken", async () => {
  const said = await inferenceGenerate(["--prompt=x", "--guidance=soft"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`soft` is not one")
})

test("steps outside the range the sampler runs is refused", async () => {
  const said = await inferenceGenerate(["--prompt", "x", "--steps", "99"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("99 is outside it")
})

test("a service no pool holds is refused", async () => {
  const said = await inferenceGenerate(["--prompt", "x", "--service", "nowhere"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`nowhere` is none of them")
})

test("guidance that is no number is refused", async () => {
  const said = await inferenceGenerate(["--prompt", "x", "--guidance", "soft"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`soft` is not one")
})

test("a flag this takes none of is refused, and the flags it takes are named", async () => {
  const said = await inferenceGenerate(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
  expect(said.refusals[0]).toContain("--guidance")
})
