import { expect, test } from "bun:test"
import { InputError } from "@akasha/errors-core/exit-code"
import {
  itemActionValues,
  narrowItemAction,
  narrowMoveToDestination,
  narrowStockScope,
  parseBooleanFlag,
  parseConditionsJson,
  parseDestinationChainJson,
} from "./inventory-rule-flags.module.code.ts"

test("an action the rules package declares is taken", () => {
  expect(narrowItemAction("sell", "--action")).toBe("sell")
  expect(itemActionValues()).toContain("sell")
})

test("an action nobody declares is refused, naming the flag and what was said", () => {
  expect(() => narrowItemAction("burn", "--action")).toThrow(InputError)
  expect(() => narrowItemAction("burn", "--action")).toThrow(/--action: invalid action 'burn'/)
})

test("a stock scope is one of two, and a third is refused", () => {
  expect(narrowStockScope("any-character", "--stock-scope")).toBe("any-character")
  expect(() => narrowStockScope("any-companion", "--stock-scope")).toThrow(InputError)
})

test("an empty destination is refused and a said one is taken", () => {
  expect(narrowMoveToDestination("bank", "--destination")).toBe("bank")
  expect(() => narrowMoveToDestination("", "--destination")).toThrow(InputError)
})

test("a boolean flag takes true or false, unsaid reads as unsaid, and anything else is refused", () => {
  expect(parseBooleanFlag("true", "--active")).toBe(true)
  expect(parseBooleanFlag("false", "--active")).toBe(false)
  expect(parseBooleanFlag(undefined, "--active")).toBeUndefined()
  expect(() => parseBooleanFlag("yes", "--active")).toThrow(InputError)
})

test("conditions arrive as JSON and a key nobody declared is carried through", () => {
  const held = parseConditionsJson('{"maxQuality":3,"whatIsThis":"kept"}')
  expect(held?.maxQuality).toBe(3)
  expect((held as Record<string, unknown>).whatIsThis).toBe("kept")
})

test("conditions that do not parse are refused apart from conditions of the wrong shape", () => {
  expect(() => parseConditionsJson("{")).toThrow(/not valid JSON/)
  expect(() => parseConditionsJson('{"maxQuality":"three"}')).toThrow(InputError)
  expect(() => parseConditionsJson('{"maxQuality":"three"}')).not.toThrow(/not valid JSON/)
})

test("a destination chain is a list of tiers and an unsaid one reads as unsaid", () => {
  expect(parseDestinationChainJson(undefined)).toBeUndefined()
  const chain = parseDestinationChainJson('[{"destination":"bank","targetQuantity":5}]')
  expect(chain?.[0]?.destination).toBe("bank")
})

test("a tier carrying a key the chain does not declare is refused", () => {
  expect(() => parseDestinationChainJson('[{"destination":"bank","nope":1}]')).toThrow(InputError)
})
