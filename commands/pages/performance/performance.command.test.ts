import { expect, test } from "bun:test"
import { readIn } from "./performance.command.code.ts"

const THERE: readonly string[] = ["landing-throughput"]

const said = (argv: readonly string[]): string => JSON.stringify(readIn(argv, THERE))

test("a call naming one performance there reads that performance", () => {
  expect(readIn(["landing-throughput"], THERE)).toEqual({ slug: "landing-throughput" })
})

test("a call naming no performance is refused with every performance there is", () => {
  expect(said([])).toContain("this names no performance")
  expect(said([])).toContain("landing-throughput")
})

test("a second performance is refused, because one call runs one", () => {
  expect(said(["landing-throughput", "another"])).toContain("one call runs one performance")
})

test("a word naming no performance is refused", () => {
  expect(said(["nowhere"])).toContain("is no performance")
})

test("a flag is refused", () => {
  expect(said(["--json"])).toContain("is no flag this takes")
})
