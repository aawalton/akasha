import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanCollectionTypes } from "./ts-collection-types.ts"

const sfOf = (src: string, filePath = "x.ts") => {
  const scriptKind = filePath.endsWith(".tsx")
    ? ts.ScriptKind.TSX
    : filePath.endsWith(".jsx")
      ? ts.ScriptKind.JSX
      : filePath.endsWith(".mjs") || filePath.endsWith(".cjs") || filePath.endsWith(".js")
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS
  return ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, scriptKind)
}

const findingsOf = (src: string, filePath = "x.ts") => scanCollectionTypes(sfOf(src, filePath))

const formsOf = (src: string, filePath = "x.ts") => findingsOf(src, filePath).map((f) => f.form)

const positionsOf = (src: string, filePath = "x.ts") =>
  findingsOf(src, filePath).map((f) => f.escapePosition)

describe("scanCollectionTypes — array types in escape positions", () => {
  test("T[] as a function parameter is flagged", () => {
    const src = `function f(items: number[]): undefined {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.form).toBe("array")
    expect(findings[0]?.escapePosition).toBe("parameter")
  })

  test("T[] as an explicit return type is flagged", () => {
    const src = `function f(): number[] { return [] }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.escapePosition).toBe("return-type")
  })

  test("T[] as an interface property is flagged", () => {
    const src = `interface Box { items: number[] }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.escapePosition).toBe("property-signature")
  })

  test("T[] in a type alias body is flagged", () => {
    const src = `type Items = number[]\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.escapePosition).toBe("type-alias")
  })

  test("T[] in a type-literal property of an exported type alias is flagged", () => {
    const src = `export type Box = { items: number[] }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.escapePosition).toBe("property-signature")
  })

  test("T[] as a local variable annotation inside a function body is NOT flagged", () => {
    const src = `function f(): undefined { const items: number[] = []; items.push(1) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("Array<T> reference form is flagged with form 'array-reference'", () => {
    const src = `function f(items: Array<number>): undefined {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.form).toBe("array-reference")
  })

  test("ReadonlyArray<T> reference form is NOT flagged", () => {
    const src = `function f(items: ReadonlyArray<number>): undefined {}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("readonly T[] is NOT flagged", () => {
    const src = `function f(items: readonly number[]): undefined {}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("nested T[][] in escape position emits findings for both layers", () => {
    const src = `function f(grid: number[][]): undefined {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(2)
    expect(findings.map((f) => f.form)).toEqual(["array", "array"])
  })

  test("readonly outer with mutable inner T[] is flagged for the inner only", () => {
    const src = `function f(grid: readonly number[][]): undefined {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
  })

  test("inferred parameter type with no annotation is NOT flagged", () => {
    const src = `function f(items = [1, 2, 3]): undefined {}\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanCollectionTypes — tuple types in escape positions", () => {
  test("positional tuple as a parameter is flagged", () => {
    const src = `function f(point: [number, number]): undefined {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.form).toBe("tuple")
  })

  test("readonly positional tuple is NOT flagged", () => {
    const src = `function f(point: readonly [number, number]): undefined {}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("labeled tuple as a parameter is flagged", () => {
    const src = `function f(p: [x: number, y: number]): undefined {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.form).toBe("tuple")
  })

  test("variadic tuple as a parameter is flagged", () => {
    const src = `function f(args: [string, ...number[]]): undefined {}\n`
    const findings = findingsOf(src)
    expect(findings.map((f) => f.form)).toEqual(["tuple", "array"])
  })

  test("tuple as an explicit return type is flagged", () => {
    const src = `function f(): [number, number] { return [0, 0] }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.escapePosition).toBe("return-type")
  })

  test("tuple as an interface property is flagged", () => {
    const src = `interface Pin { coords: [number, number] }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.escapePosition).toBe("property-signature")
  })

  test("tuple as local variable inside function body is NOT flagged", () => {
    const src = `function f(): undefined { const p: [number, number] = [0, 0] }\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanCollectionTypes — return-type detection across function-shape kinds", () => {
  test("explicit return type on an arrow function is flagged", () => {
    const src = `const f = (): number[] => []\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.escapePosition).toBe("return-type")
  })

  test("explicit return type on a function expression is flagged", () => {
    const src = `const f = function (): number[] { return [] }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.escapePosition).toBe("return-type")
  })

  test("inferred return type with body returning an array is NOT flagged", () => {
    const src = `function f() { return [1, 2, 3] }\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanCollectionTypes — line/column and file passthrough", () => {
  test("line and column are 1-indexed", () => {
    const src = `\n  function f(items: number[]): undefined {}\n`
    const findings = findingsOf(src)
    expect(findings[0]?.line).toBe(2)
    expect(findings[0]?.column).toBeGreaterThan(0)
  })

  test("file path passes through verbatim", () => {
    const findings = findingsOf(
      `function f(items: number[]): undefined {}\n`,
      "foo/src/bar.ts"
    )
    expect(findings[0]?.file).toBe("foo/src/bar.ts")
  })

  test(".tsx file with prop array type is reported", () => {
    const src = `interface Props { items: string[] }\nexport function C(_: Props) { return null }\n`
    expect(formsOf(src, "x.tsx")).toEqual(["array"])
  })

  test("file with no escape-position collections emits no findings", () => {
    const src = `function f(): undefined { const xs = [1, 2, 3]; xs.push(4) }\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanCollectionTypes — exhaustive escape-position negative cases", () => {
  test("type-only positions are unaffected by readonly forms", () => {
    const src = `interface Box { items: readonly number[]; coords: readonly [number, number]; bag: ReadonlyArray<string> }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("multiple findings collected in a single source", () => {
    const src = `
      interface Box { items: number[]; coords: [number, number] }
      function f(items: string[]): number[] { return items.length === 0 ? [] : [1] }
    `
    const findings = findingsOf(src)
    expect(findings.length).toBeGreaterThanOrEqual(4)
    expect(positionsOf(src)).toContain("parameter")
    expect(positionsOf(src)).toContain("return-type")
    expect(positionsOf(src)).toContain("property-signature")
  })
})
