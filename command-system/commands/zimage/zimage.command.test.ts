import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { at, readIn, zimage } from "./zimage.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha zimage", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the act it carries", async () => {
  const said = await zimage([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("generate")
})

test("an act it does not carry is refused", async () => {
  expect((await zimage(["render"], given("/nowhere"))).code).toBe(1)
})

test("the prompt and the path it writes to are both named", () => {
  const said = readIn(["generate", "--prompt", "a cat"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--output")
})

test("a flag it does not take is refused", () => {
  const said = readIn(["generate", "--prompt", "a cat", "--output", "/var/tmp/a.png", "--wat", "1"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--wat")
})

test("the mflux defaults stand where nothing said them", () => {
  const said = readIn(["generate", "--prompt", "a cat", "--output", "/var/tmp/a.png"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) {
    expect(said.said.get("--width")).toBe("1024")
    expect(said.said.get("--height")).toBe("1024")
    expect(said.said.get("--lora-scales")).toBe("1.0")
    expect(said.said.get("--model")).toBe("z-image-turbo")
  }
})

test("a guidance that is no number is refused", () => {
  const said = readIn([
    "generate",
    "--prompt",
    "a cat",
    "--output",
    "/var/tmp/a.png",
    "--guidance",
    "loud",
  ])
  expect("refused" in said).toBe(true)
})

test("a width that is no whole number is refused", () => {
  const said = readIn([
    "generate",
    "--prompt",
    "a",
    "--output",
    "/var/tmp/a.png",
    "--width",
    "10.5",
  ])
  expect("refused" in said).toBe(true)
})

test("a model nothing registers is the caller's mistake", async () => {
  const said = await zimage(
    ["generate", "--prompt", "a cat", "--output", "/var/tmp/a.png", "--model", "nothing-here"],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("nothing-here")
})

test("a comma list of checkpoints is refused", async () => {
  const said = await zimage(
    [
      "generate",
      "--prompt",
      "a cat",
      "--output",
      "/var/tmp/a.png",
      "--lora-paths",
      "/var/tmp/one.safetensors,/var/tmp/two.safetensors",
    ],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("comma")
})

test("a relative path is read against the root rather than the calling folder", () => {
  expect(at(given("/repo"), "out/a.png")).toBe("/repo/out/a.png")
  expect(at(given("/repo"), "/var/tmp/a.png")).toBe("/var/tmp/a.png")
})
