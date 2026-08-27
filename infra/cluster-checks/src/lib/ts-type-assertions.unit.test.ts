import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { type AssertionForm, scanTypeAssertions } from "./ts-type-assertions.ts"

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

const formsOf = (src: string, filePath = "x.ts"): readonly AssertionForm[] =>
  scanTypeAssertions(sfOf(src, filePath)).map((f) => f.form)

describe("scanTypeAssertions — forms", () => {
  test("`expr as T` → as-type", () => {
    const src = `const x = y as Foo\n`
    expect(formsOf(src)).toEqual(["as-type"])
  })

  test("`as const` → as-const, NOT as-type", () => {
    const src = `const x = [1, 2] as const\n`
    expect(formsOf(src)).toEqual(["as-const"])
  })

  test("`as any` is a normal as-type (form is structural, not value-typed)", () => {
    const src = `const x = y as any\n`
    expect(formsOf(src)).toEqual(["as-type"])
  })

  test("`<T>expr` in .ts → angle-bracket", () => {
    const src = `const x = <Foo>y\n`
    expect(formsOf(src, "x.ts")).toEqual(["angle-bracket"])
  })

  test("`expr!` → non-null", () => {
    const src = `const x = y!.foo\n`
    expect(formsOf(src)).toEqual(["non-null"])
  })

  test("`expr as unknown as T` → ONE double-cast (inner `as unknown` collapsed)", () => {
    const src = `const x = y as unknown as Foo\n`
    expect(formsOf(src)).toEqual(["double-cast"])
  })

  test("`expr as unknown as Y as Z` → double-cast + as-type (only innermost pair collapses)", () => {
    const src = `const x = y as unknown as Y as Z\n`
    expect(formsOf(src)).toEqual(["as-type", "double-cast"])
  })

  test("named brand constructor `function Brand(x): Brand { return x as Brand }` → brand-constructor", () => {
    const src = `export function Fd(n: number): Fd { return n as Fd }\n`
    expect(formsOf(src)).toEqual(["brand-constructor"])
  })

  test("arrow brand constructor `(x): Brand => x as Brand` → brand-constructor", () => {
    const src = `export const asFd = (n: number): Fd => n as Fd\n`
    expect(formsOf(src)).toEqual(["brand-constructor"])
  })

  test("brand constructor pattern requires return type to match `as T` exactly", () => {
    const mismatch = `export const Foo = (n: number): Foo => n as Bar\n`
    expect(formsOf(mismatch)).toEqual(["as-type"])
  })

  test("brand constructor pattern only matches the direct return position", () => {
    const indirect = `function Fd(n: number): Fd {\n  const x = n as Fd\n  return x\n}\n`
    expect(formsOf(indirect)).toEqual(["as-type"])
  })

  test("multi-statement function body is NOT a brand constructor", () => {
    const multi = `function Fd(n: number): Fd {\n  console.log(n)\n  return n as Fd\n}\n`
    expect(formsOf(multi)).toEqual(["as-type"])
  })

  test("brand constructor recognizes identifiers starting with `__`", () => {
    const named = `function as__TS__Foo<T>(x: T): __TS__Foo<T> { return x as __TS__Foo<T> }\n`
    expect(formsOf(named)).toEqual(["brand-constructor"])
    const arrow = `const as__TS__Foo = <T>(x: T): __TS__Foo<T> => x as __TS__Foo<T>\n`
    expect(formsOf(arrow)).toEqual(["brand-constructor"])
  })

  test("function name must match brand or `as`+brand", () => {
    const src = `function f(x: Foo): Bar { return x as Bar }\n`
    expect(formsOf(src)).toEqual(["as-type"])
  })

  test("primitive-keyword brand `function asSymbol(x: unknown): symbol { return x as symbol }` → brand-constructor", () => {
    const src = `function asSymbol(x: unknown): symbol { return x as symbol }\n`
    expect(formsOf(src)).toEqual(["brand-constructor"])
  })

  test("primitive-keyword arrow brand `(x): number => x as number` → brand-constructor", () => {
    const src = `const asNumber = (x: unknown): number => x as number\n`
    expect(formsOf(src)).toEqual(["brand-constructor"])
  })

  test("primitive-keyword brand recognized for every supported keyword", () => {
    const cases: ReadonlyArray<readonly [string, string]> = [
      ["asString", "string"],
      ["asNumber", "number"],
      ["asBoolean", "boolean"],
      ["asSymbol", "symbol"],
      ["asBigint", "bigint"],
      ["asObject", "object"],
      ["asUnknown", "unknown"],
      ["asAny", "any"],
      ["asNever", "never"],
      ["asVoid", "void"],
    ]
    for (const [fn, kw] of cases) {
      const src = `function ${fn}(x: unknown): ${kw} { return x as ${kw} }\n`
      expect(formsOf(src)).toEqual(["brand-constructor"])
    }
  })

  test("primitive-keyword brand requires `as<PascalKeyword>` function name; bare keyword name is NOT a brand-constructor", () => {
    const src = `function symbol(x: unknown): symbol { return x as symbol }\n`
    expect(formsOf(src)).toEqual(["as-type"])
  })

  test("primitive-keyword brand: function name must match the keyword (asNumber → number)", () => {
    const src = `function asString(x: unknown): number { return x as number }\n`
    expect(formsOf(src)).toEqual(["as-type"])
  })

  test("primitive-keyword brand: return type and `as` type must be the same keyword", () => {
    const src = `function asNumber(x: unknown): number { return x as string }\n`
    expect(formsOf(src)).toEqual(["as-type"])
  })

  test("primitive-keyword brand only matches the direct return position", () => {
    const indirect = `function asNumber(x: unknown): number {\n  const y = x as number\n  return y\n}\n`
    expect(formsOf(indirect)).toEqual(["as-type"])
  })
})

describe("scanTypeAssertions — non-assertions", () => {
  test("`expr satisfies T` is NOT counted", () => {
    const src = `const x = { a: 1 } satisfies Foo\n`
    expect(formsOf(src)).toEqual([])
  })

  test("type annotations are NOT counted", () => {
    const src = `function f(x: Foo): Bar { return g(x) }\n`
    expect(formsOf(src)).toEqual([])
  })

  test("generic type arguments at call sites are NOT counted", () => {
    const src = `const x = createSet<Foo>(input)\n`
    expect(formsOf(src)).toEqual([])
  })

  test("comments containing `as` text are NOT counted", () => {
    const src = `// y as Foo\n/* y as Foo */\nconst x = 1\n`
    expect(formsOf(src)).toEqual([])
  })

  test("string literals containing `as` text are NOT counted", () => {
    const src = `const x = "y as Foo"\n`
    expect(formsOf(src)).toEqual([])
  })

  test("JSX in .tsx is parsed as JSX, not as a cast", () => {
    const src = `const x = <Foo>child</Foo>\n`
    expect(formsOf(src, "x.tsx")).toEqual([])
  })
})

describe("scanTypeAssertions — output shape", () => {
  test("findings carry file, 1-indexed line/column, and a single-line snippet", () => {
    const src = `const a = 1\nconst x = y as Foo\n`
    const findings = scanTypeAssertions(sfOf(src, "pkg/x.ts"))
    expect(findings).toHaveLength(1)
    const [f] = findings
    expect(f).toBeDefined()
    if (!f) return
    expect(f.form).toBe("as-type")
    expect(f.file).toBe("pkg/x.ts")
    expect(f.line).toBe(2)
    expect(f.column).toBe(11)
    expect(f.snippet).toBe("y as Foo")
  })

  test("multiple findings in one source — preserves source order", () => {
    const src = [
      `const a = x as Foo`,
      `const b = [1] as const`,
      `const c = y!.k`,
      `const d = z as unknown as Bar`,
      ``,
    ].join("\n")
    const findings = scanTypeAssertions(sfOf(src, "x.ts"))
    expect(findings.map((f) => f.form)).toEqual(["as-type", "as-const", "non-null", "double-cast"])
    expect(findings.map((f) => f.line)).toEqual([1, 2, 3, 4])
  })

  test("snippet is truncated when the assertion text exceeds the cap", () => {
    const longExpr = `${"x".repeat(200)} as Foo`
    const src = `const v = ${longExpr}\n`
    const findings = scanTypeAssertions(sfOf(src, "x.ts"))
    expect(findings).toHaveLength(1)
    const [f] = findings
    expect(f).toBeDefined()
    if (!f) return
    expect(f.snippet.length).toBeLessThanOrEqual(80)
    expect(f.snippet.endsWith("…")).toBe(true)
  })

  test("multi-line assertion text is collapsed to a single line in the snippet", () => {
    const src = `const x = (\n  y\n) as Foo\n`
    const findings = scanTypeAssertions(sfOf(src, "x.ts"))
    expect(findings).toHaveLength(1)
    const [f] = findings
    expect(f).toBeDefined()
    if (!f) return
    expect(f.snippet.includes("\n")).toBe(false)
  })
})
