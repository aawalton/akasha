import { expect, test } from "bun:test"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { at, readIn, wan } from "./wan.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha wan", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the acts it carries", async () => {
  const said = await wan([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("generate")
  expect(said.refusals[0]).toContain("score")
})

test("an act it does not carry is refused", async () => {
  expect((await wan(["render"], given("/nowhere"))).code).toBe(1)
})

test("a flag one act takes is refused under another", () => {
  const said = readIn(["frames", "--video", "clip.mp4", "--lightning"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--lightning")
})

test("a flag carrying no value is refused rather than read as said", () => {
  const said = readIn(["frames", "--video"])
  expect("refused" in said).toBe(true)
})

test("a word standing where a flag should be is refused", () => {
  const said = readIn(["frames", "clip.mp4"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("no flag")
})

test("a flag said twice is refused rather than the last winning", () => {
  const said = readIn(["frames", "--video", "one.mp4", "--video", "two.mp4"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("more than once")
})

test("an act missing what it names is refused", () => {
  const said = readIn(["score", "--reference", "ref.png"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--frames-dir")
})

test("a whole number flag carrying something else is refused", () => {
  const said = readIn(["frames", "--video", "clip.mp4", "--fps", "four"])
  expect("refused" in said).toBe(true)
})

test("the defaults an act carries stand where nothing said them", () => {
  const said = readIn(["score", "--frames-dir", "f", "--reference", "r.png"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) expect(said.said.get("--floor")).toBe("0.45")
})

test("a switch is held apart from a flag carrying a value", () => {
  const said = readIn(["generate", "--prompt", "walk", "--lightning"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) {
    expect(said.on.has("--lightning")).toBe(true)
    expect(said.said.get("--prompt")).toBe("walk")
  }
})

test("a generate naming neither conditioning image is the caller's mistake", async () => {
  const said = await wan(["generate", "--prompt", "walk"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--start-image")
})

test("a direction that is neither way is refused", async () => {
  const said = await wan(
    ["extend", "--context", "c.mp4", "--direction", "sideways", "--prompt", "walk"],
    given("/nowhere")
  )
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("forward")
})

test("a frames act naming a clip that is not there answers against the data", async () => {
  const said = await wan(["frames", "--video", "/nowhere/none.mp4"], given("/nowhere"))
  expect(said.code).toBe(2)
})

test("a relative path is read against the root rather than the calling folder", () => {
  expect(at(given("/repo"), "clips/one.mp4")).toBe("/repo/clips/one.mp4")
  expect(at(given("/repo"), "/var/tmp/one.mp4")).toBe("/var/tmp/one.mp4")
})
