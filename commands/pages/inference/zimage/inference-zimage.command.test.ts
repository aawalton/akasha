import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Staging } from "akasha/commands/pages/inference/zimage/inference-zimage.command.code.ts"
import {
  at,
  copiedSaid,
  inferenceZimage,
  readIn,
  scratchAt,
  stagedInto,
  stagedSaid,
} from "akasha/commands/pages/inference/zimage/inference-zimage.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha inference zimage", from: root, writer: null, agentId: null }
}

const FROM = "/elsewhere/one.safetensors"

const DEST = "/home/zimage/models/loras/abcd1234-one.safetensors"

const COPIED = copiedSaid(scratchAt(DEST))

const STAGED = stagedSaid("abcd1234-one.safetensors")

function staging(upTo: number): Staging {
  let reached = 0
  const step = (what: string): Promise<undefined> => {
    reached += 1
    if (reached > upTo) throw new OperationalError(`the disk would not ${what}`)
    return Promise.resolve(undefined)
  }
  return { copied: () => step("copy the checkpoint"), renamed: () => step("move the checkpoint") }
}

test("nothing said is refused, naming the flags it needs", async () => {
  const said = await inferenceZimage([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--prompt")
})

test("a word that is no flag is refused", async () => {
  expect((await inferenceZimage(["render"], given("/nowhere"))).code).toBe(1)
})

test("the prompt and the path it writes to are both named", () => {
  const said = readIn(["--prompt", "a cat"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--output")
})

test("a flag it does not take is refused", () => {
  const said = readIn(["--prompt", "a cat", "--output", "/elsewhere/a.png", "--wat", "1"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--wat")
})

test("the mflux defaults hold where nothing said them", () => {
  const said = readIn(["--prompt", "a cat", "--output", "/elsewhere/a.png"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) {
    expect(said.said.get("--width")).toBe("1024")
    expect(said.said.get("--height")).toBe("1024")
    expect(said.said.get("--lora-scales")).toBe("1.0")
    expect(said.said.get("--model")).toBe("z-image-turbo")
  }
})

test("a guidance that is no number is refused", () => {
  const said = readIn(["--prompt", "a cat", "--output", "/elsewhere/a.png", "--guidance", "loud"])
  expect("refused" in said).toBe(true)
})

test("a width that is no whole number is refused", () => {
  const said = readIn(["--prompt", "a", "--output", "/elsewhere/a.png", "--width", "10.5"])
  expect("refused" in said).toBe(true)
})

test("a model nothing registers is the caller's mistake", async () => {
  const said = await inferenceZimage(
    ["--prompt", "a cat", "--output", "/elsewhere/a.png", "--model", "nothing-here"],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nothing-here")
})

test("a comma list of checkpoints is refused", async () => {
  const said = await inferenceZimage(
    [
      "--prompt",
      "a cat",
      "--output",
      "/elsewhere/a.png",
      "--lora-paths",
      "/elsewhere/one.safetensors,/elsewhere/two.safetensors",
    ],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("comma")
})

test("a relative path is read against the root rather than the calling folder", () => {
  expect(at(given("/repo"), "out/a.png")).toBe("/repo/out/a.png")
  expect(at(given("/repo"), "/elsewhere/a.png")).toBe("/elsewhere/a.png")
})

test("the copy is named as soon as it lands and the staging again once it is moved", async () => {
  const done: string[] = []

  await stagedInto(FROM, DEST, staging(2), done)
  expect(done).toEqual([COPIED, STAGED])
})

test("a staging that threw part way names in its refusal the copy it had written", async () => {
  const held = await answering(async (done) => {
    await stagedInto(FROM, DEST, staging(1), done)
    return told(done)
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([COPIED])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(scratchAt(DEST))
  expect(last).not.toContain(STAGED)
})

test("a staging that threw before the copy landed names no file", async () => {
  const held = await answering(async (done) => {
    await stagedInto(FROM, DEST, staging(0), done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
