import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanEnumDeclarations } from "./ts-enum-declarations.ts"

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

const findingsOf = (src: string, filePath = "x.ts") => scanEnumDeclarations(sfOf(src, filePath))

const namesOf = (src: string, filePath = "x.ts"): readonly string[] =>
  findingsOf(src, filePath).map((f) => f.name)

describe("scanEnumDeclarations — declarations", () => {
  test("plain enum declaration emits one finding with the enum name", () => {
    const src = `enum Color { Red, Green, Blue }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("Color")
    expect(findings[0]?.kind).toBe("enum")
  })

  test("exported enum declaration emits one finding", () => {
    const src = `export enum Status { Active, Inactive }\n`
    const findings = findingsOf(src)
    expect(findings[0]?.name).toBe("Status")
    expect(findings[0]?.kind).toBe("enum")
  })

  test("string-valued enum is reported the same as numeric", () => {
    const src = `export enum Mode { Default = "default", Library = "library" }\n`
    expect(namesOf(src)).toEqual(["Mode"])
  })

  test("const enum is reported with kind 'const-enum'", () => {
    const src = `export const enum Flags { A = 1, B = 2 }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("Flags")
    expect(findings[0]?.kind).toBe("const-enum")
  })

  test("declare enum is reported with kind 'declare-enum'", () => {
    const src = `declare enum Ambient { X, Y }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("Ambient")
    expect(findings[0]?.kind).toBe("declare-enum")
  })

  test("multiple enums in one file emit one finding each", () => {
    const src = `enum A { X }\nenum B { Y }\nconst enum C { Z }\n`
    expect(namesOf(src)).toEqual(["A", "B", "C"])
  })

  test("nested enum inside a namespace is still reported", () => {
    const src = `namespace N { export enum Inner { A } }\n`
    const findings = findingsOf(src)
    expect(findings.map((f) => f.name)).toEqual(["Inner"])
  })

  test("file with no enums emits no findings", () => {
    const src = `function f() {}\nconst x = 1\nexport interface I { y: number }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("identifier named 'enum' inside a string is not flagged", () => {
    const src = `const s = "enum Color { Red }"\n`
    expect(findingsOf(src)).toEqual([])
  })

  test(".tsx file with an enum is reported", () => {
    const src = `export enum Pane { Left, Right }\nexport const X = () => null\n`
    expect(namesOf(src, "x.tsx")).toEqual(["Pane"])
  })

  test("line and column are 1-indexed at the enum keyword", () => {
    const src = `\n  enum Foo { A }\n`
    const findings = findingsOf(src)
    expect(findings[0]?.line).toBe(2)
    expect(findings[0]?.column).toBe(3)
  })

  test("file path passes through verbatim", () => {
    const findings = findingsOf(`enum X { A }\n`, "foo/src/bar.ts")
    expect(findings[0]?.file).toBe("foo/src/bar.ts")
  })
})
