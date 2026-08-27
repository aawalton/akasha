import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { computeCyclomaticComplexity } from "./cyclomatic"
import { walkFunctions } from "./walk-functions"

function ccOf(code: string): number {
  const sf = ts.createSourceFile("t.ts", code, ts.ScriptTarget.Latest, true)
  const fns = walkFunctions(sf)
  const fn = fns[0]
  if (fn === undefined || fns.length !== 1) {
    throw new Error(`expected 1 function, got ${fns.length}`)
  }
  return computeCyclomaticComplexity(fn.node)
}

describe("computeCyclomaticComplexity — McCabe decision-point count", () => {
  test("straight-line body: CC = 1", () => {
    expect(ccOf("function f() { return 1; }")).toBe(1)
  })

  test("one if: CC = 2", () => {
    expect(ccOf("function f(x: number) { if (x > 0) return 1; return 0; }")).toBe(2)
  })

  test("if/else: CC = 2 (else doesn't count)", () => {
    expect(ccOf("function f(x: number) { if (x > 0) return 1; else return 0; }")).toBe(2)
  })

  test("if/else-if/else: CC = 3 (two ifs)", () => {
    expect(
      ccOf(
        "function f(x: number) { if (x > 0) return 1; else if (x < 0) return -1; else return 0; }"
      )
    ).toBe(3)
  })

  test("for loop: CC = 2", () => {
    expect(ccOf("function f() { for (let i = 0; i < 3; i++) { } }")).toBe(2)
  })

  test("for...of: CC = 2", () => {
    expect(ccOf("function f(xs: number[]) { for (const x of xs) { void x; } }")).toBe(2)
  })

  test("while loop: CC = 2", () => {
    expect(ccOf("function f() { while (true) { break; } }")).toBe(2)
  })

  test("do...while: CC = 2", () => {
    expect(ccOf("function f() { do { break; } while (true); }")).toBe(2)
  })

  test("switch with two cases (no default): CC = 3", () => {
    expect(
      ccOf("function f(x: number) { switch (x) { case 1: return 1; case 2: return 2; } return 0; }")
    ).toBe(3)
  })

  test("switch with two cases + default: CC = 3 (default doesn't count)", () => {
    expect(
      ccOf(
        "function f(x: number) { switch (x) { case 1: return 1; case 2: return 2; default: return 0; } }"
      )
    ).toBe(3)
  })

  test("try/catch: CC = 2", () => {
    expect(ccOf("function f() { try { return 1; } catch { return 0; } }")).toBe(2)
  })

  test("try/catch/finally: CC = 2 (finally doesn't count)", () => {
    expect(ccOf("function f() { try { return 1; } catch { return 0; } finally { } }")).toBe(2)
  })

  test("ternary: CC = 2", () => {
    expect(ccOf("function f(x: number) { return x > 0 ? 1 : 0; }")).toBe(2)
  })

  test("logical && counts: CC = 2", () => {
    expect(ccOf("function f(a: boolean, b: boolean) { return a && b; }")).toBe(2)
  })

  test("logical || counts: CC = 2", () => {
    expect(ccOf("function f(a: boolean, b: boolean) { return a || b; }")).toBe(2)
  })

  test("nullish ?? counts: CC = 2", () => {
    expect(ccOf("function f(a: number | null) { return a ?? 0; }")).toBe(2)
  })

  test("optional chain ?. counts: CC = 2", () => {
    expect(ccOf("function f(a: { b?: number } | null) { return a?.b; }")).toBe(2)
  })

  test("compound: 2 ifs + 1 ternary + 1 && + 1 for = CC = 6", () => {
    const src =
      "function f(x: number, y: number) {\n" +
      "  if (x > 0) {\n" +
      "    for (let i = 0; i < x; i++) { void i; }\n" +
      "  }\n" +
      "  if (y > 0 && x > 0) {\n" +
      "    return x > y ? x : y;\n" +
      "  }\n" +
      "  return 0;\n" +
      "}"
    expect(ccOf(src)).toBe(6)
  })

  test("nested function does NOT inflate outer CC", () => {
    const src =
      "function outer() {\n" +
      "  function inner(x: number) {\n" +
      "    if (x > 0) return 1;\n" +
      "    return 0;\n" +
      "  }\n" +
      "  return inner(0);\n" +
      "}"
    const sf = ts.createSourceFile("t.ts", src, ts.ScriptTarget.Latest, true)
    const fns = walkFunctions(sf)
    const outer = fns.find((f) => f.name === "outer")
    const inner = fns.find((f) => f.name === "inner")
    if (!outer || !inner) throw new Error("missing outer/inner in walk")
    expect(computeCyclomaticComplexity(outer.node)).toBe(1)
    expect(computeCyclomaticComplexity(inner.node)).toBe(2)
  })
})
