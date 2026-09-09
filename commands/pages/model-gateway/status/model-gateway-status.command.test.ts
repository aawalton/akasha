import { expect, test } from "bun:test"
import { driftOf, JSON_OUT, readIn, shortOf } from "./model-gateway-status.command.code.ts"
import { modelGatewayStatus } from "./model-gateway-status.command.ts"

function statusRefusals(argv: readonly string[]): readonly string[] {
  const said = readIn(argv)
  if ("refused" in said) return said.refused
  return []
}

test("a status is handed no seat to name", () => {
  expect(statusRefusals(["awen"]).join(" ")).toContain("every live seat")
})

test("a status takes the json flag", () => {
  const said = readIn([JSON_OUT])
  expect("refused" in said ? false : said.on.has(JSON_OUT)).toBe(true)
})

test("a flag a status does not take is refused by name", () => {
  expect(statusRefusals(["--fleet"]).join(" ")).toContain("--fleet")
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

test("a version is shortened, and a version that will not read is shown as a dash", () => {
  expect(shortOf("0123456789abcdef")).toBe("0123456789ab")
  expect(shortOf(null)).toBe("—")
  expect(shortOf("")).toBe("—")
})

test("the page says it writes nothing", () => {
  expect(modelGatewayStatus.changeKind).toBe("change-none")
})
