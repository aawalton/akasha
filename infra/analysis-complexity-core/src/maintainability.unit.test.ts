import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { computeMaintainabilityIndex, countSloc } from "./maintainability"

function parse(code: string): ts.SourceFile {
  return ts.createSourceFile("test.ts", code, ts.ScriptTarget.Latest, true)
}

describe("countSloc — non-blank, non-comment lines", () => {
  test("empty file → 0", () => {
    expect(countSloc(parse(""))).toBe(0)
  })

  test("single statement → 1", () => {
    expect(countSloc(parse("const x = 1;\n"))).toBe(1)
  })

  test("blank lines excluded", () => {
    expect(countSloc(parse("const x = 1;\n\n\nconst y = 2;\n"))).toBe(2)
  })

  test("single-line comments excluded", () => {
    expect(countSloc(parse("// note\nconst x = 1;\n"))).toBe(1)
  })

  test("block comments excluded", () => {
    expect(countSloc(parse("/* hi */\n/* multi\n line\n */\nconst x = 1;\n"))).toBe(1)
  })

  test("trailing-comment line still counts", () => {
    expect(countSloc(parse("const x = 1; // trailing\n"))).toBe(1)
  })
})

describe("computeMaintainabilityIndex — VS variant", () => {
  test("empty file → MI = 100, all sums zero", () => {
    const m = computeMaintainabilityIndex(parse(""))
    expect(m.mi).toBe(100)
    expect(m.volumeSum).toBe(0)
    expect(m.ccSum).toBe(0)
    expect(m.sloc).toBe(0)
  })

  test("declarations only (no functions) → MI = 100", () => {
    const m = computeMaintainabilityIndex(parse("export const x = 1;\nexport type T = string;\n"))
    expect(m.mi).toBe(100)
    expect(m.volumeSum).toBe(0)
    expect(m.ccSum).toBe(0)
    expect(m.sloc).toBe(2)
  })

  test("MI is in [0, 100] for a real function", () => {
    const m = computeMaintainabilityIndex(
      parse("function f(a: number, b: number) { return a + b; }\n")
    )
    expect(m.mi).toBeGreaterThanOrEqual(0)
    expect(m.mi).toBeLessThanOrEqual(100)
    expect(m.ccSum).toBe(1)
    expect(m.volumeSum).toBeGreaterThan(0)
  })

  test("MI agrees with the published formula on a known sample", () => {
    const src = "function f(a: number, b: number) { if (a > b) return a; return b; }\n"
    const m = computeMaintainabilityIndex(parse(src))
    expect(m.ccSum).toBe(2)
    expect(m.sloc).toBe(1)
    const V = m.volumeSum
    const G = m.ccSum
    const L = m.sloc
    const expectedMi = Math.max(
      0,
      (100 * (171 - 5.2 * Math.log(V) - 0.23 * G - 16.2 * Math.log(L))) / 171
    )
    expect(m.mi).toBeCloseTo(expectedMi, 5)
  })

  test("MI is clamped at 0 (not negative) for very dense code", () => {
    const lines: string[] = []
    for (let i = 0; i < 5000; i++) {
      lines.push(`function f${i}(a: number) { if (a > 0 && a < 100) return a + ${i}; return 0; }`)
    }
    const m = computeMaintainabilityIndex(parse(`${lines.join("\n")}\n`))
    expect(m.mi).toBeGreaterThanOrEqual(0)
  })
})
