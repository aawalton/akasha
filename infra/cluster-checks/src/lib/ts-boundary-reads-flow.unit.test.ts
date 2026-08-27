import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scriptKindFor } from "./syntax-scanner-entry.ts"
import { scanBoundaryReads } from "./ts-boundary-reads.ts"

const parse = (source: string, filePath: string): ts.SourceFile =>
  ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, scriptKindFor(filePath))

const findingsOf = (src: string, filePath = "x.ts") => scanBoundaryReads(parse(src, filePath))

const kindsOf = (src: string, filePath = "x.ts") => findingsOf(src, filePath).map((f) => f.kind)

describe("scanBoundaryReads — flow analysis", () => {
  test("await transparency: const x = await fetch(u).json(); Schema.parse(x) emits no finding", () => {
    const src = `async function f(u: string) {
  const x = await fetch(u).json()
  return Schema.parse(x)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("used before parse: console.log(x) before Schema.parse(x) emits finding", () => {
    const src = `function f(s: string) {
  const x = JSON.parse(s)
  console.log(x)
  return Schema.parse(x)
}\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["json-parse"])
  })

  test("destructuring binding emits finding", () => {
    const src = `function f(s: string) { const { a } = JSON.parse(s); return a }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["json-parse"])
  })

  test("array destructuring binding emits finding", () => {
    const src = `function f(s: string) { const [a] = JSON.parse(s); return a }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["json-parse"])
  })

  test("spread emits finding", () => {
    const src = `function f(s: string) { return [...JSON.parse(s)] }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["json-parse"])
  })

  test("direct return emits finding", () => {
    const src = `function f(s: string) { return JSON.parse(s) }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["json-parse"])
  })

  test("argument forwarding to non-parser emits finding", () => {
    const src = `function f(s: string) { return doSomething(JSON.parse(s)) }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["json-parse"])
  })

  test("argument forwarding to approved parser inline emits no finding", () => {
    const src = `function f(s: string) { return Schema.parse(JSON.parse(s)) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("approved helper-name pattern parseFoo emits no finding", () => {
    const src = `function f(s: string) { return parseFoo(JSON.parse(s)) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("approved helper-name parsePageAsTask emits no finding", () => {
    const src = `function f(s: string) { return parsePageAsTask(JSON.parse(s)) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("JSON.parse is NOT itself an approved parser — outer is unparsed", () => {
    const src = `function f(s: string) { return JSON.parse(JSON.parse(s)) }\n`
    const findings = findingsOf(src)
    expect(findings.length).toBeGreaterThanOrEqual(1)
    for (const f of findings) {
      expect(f.kind).toBe("json-parse")
    }
  })

  test("non-parser identifier call emits finding", () => {
    const src = `function f(s: string) { return wrap(JSON.parse(s)) }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["json-parse"])
  })

  test("safeParse is approved", () => {
    const src = `function f(s: string) { return Schema.safeParse(JSON.parse(s)) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("z chain .parse is approved", () => {
    const src = `function f(s: string) { return z.object({}).strict().parse(JSON.parse(s)) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("requireMatch consumes regex-capture style binding", () => {
    const src = `function f(s: string) {
  const m = re.exec(s)
  return requireMatch(re, schema, m)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("requireEnv on bound process.env value", () => {
    const src = `function f() {
  const raw = process.env.X
  return requireEnv(raw)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("parenthesized binding initializer is transparent", () => {
    const src = `function f(s: string) {
  const x = (JSON.parse(s))
  return Schema.parse(x)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("non-null on first reference is transparent", () => {
    const src = `function f(s: string) {
  const x = JSON.parse(s)
  return Schema.parse(x!)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("multiple boundaries in same block — each tracked separately", () => {
    const src = `async function f(s: string, u: string) {
  const a = JSON.parse(s)
  const b = await fetch(u).json()
  return Schema.parse(a)
}\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["fetch-body"])
  })

  test("no enclosing block — top-level binding parsed", () => {
    const src = `const x = JSON.parse(s)\nSchema.parse(x)\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanBoundaryReads — file plumbing", () => {
  test("file path passes through verbatim", () => {
    const findings = findingsOf(`JSON.parse(s)\n`, "packages/foo/src/bar.ts")
    expect(findings[0]?.file).toBe("packages/foo/src/bar.ts")
  })

  test(".tsx file is parsed correctly", () => {
    const src = `export const C = () => { return <div>{JSON.parse(s)}</div> }\n`
    const findings = findingsOf(src, "x.tsx")
    expect(findings.map((f) => f.kind)).toEqual(["json-parse"])
  })

  test("line and column are 1-indexed at the boundary node start", () => {
    const src = `\n  JSON.parse(s)\n`
    const findings = findingsOf(src)
    expect(findings[0]?.line).toBe(2)
    expect(findings[0]?.column).toBe(3)
  })

  test("snippet is the trimmed source line of the boundary", () => {
    const src = `function f(s: string) {\n  return JSON.parse(s)\n}\n`
    const findings = findingsOf(src)
    expect(findings[0]?.snippet).toBe("return JSON.parse(s)")
  })

  test("snippet truncated past 120 chars with ellipsis", () => {
    const filler = "x".repeat(150)
    const src = `function f(s: string) {\n  /* ${filler} */ return JSON.parse(s)\n}\n`
    const findings = findingsOf(src)
    const snippet = findings[0]?.snippet ?? ""
    expect(snippet.length).toBeLessThanOrEqual(120)
    expect(snippet.endsWith("...")).toBe(true)
  })

  test("file with no boundaries emits no findings", () => {
    const src = `function f(x: number) { return x + 1 }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("kinds are emitted as the documented union values", () => {
    const src = `async function f(s: string, u: string) {
  return [JSON.parse(s), fetch(u).json(), process.env.X, re.exec(s)]
}\n`
    const kinds = kindsOf(src)
    expect(kinds.sort()).toEqual(["fetch-body", "json-parse", "process-env", "regex-capture"])
  })
})
