import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { applyFixes, scanVoidDeclarations } from "./ts-void-declarations.ts"

const sfOf = (src: string, filePath = "x.ts"): ts.SourceFile => {
  const scriptKind = filePath.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : filePath.endsWith(".jsx")
      ? ts.ScriptKind.JSX
      : filePath.endsWith(".mjs") || filePath.endsWith(".cjs") || filePath.endsWith(".js")
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS
  return ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, scriptKind)
}

const findingsOf = (src: string, filePath = "x.ts") => scanVoidDeclarations(sfOf(src, filePath))

const kindsOf = (src: string, filePath = "x.ts"): readonly string[] =>
  findingsOf(src, filePath).map((f) => f.kind)

describe("scanVoidDeclarations — function definitions", () => {
  test("function declaration with `: void` is flagged", () => {
    const src = `function f(): void { return }\n`
    expect(kindsOf(src)).toEqual(["function"])
  })

  test("async function declaration with `: Promise<void>` is not flagged", () => {
    const src = `async function f(): Promise<void> { return }\n`
    expect(kindsOf(src)).toEqual([])
  })

  test("function declaration with no return type annotation is not flagged", () => {
    const src = `function f() { return }\n`
    expect(kindsOf(src)).toEqual([])
  })

  test("function declaration with `: undefined` is not flagged", () => {
    const src = `function f(): undefined { return }\n`
    expect(kindsOf(src)).toEqual([])
  })

  test("overload signature (no body) with `: void` is not flagged", () => {
    const src = [
      `function f(): void;`,
      `function f(x: number): void;`,
      `function f(x?: number): undefined { return }`,
      ``,
    ].join("\n")
    expect(kindsOf(src)).toEqual([])
  })

  test("function expression assigned to a const is flagged", () => {
    const src = `const f = function (): void { return }\n`
    expect(kindsOf(src)).toEqual(["expression"])
  })

  test("arrow function with `: void` is flagged", () => {
    const src = `const f = (): void => { return }\n`
    expect(kindsOf(src)).toEqual(["arrow"])
  })
})

describe("scanVoidDeclarations — spellings of the same annotation", () => {
  test("parenthesised `: (void)` is flagged", () => {
    const src = `function f(): (void) { return }\n`
    expect(kindsOf(src)).toEqual(["function"])
  })

  test("a union with `void` as a member is flagged", () => {
    const src = `function f(): void | undefined { return }\n`
    expect(kindsOf(src)).toEqual(["function"])
  })

  test("the finding covers the keyword alone, so the annotation survives the fix", () => {
    const paren = `function f(): (void) { return }\n`
    expect(applyFixes(paren, findingsOf(paren))).toBe(`function f(): (undefined) { return }\n`)
    const union = `function f(): void | undefined { return }\n`
    expect(applyFixes(union, findingsOf(union))).toBe(
      `function f(): undefined | undefined { return }\n`
    )
  })

  test("`: () => void` returning a callback is still not flagged, parenthesised or not", () => {
    expect(kindsOf(`function makeNoop(): (() => void) { return () => {} }\n`)).toEqual([])
    expect(kindsOf(`function makeNoop(): () => void { return () => {} }\n`)).toEqual([])
  })

  test("a callback-slot type carrying void on both sides is not flagged", () => {
    const src = `type Each = (cb: () => void) => void\n`
    expect(kindsOf(src)).toEqual([])
  })
})

describe("scanVoidDeclarations — accessors", () => {
  test("class `get` accessor with `: void` is flagged", () => {
    const src = `class C { get g(): void { return } }\n`
    expect(kindsOf(src)).toEqual(["getter"])
  })

  test("static `get` accessor with `: void` is flagged", () => {
    const src = `class C { static get g(): void { return } }\n`
    expect(kindsOf(src)).toEqual(["getter"])
  })

  test("object-literal `get` accessor with `: void` is flagged", () => {
    const src = `const o = { get g(): void { return } }\n`
    expect(kindsOf(src)).toEqual(["getter"])
  })

  test("a `set` accessor carries no return annotation to flag (TS1095)", () => {
    const src = `class C { set s(v: undefined) { return } }\n`
    expect(kindsOf(src)).toEqual([])
  })

  test("a `get` signature with no body is not flagged", () => {
    const src = `interface I { get g(): void }\n`
    expect(kindsOf(src)).toEqual([])
  })
})

describe("scanVoidDeclarations — out of reach, stated rather than caught", () => {
  test("an alias resolving to void is NOT flagged — resolving it needs a checker", () => {
    const src = `type V = void\nfunction f(): V { return }\n`
    expect(kindsOf(src)).toEqual([])
  })
})

describe("scanVoidDeclarations — method definitions on object literals", () => {
  test("method on object literal is flagged", () => {
    const src = `const o = { foo(): void { return } }\n`
    expect(kindsOf(src)).toEqual(["method"])
  })

  test("computed-name method on object literal is flagged", () => {
    const src = `const o = { [Symbol.iterator](): void { return } }\n`
    expect(kindsOf(src)).toEqual(["method"])
  })
})

describe("scanVoidDeclarations — preserved positions (FunctionTypeNode)", () => {
  test("`() => void` in a parameter type is not flagged", () => {
    const src = `function each(cb: () => void): undefined { cb() }\n`
    expect(kindsOf(src)).toEqual([])
  })

  test("`() => void` in a property type is not flagged", () => {
    const src = `interface I { onChange?: (x: number) => void }\n`
    expect(kindsOf(src)).toEqual([])
  })

  test("`() => void` in a type alias is not flagged", () => {
    const src = `type Handler = (x: number) => void\n`
    expect(kindsOf(src)).toEqual([])
  })

  test("nested `() => void` inside another callback type is not flagged", () => {
    const src = `type X = (cb: (n: number) => void) => () => void\n`
    expect(kindsOf(src)).toEqual([])
  })

  test("MethodSignature on an interface with `: void` is not flagged", () => {
    const src = `interface I { foo(): void }\n`
    expect(kindsOf(src)).toEqual([])
  })
})

describe("scanVoidDeclarations — nested cases", () => {
  test("inner function inside a `: undefined` outer function is flagged", () => {
    const src = `function outer(): undefined { function inner(): void { return } }\n`
    expect(kindsOf(src)).toEqual(["function"])
  })

  test("function returning a `() => void` callback is not flagged", () => {
    const src = `function makeNoop(): () => void { return () => {} }\n`
    expect(kindsOf(src)).toEqual([])
  })
})

describe("scanVoidDeclarations — file metadata", () => {
  test("findings carry 1-indexed line and column of the `void` keyword", () => {
    const src = `function f(): void { return }\n`
    const findings = findingsOf(src, "y.ts")
    expect(findings).toHaveLength(1)
    const f = findings[0]
    expect(f).toBeDefined()
    if (f === undefined) return
    expect(f.file).toBe("y.ts")
    expect(f.line).toBe(1)
    expect(f.column).toBe(15)
  })

  test(".tsx file with JSX-attribute inline arrow `: void` is flagged", () => {
    const src = `const X = () => <button onClick={(): void => {}}>x</button>\n`
    expect(kindsOf(src, "z.tsx")).toEqual(["arrow"])
  })
})

describe("applyFixes", () => {
  test("rewrites a single `: void` to `: undefined`", () => {
    const src = `function f(): void { return }\n`
    const findings = findingsOf(src)
    expect(applyFixes(src, findings)).toBe(`function f(): undefined { return }\n`)
  })

  test("rewrites multiple findings without offset corruption", () => {
    const src = [
      `function a(): void { return }`,
      `function b(): void { return }`,
      `function c(): void { return }`,
      ``,
    ].join("\n")
    const expected = [
      `function a(): undefined { return }`,
      `function b(): undefined { return }`,
      `function c(): undefined { return }`,
      ``,
    ].join("\n")
    expect(applyFixes(src, findingsOf(src))).toBe(expected)
  })

  test("preserves `() => void` callback types when fixing definitions in the same file", () => {
    const src = `function each(cb: () => void): void { cb() }\n`
    const expected = `function each(cb: () => void): undefined { cb() }\n`
    expect(applyFixes(src, findingsOf(src))).toBe(expected)
  })
})
