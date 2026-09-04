import { expect, test } from "bun:test"
import type { Given } from "../../calling/calling.module.code.ts"
import { devServer, readIn } from "./dev-server.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha dev-server", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the acts it carries", async () => {
  const said = await devServer([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("bootstrap")
  expect(said.refusals[0]).toContain("status")
})

test("an act it does not carry is refused", async () => {
  const said = await devServer(["sleep"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("sleep")
})

test("a flag it does not take is refused", async () => {
  const said = await devServer(["status", "--wat"], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--wat")
})

test("a status naming neither seq nor app is read rather than refused", () => {
  const read = readIn(["status"])
  expect("refused" in read).toBe(false)
})

test("a start naming no app is refused", () => {
  const read = readIn(["start", "--seq", "8485"])
  expect("refused" in read).toBe(true)
})

test("a seq said as a word stands where the flag would", () => {
  const read = readIn(["start", "8485", "--app", "alanwalton"])
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.seq).toBe(8485)
  expect(read.app).toBe("alanwalton")
})

test("a seq said twice, once as a word and once as a flag, is refused", () => {
  const read = readIn(["start", "8485", "--seq", "8486", "--app", "alanwalton"])
  expect("refused" in read).toBe(true)
})

test("a seq that is no whole number is refused", () => {
  const read = readIn(["start", "eight", "--app", "alanwalton"])
  expect("refused" in read).toBe(true)
})

test("a stop naming both every server and one server is refused", () => {
  const read = readIn(["stop", "--all", "--seq", "8485", "--app", "alanwalton"])
  expect("refused" in read).toBe(true)
})

test("a stop naming neither every server nor one server is refused", () => {
  const read = readIn(["stop"])
  expect("refused" in read).toBe(true)
})

test("a stop naming every server is read", () => {
  const read = readIn(["stop", "--all"])
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.all).toBe(true)
})

test("`--all` is taken by a stop alone", () => {
  expect("refused" in readIn(["start", "8485", "--app", "alanwalton", "--all"])).toBe(true)
  expect("refused" in readIn(["status", "--all"])).toBe(true)
})

test("`--force` is taken by a bootstrap alone", () => {
  expect("refused" in readIn(["bootstrap", "1", "--app", "alanwalton", "--force"])).toBe(false)
  expect("refused" in readIn(["start", "1", "--app", "alanwalton", "--force"])).toBe(true)
})

test("a tail of nothing is refused, where a tail unsaid is a hundred lines", () => {
  expect("refused" in readIn(["logs", "1", "--app", "alanwalton", "--tail", "0"])).toBe(true)
  const read = readIn(["logs", "1", "--app", "alanwalton"])
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.tail).toBe(100)
})

test("a valued flag naming no value is refused", () => {
  expect("refused" in readIn(["logs", "--app"])).toBe(true)
})

test("a log no file stands for is a data refusal", async () => {
  const said = await devServer(["logs", "999999999", "--app", "alanwalton"], given("/nowhere"))
  expect(said.code).toBe(2)
})
