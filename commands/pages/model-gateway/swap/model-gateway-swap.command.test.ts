import { expect, test } from "bun:test"
import { FLEET, JSON_OUT, readIn } from "./model-gateway-swap.command.code.ts"
import { modelGatewaySwap } from "./model-gateway-swap.command.ts"

function swapRefused(argv: readonly string[]): string {
  const said = readIn(argv)
  if (!("refused" in said)) return ""
  return said.refused.join(" ")
}

test("a swap naming neither a seat nor the fleet is refused", () => {
  expect(swapRefused([])).toContain(FLEET)
})

test("a swap naming a seat and the fleet together is refused", () => {
  expect(swapRefused(["awen", FLEET])).toContain("names one")
})

test("a swap naming two seats is refused", () => {
  expect(swapRefused(["awen", "athena"])).toContain("one swap names one seat")
})

test("a flag a swap does not take is refused by name", () => {
  expect(swapRefused(["awen", "--paths"])).toContain("--paths")
})

test("a seat named alone is read as the seat said", () => {
  const said = readIn(["awen"])
  expect("refused" in said ? null : said.target).toBe("awen")
})

test("the fleet flag and the json flag are read together", () => {
  const said = readIn([FLEET, JSON_OUT])
  expect("refused" in said ? false : said.on.has(JSON_OUT)).toBe(true)
})

test("the page says the swap is mechanical", () => {
  expect(modelGatewaySwap.changeKind).toBe("change-mechanical")
})
