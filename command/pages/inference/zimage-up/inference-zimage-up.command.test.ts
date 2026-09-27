import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  inferenceZimageUp,
  type Running,
  upped,
} from "akasha/command/pages/inference/zimage-up/inference-zimage-up.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference zimage-up",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

function answeringWith(code: number, lines: readonly string[], handed: string[][]): Running {
  return (argv) => {
    handed.push([...argv])
    return Promise.resolve({ code, lines })
  }
}

test("a flag is refused, because this takes none", async () => {
  const said = await inferenceZimageUp(["--nonsense"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--nonsense")
})

test("a word is refused, because this takes none", async () => {
  const said = await inferenceZimageUp(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})

test("the script is run by bash, named by its path alone", async () => {
  const handed: string[][] = []
  await upped("/at/zimage-up.sh", answeringWith(0, [], handed))
  expect(handed).toEqual([["bash", "/at/zimage-up.sh"]])
})

test("a script ending at zero is told with every line the script wrote", async () => {
  const lines = ["==> zimage already running. ComfyUI: http://localhost:8678"]
  const said = await upped("/at/zimage-up.sh", answeringWith(0, lines, []))
  expect(said.code).toBe(0)
  expect(said.refusals).toEqual([])
})

test("a script ending at anything but zero is refused with every line the script wrote", async () => {
  const lines = ["ERROR: podman not found on PATH."]
  const said = await upped("/at/zimage-up.sh", answeringWith(1, lines, []))
  expect(said.code).not.toBe(0)
  expect(said.refusals[0]).toContain("ended at 1")
  expect(said.refusals).toContain("ERROR: podman not found on PATH.")
})
