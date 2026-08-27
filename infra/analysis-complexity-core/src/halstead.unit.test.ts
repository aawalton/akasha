import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { computeHalstead } from "./halstead"
import { walkFunctions } from "./walk-functions"

function halsteadOf(code: string) {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true)
  const fns = walkFunctions(sf)
  const fn = fns[0]
  if (fn === undefined || fns.length !== 1) {
    throw new Error(`expected 1 function, got ${fns.length}`)
  }
  return computeHalstead(fn.node)
}

describe("computeHalstead — η₁/η₂/N₁/N₂ + derived", () => {
  test("empty body: η₁=2 (braces), η₂=0, N₁=2, N₂=0", () => {
    const m = halsteadOf("function f() {}")
    expect(m.distinctOperators).toBe(2)
    expect(m.distinctOperands).toBe(0)
    expect(m.totalOperators).toBe(2)
    expect(m.totalOperands).toBe(0)
    expect(m.difficulty).toBe(0)
  })

  test("return one literal", () => {
    const m = halsteadOf("function f() { return 1; }")
    expect(m.distinctOperators).toBe(4)
    expect(m.distinctOperands).toBe(1)
    expect(m.totalOperators).toBe(4)
    expect(m.totalOperands).toBe(1)
    expect(m.vocabulary).toBe(5)
    expect(m.length).toBe(5)
    expect(m.volume).toBeCloseTo(5 * Math.log2(5), 5)
    expect(m.difficulty).toBeCloseTo(2, 5)
  })

  test("addition of two parameters", () => {
    const m = halsteadOf("function f(a: number, b: number) { return a + b; }")
    expect(m.distinctOperators).toBe(5)
    expect(m.distinctOperands).toBe(2)
    expect(m.totalOperators).toBe(5)
    expect(m.totalOperands).toBe(2)
  })

  test("repeated identifier and operator increment totals only", () => {
    const m = halsteadOf("function f(a: number, b: number) { return a + a + b; }")
    expect(m.distinctOperators).toBe(5)
    expect(m.distinctOperands).toBe(2)
    expect(m.totalOperators).toBe(6)
    expect(m.totalOperands).toBe(3)
  })

  test("type annotations are excluded", () => {
    const m = halsteadOf("function f(): number { return 1; }")
    expect(m.distinctOperators).toBe(4)
    expect(m.distinctOperands).toBe(1)
    expect(m.totalOperators).toBe(4)
    expect(m.totalOperands).toBe(1)
  })

  test("comments are excluded", () => {
    const m = halsteadOf("function f() { /* hi */ return 1; // tail\n}")
    expect(m.distinctOperators).toBe(4)
    expect(m.distinctOperands).toBe(1)
    expect(m.totalOperators).toBe(4)
    expect(m.totalOperands).toBe(1)
  })

  test("derived metrics composition: V/D/E/T/B agree with formulas", () => {
    const m = halsteadOf("function f(a: number, b: number) { return a + b; }")
    const eta = m.distinctOperators + m.distinctOperands
    const N = m.totalOperators + m.totalOperands
    const V = N * Math.log2(eta)
    const D = (m.distinctOperators / 2) * (m.totalOperands / m.distinctOperands)
    expect(m.vocabulary).toBe(eta)
    expect(m.length).toBe(N)
    expect(m.volume).toBeCloseTo(V, 5)
    expect(m.difficulty).toBeCloseTo(D, 5)
    expect(m.effort).toBeCloseTo(D * V, 5)
    expect(m.time).toBeCloseTo((D * V) / 18, 5)
    expect(m.bugs).toBeCloseTo(V / 3000, 5)
  })
})
