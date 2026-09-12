import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { answering, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type {
  Made,
  Putting,
} from "akasha/commands/pages/inference/segment/inference-segment.command.code.ts"
import {
  inferenceSegment,
  wroteEach,
} from "akasha/commands/pages/inference/segment/inference-segment.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha inference segment",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const MATTE = "wrote 4 bytes (alpha matte) to /nowhere/one.png"

const CUTOUT = "wrote 8 bytes (cutout) to /nowhere/one-cutout.png"

const FLAT = "wrote 12 bytes (flattened to #ffffff) to /nowhere/one-flat.png"

const EVERY: readonly [Made, ...Made[]] = [
  { output: "matte", path: "/nowhere/one.png", what: "alpha matte" },
  { output: "cutout", path: "/nowhere/one-cutout.png", what: "cutout" },
  {
    output: "flatten",
    path: "/nowhere/one-flat.png",
    what: "flattened to #ffffff",
    bgColor: "#ffffff",
  },
]

function putting(upTo: number): Putting {
  let reached = 0
  return async (made) => {
    reached += 1
    if (reached > upTo)
      throw new OperationalError(`the pool dropped the call for the ${made.output}`)
    return new Uint8Array(reached * 4)
  }
}

test("naming no image is refused", async () => {
  const said = await inferenceSegment([], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("names the image matted")
})

test("each file is named as soon as that file reaches the disk", async () => {
  const done: string[] = []
  await wroteEach(EVERY, putting(3), done)
  expect(done).toEqual([MATTE, CUTOUT, FLAT])
})

test("a call that threw part way names in its refusal each file it had written", async () => {
  const held = await answering(async (done) => {
    await wroteEach(EVERY, putting(2), done)
    return told(done)
  })
  expect(held.code).toBe(3)
  expect(held.report).toEqual([MATTE, CUTOUT])
  expect(held.refusals[0]).toBe("the pool dropped the call for the flatten")
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(MATTE)
  expect(last).toContain(CUTOUT)
  expect(last).not.toContain(FLAT)
})

test("a call that threw before the matte reached the disk names no file", async () => {
  const held = await answering(async (done) => {
    await wroteEach(EVERY, putting(0), done)
    return told(done)
  })
  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
