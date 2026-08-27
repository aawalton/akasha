import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { walkFunctions } from "./walk-functions"

function parse(code: string): ts.SourceFile {
  return ts.createSourceFile("test.ts", code, ts.ScriptTarget.Latest, true)
}

describe("walkFunctions — function-bearing node coverage", () => {
  test("yields a top-level function declaration with its name", () => {
    const sf = parse("function foo() {}\n")
    const fns = walkFunctions(sf)
    expect(fns.length).toBe(1)
    expect(fns[0]?.name).toBe("foo")
    expect(fns[0]?.line).toBe(1)
  })

  test("yields an arrow function bound to a const", () => {
    const sf = parse("const greet = (n: string) => n;\n")
    const fns = walkFunctions(sf)
    expect(fns.length).toBe(1)
    expect(fns[0]?.name).toBe("greet")
  })

  test("yields a function expression bound to a let", () => {
    const sf = parse("let f = function inner() { return 1; };\n")
    const fns = walkFunctions(sf)
    expect(fns.length).toBe(1)
    expect(fns[0]?.name).toBe("f")
  })

  test("yields class methods, constructor, and accessors", () => {
    const sf = parse(
      "class C {\n" +
        "  constructor(public x: number) {}\n" +
        "  m() { return this.x; }\n" +
        "  get v() { return this.x; }\n" +
        "  set v(n: number) { this.x = n; }\n" +
        "}\n"
    )
    const fns = walkFunctions(sf)
    const names = fns.map((f) => f.name)
    expect(names).toContain("C.constructor")
    expect(names).toContain("C.m")
    expect(names).toContain("C.get v")
    expect(names).toContain("C.set v")
  })

  test("yields object-literal methods", () => {
    const sf = parse("const o = { greet() { return 'hi'; } };\n")
    const fns = walkFunctions(sf)
    expect(fns.length).toBe(1)
    expect(fns[0]?.name).toBe("o.greet")
  })

  test("yields nested functions as separate entries", () => {
    const sf = parse("function outer() {\n  function inner() {}\n}\n")
    const fns = walkFunctions(sf)
    expect(fns.length).toBe(2)
    const names = fns.map((f) => f.name).sort()
    expect(names).toEqual(["inner", "outer"])
  })

  test("falls back to <anonymous>:line:col for IIFE", () => {
    const sf = parse(";(function() {})();\n")
    const fns = walkFunctions(sf)
    expect(fns.length).toBe(1)
    expect(fns[0]?.name).toMatch(/^<anonymous>:1:\d+$/)
  })

  test("yields zero functions for a file with only declarations", () => {
    const sf = parse("export const x = 1;\nexport type T = string;\n")
    const fns = walkFunctions(sf)
    expect(fns.length).toBe(0)
  })
})
