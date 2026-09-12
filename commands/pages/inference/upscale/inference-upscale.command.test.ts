import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceUpscale } from "akasha/commands/pages/inference/upscale/inference-upscale.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference upscale",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("naming neither the image nor the resolution is refused", async () => {
  const said = await inferenceUpscale([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals.join(" ")).toContain("--resolution")
})

test("a GPU that is neither the cluster nor the workstation is refused", async () => {
  const said = await inferenceUpscale(
    ["--image", "a.png", "--resolution", "100", "--host", "moon"],
    GIVEN
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("moon")
})

test("a resolution at zero is refused", async () => {
  const said = await inferenceUpscale(["--image", "a.png", "--resolution", "0"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("above zero")
})

test("a resolution that is no whole number is refused", async () => {
  const said = await inferenceUpscale(["--image", "a.png", "--resolution", "big"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("big")
})

test("a second image word is refused", async () => {
  const said = await inferenceUpscale(["a.png", "b.png", "--resolution", "100"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("b.png")
})

test("a flag this does not take is refused", async () => {
  const said = await inferenceUpscale(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})
