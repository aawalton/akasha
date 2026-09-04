import { expect, test } from "bun:test"
import { TIER_ORDER } from "../surplus-fall-tier/surplus-fall-tier.module.code.ts"
import {
  fallBody,
  isWorse,
  SOURCE_PREFIX,
  sourceFor,
  tierInSource,
} from "./surplus-fall-ticking.module.code.ts"

test("every tier round-trips through the source it is written into", () => {
  for (const tier of TIER_ORDER) {
    expect(tierInSource(sourceFor(tier))).toBe(tier)
  }
})

test("the source names the kind, so a reader can tell it from another notification's", () => {
  expect(sourceFor("red")).toBe(`${SOURCE_PREFIX}red`)
})

test("a source from before the tier was written into it reads as no tier", () => {
  expect(tierInSource("readouts")).toBeNull()
})

test("a missing or non-text source reads as no tier rather than throwing", () => {
  expect(tierInSource(null)).toBeNull()
  expect(tierInSource(undefined)).toBeNull()
  expect(tierInSource(7)).toBeNull()
})

test("a source naming something that is no tier reads as no tier", () => {
  expect(tierInSource(`${SOURCE_PREFIX}purple`)).toBeNull()
  expect(tierInSource(`${SOURCE_PREFIX}`)).toBeNull()
})

test("worse is nearer black", () => {
  expect(isWorse("black", "red")).toBe(true)
  expect(isWorse("red", "blue")).toBe(true)
  expect(isWorse("blue", "red")).toBe(false)
  expect(isWorse("red", "red")).toBe(false)
})

test("the body names the readout and the rung it reached", () => {
  expect(fallBody("Surplus", "red")).toBe("Surplus has fallen to red.")
})
