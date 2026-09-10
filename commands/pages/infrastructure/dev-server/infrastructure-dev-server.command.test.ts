import { expect, test } from "bun:test"
import { join } from "node:path"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { infrastructureDevServer, readIn } from "./infrastructure-dev-server.command.code.ts"

const root = join(import.meta.dir, "..", "..", "..", "..")

function given(): Given {
  return {
    root,
    calledAs: "akasha infrastructure dev-server",
    from: root,
    writer: null,
    agentId: null,
  }
}

test("nothing said is refused, naming the acts it carries", async () => {
  const said = await infrastructureDevServer([], given())
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("bootstrap")
  expect(said.refusals[0]).toContain("status")
})

test("an act it does not carry is refused", async () => {
  const said = await infrastructureDevServer(["sleep"], given())
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("sleep")
})

test("a flag it does not take is refused", async () => {
  const said = await infrastructureDevServer(["status", "--wat"], given())
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--wat")
})

test("a status naming neither seq nor app is read rather than refused", () => {
  const read = readIn(["status"], root)
  expect("refused" in read).toBe(false)
})

test("a start naming no app is refused, naming the apps the pages carry", () => {
  const read = readIn(["start", "--seq", "8485"], root)
  expect("refused" in read).toBe(true)
  if (!("refused" in read)) return
  expect(read.refused.join(" ")).toContain("smilingjenny-web")
})

test("a seq said as a word stands where the flag would", () => {
  const read = readIn(["start", "8485", "--app", "alanwalton-web"], root)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.seq).toBe(8485)
  expect(read.app).toBe("alanwalton-web")
})

test("a seq said twice, once as a word and once as a flag, is refused", () => {
  const read = readIn(["start", "8485", "--seq", "8486", "--app", "alanwalton-web"], root)
  expect("refused" in read).toBe(true)
})

test("a seq that is no whole number is refused", () => {
  const read = readIn(["start", "eight", "--app", "alanwalton-web"], root)
  expect("refused" in read).toBe(true)
})

test("a stop naming both every server and one server is refused", () => {
  const read = readIn(["stop", "--all", "--seq", "8485", "--app", "alanwalton-web"], root)
  expect("refused" in read).toBe(true)
})

test("a stop naming neither every server nor one server is refused", () => {
  const read = readIn(["stop"], root)
  expect("refused" in read).toBe(true)
})

test("a stop naming every server is read", () => {
  const read = readIn(["stop", "--all"], root)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.all).toBe(true)
})

test("`--all` is taken by a stop alone", () => {
  expect("refused" in readIn(["start", "8485", "--app", "alanwalton-web", "--all"], root)).toBe(
    true
  )
  expect("refused" in readIn(["status", "--all"], root)).toBe(true)
})

test("`--force` is taken by a bootstrap alone", () => {
  expect("refused" in readIn(["bootstrap", "1", "--app", "alanwalton-web", "--force"], root)).toBe(
    false
  )
  expect("refused" in readIn(["start", "1", "--app", "alanwalton-web", "--force"], root)).toBe(true)
})

test("a tail of nothing is refused, where a tail unsaid is a hundred lines", () => {
  expect("refused" in readIn(["logs", "1", "--app", "alanwalton-web", "--tail", "0"], root)).toBe(
    true
  )
  const read = readIn(["logs", "1", "--app", "alanwalton-web"], root)
  expect("refused" in read).toBe(false)
  if ("refused" in read) return
  expect(read.tail).toBe(100)
})

test("a valued flag naming no value is refused", () => {
  expect("refused" in readIn(["logs", "--app"], root)).toBe(true)
})

test("a log no file stands for is a data refusal", async () => {
  const said = await infrastructureDevServer(
    ["logs", "999999999", "--app", "alanwalton-web"],
    given()
  )
  expect(said.code).toBe(2)
})

test("every web app page is an app the command takes", async () => {
  const said = await infrastructureDevServer(["start", "--seq", "8485"], given())
  const named = said.refusals.join(" ")
  for (const one of [
    "alanwalton-web",
    "alanwalton-atlas-web",
    "archive-of-worlds-web",
    "audhdalan-web",
    "smilingjenny-web",
    "temper-web",
  ]) {
    expect(named).toContain(one)
  }
})

test("a web app stating no base port is named and refused with why", async () => {
  const said = await infrastructureDevServer(
    ["logs", "999999999", "--app", "smilingjenny-web"],
    given()
  )
  expect(said.refusals.join(" ")).toContain("base port")
})
