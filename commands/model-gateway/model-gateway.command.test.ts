import { expect, test } from "bun:test"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { driftOf, modelGateway, readIn, shortOf } from "./model-gateway.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha model-gateway", from: root, writer: null, agentId: null }
}

test("nothing said is refused, naming the acts it carries", async () => {
  const said = await modelGateway([], given("/nowhere"))
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("status")
  expect(said.refusals[0]).toContain("swap")
})

test("an act it does not carry is refused", async () => {
  expect((await modelGateway(["restart"], given("/nowhere"))).code).toBe(1)
})

test("a swap naming neither a seat nor the fleet is refused", () => {
  const said = readIn(["swap"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--fleet")
})

test("a swap naming a seat and the fleet both is refused", () => {
  const said = readIn(["swap", "awen", "--fleet"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--fleet")
})

test("a swap naming two seats is refused", () => {
  const said = readIn(["swap", "awen", "athena"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("one swap names one seat")
})

test("a status is given no seat to name", () => {
  const said = readIn(["status", "awen"])
  expect("refused" in said).toBe(true)
})

test("a status takes the json flag", () => {
  const said = readIn(["status", "--json"])
  expect("refused" in said).toBe(false)
  if (!("refused" in said)) expect(said.on.has("--json")).toBe(true)
})

test("a flag the act does not take is refused", () => {
  const said = readIn(["status", "--fleet"])
  expect("refused" in said).toBe(true)
  if ("refused" in said) expect(said.refused[0]).toContain("--fleet")
})

test("a seat holding the version the tree holds is current", () => {
  expect(driftOf("abc", "abc")).toBe("current")
})

test("a seat holding another version than the tree is lagging", () => {
  expect(driftOf("abc", "def")).toBe("lagging")
})

test("a version either side does not answer is unknown", () => {
  expect(driftOf(null, "def")).toBe("unknown")
  expect(driftOf("abc", null)).toBe("unknown")
})

test("a version is shortened, and no version is shown as a dash", () => {
  expect(shortOf("0123456789abcdef")).toBe("0123456789ab")
  expect(shortOf(null)).toBe("—")
  expect(shortOf("")).toBe("—")
})
