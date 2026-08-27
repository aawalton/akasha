import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanMethodSignatures } from "./ts-method-signatures.ts"

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

const findingsOf = (src: string, filePath = "x.ts") => scanMethodSignatures(sfOf(src, filePath))

describe("scanMethodSignatures — interface members", () => {
  test("plain interface method emits one finding with parentKind=interface", () => {
    const src = `interface Foo { read(input: string): string }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("read")
    expect(findings[0]?.parentKind).toBe("interface")
    expect(findings[0]?.parentName).toBe("Foo")
  })

  test("multiple interface methods emit one finding each", () => {
    const src = `interface Reader {
  read(input: string): string
  close(): void
}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(2)
    expect(findings.map((f) => f.name)).toEqual(["read", "close"])
  })

  test("optional interface method (with question token) is detected", () => {
    const src = `interface Foo { read?(input: string): string }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("read")
  })

  test("generic interface method is detected", () => {
    const src = `interface Foo { map<T>(fn: (x: T) => T): T }\n`
    expect(findingsOf(src)).toHaveLength(1)
  })

  test("computed property name interface method is detected", () => {
    const src = `interface Foo { [Symbol.iterator](): Iterator<number> }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("[Symbol.iterator]")
  })

  test("property-form callable member is NOT a finding", () => {
    const src = `interface Foo { read: (input: string) => string }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("index signature is NOT a finding", () => {
    const src = `interface Foo { [k: string]: string }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("call signature is NOT a finding", () => {
    const src = `interface Callable { (x: number): number }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("construct signature is NOT a finding", () => {
    const src = `interface Ctor { new (x: number): Foo }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })
})

describe("scanMethodSignatures — type literals", () => {
  test("type alias literal method emits parentName=alias name", () => {
    const src = `type Reader = { read(input: string): string }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.parentKind).toBe("type-literal")
    expect(findings[0]?.parentName).toBe("Reader")
  })

  test("inline parameter object literal method emits parentName=null", () => {
    const src = `function f(opts: { foo(): void }) {}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.parentKind).toBe("type-literal")
    expect(findings[0]?.parentName).toBeNull()
  })

  test("nested type literal inside interface property emits finding with type-literal parent", () => {
    const src = `interface Outer { inner: { f(): void } }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.name).toBe("f")
    expect(findings[0]?.parentKind).toBe("type-literal")
    expect(findings[0]?.parentName).toBeNull()
  })

  test("function return type literal emits finding with type-literal parent", () => {
    const src = `function make(): { run(): void } { return { run() {} } }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.parentKind).toBe("type-literal")
    expect(findings[0]?.parentName).toBeNull()
  })
})

describe("scanMethodSignatures — class members are out of scope", () => {
  test("class method declaration is NOT a finding", () => {
    const src = `class Foo { bar(): void {} }\n`
    expect(findingsOf(src)).toHaveLength(0)
  })

  test("class with both method and a separate interface emits only the interface finding", () => {
    const src = `interface Iface { run(): void }\nclass Foo { run(): void {} }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.parentName).toBe("Iface")
  })
})

describe("scanMethodSignatures — line/column", () => {
  test("line and column are 1-indexed and point at the method name", () => {
    const src = `interface Foo {\n  read(input: string): string\n}\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.line).toBe(2)
    expect(findings[0]?.column).toBe(3)
  })
})

describe("scanMethodSignatures — file paths", () => {
  test("filePath is preserved verbatim in findings", () => {
    const src = `interface Foo { f(): void }\n`
    const findings = findingsOf(src, "packages/example/src/foo.ts")
    expect(findings[0]?.file).toBe("packages/example/src/foo.ts")
  })

  test(".tsx files are parsed correctly", () => {
    const src = `interface Foo { render(): JSX.Element }\n`
    const findings = findingsOf(src, "x.tsx")
    expect(findings).toHaveLength(1)
  })
})
