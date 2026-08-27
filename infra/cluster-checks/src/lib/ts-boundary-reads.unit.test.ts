import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scriptKindFor } from "./syntax-scanner-entry.ts"
import { scanBoundaryReads } from "./ts-boundary-reads.ts"

const parse = (source: string, filePath: string): ts.SourceFile =>
  ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, scriptKindFor(filePath))

const findingsOf = (src: string, filePath = "x.ts") => scanBoundaryReads(parse(src, filePath))

describe("scanBoundaryReads — json-parse", () => {
  test("bare JSON.parse with no consumer emits one finding", () => {
    const src = `function f(s: string) { return JSON.parse(s) }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("json-parse")
  })

  test("JSON.parse passed inline to Schema.parse emits no finding", () => {
    const src = `Schema.parse(JSON.parse(s))\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("JSON.parse bound and parsed by Schema.parse emits no finding", () => {
    const src = `function f(s: string) { const raw = JSON.parse(s); return Schema.parse(raw) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("JSON.parse bound and parsed by z.string().parse emits no finding", () => {
    const src = `function f(s: string) { const raw = JSON.parse(s); return z.string().parse(raw) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("JSON.parse bound and consumed without parser emits finding", () => {
    const src = `function f(s: string) { const raw = JSON.parse(s); return raw.foo }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["json-parse"])
  })
})

describe("scanBoundaryReads — process-env", () => {
  test("bare process.env.X read emits one finding", () => {
    const src = `function f() { return process.env.NODE_ENV }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("process-env")
  })

  test("process.env.X parsed inline by Schema.parse emits no finding", () => {
    const src = `function f() { return Schema.parse(process.env.NODE_ENV) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("process.env.X bound and parsed by Schema.parse emits no finding", () => {
    const src = `function f() { const raw = process.env.NODE_ENV; return Schema.parse(raw) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("process.env['X'] element-access read emits one finding", () => {
    const src = `function f() { return process.env["NODE_ENV"] }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["process-env"])
  })

  test("process.env.X.toLowerCase() emits exactly one finding (outermost)", () => {
    const src = `function f() { return process.env.NODE_ENV.toLowerCase() }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("process-env")
  })

  test("process.env.X = 'foo' assignment is not a read", () => {
    const src = `function f() { process.env.NODE_ENV = "test" }\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanBoundaryReads — fetch-body", () => {
  test("fetch(url).json() with no consumer emits one finding", () => {
    const src = `async function f(url: string) { return fetch(url).json() }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("fetch-body")
  })

  test("(await fetch(url)).json() with no consumer emits one finding", () => {
    const src = `async function f(url: string) { return (await fetch(url)).json() }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["fetch-body"])
  })

  test("Schema.parse(await fetch(url).json()) emits no finding", () => {
    const src = `async function f(url: string) { return Schema.parse(await fetch(url).json()) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("bound and parsed body emits no finding", () => {
    const src = `async function f(url: string) {
  const body = await fetch(url).json()
  return Schema.parse(body)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("fetch(url).text() bound and parsed via parseFoo emits no finding", () => {
    const src = `async function f(url: string) {
  const body = await fetch(url).text()
  return parseFoo(body)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("fetch(url).blob() emits one finding", () => {
    const src = `async function f(url: string) { return fetch(url).blob() }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["fetch-body"])
  })
})

describe("scanBoundaryReads — regex-capture", () => {
  test("re.exec(s) bare emits one finding", () => {
    const src = `function f(s: string) { return re.exec(s) }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("regex-capture")
  })

  test("bound exec result flowing into requireMatchPositional is approved", () => {
    const src = `function f(s: string) { const m = re.exec(s); return requireMatchPositional(re, schema, m) }\n`
    expect(findingsOf(src).filter((x) => x.kind === "regex-capture")).toEqual([])
  })

  test("delete process.env[X] is not a read", () => {
    const src = `function f(k: string) { delete process.env[k] }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("Schema.parse(re.exec(s)) emits no finding", () => {
    const src = `function f(s: string) { return Schema.parse(re.exec(s)) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("bound and parsed via Schema.parse emits no finding", () => {
    const src = `function f(s: string) { const m = re.exec(s); return Schema.parse(m) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("s.match(re) emits one finding with kind regex-capture", () => {
    const src = `function f(s: string) { return s.match(re) }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["regex-capture"])
  })

  test("array-binding destructure flowing into parser is approved (Lua multi-return shape)", () => {
    const src = `function f(s: string) { const [m] = string.match(s, "(.+)"); return parseLuaCommand(m) }\n`
    expect(findingsOf(src).filter((x) => x.kind === "regex-capture")).toEqual([])
  })

  test("array-binding destructure with no parser consumer is unapproved", () => {
    const src = `function f(s: string) { const [m] = string.match(s, "(.+)"); return m }\n`
    expect(findingsOf(src).map((x) => x.kind)).toEqual(["regex-capture"])
  })

  test("array-binding destructure where every named capture flows into a parser is approved", () => {
    const src = `function f(s: string) { const [a, b] = string.match(s, "(%d+)-(%d+)"); return parseLuaA(a) + parseLuaB(b) }\n`
    expect(findingsOf(src).filter((x) => x.kind === "regex-capture")).toEqual([])
  })

  test("array-binding destructure where one capture is unused is unapproved", () => {
    const src = `function f(s: string) { const [a, b] = string.match(s, "(%d+)-(%d+)"); return parseLuaA(a) }\n`
    expect(findingsOf(src).map((x) => x.kind)).toEqual(["regex-capture"])
  })

  test("array-binding destructure ignores rest element and omitted slots", () => {
    const restSrc = `function f(s: string) { const [a, ...rest] = string.match(s, "(.+)"); return parseLuaA(a) }\n`
    const omittedSrc = `function f(s: string) { const [, b] = string.match(s, "(.+)-(.+)"); return parseLuaB(b) }\n`
    expect(findingsOf(restSrc).filter((x) => x.kind === "regex-capture")).toEqual([])
    expect(findingsOf(omittedSrc).filter((x) => x.kind === "regex-capture")).toEqual([])
  })
})

describe("scanBoundaryReads — fs-read", () => {
  test("fs.readFile(path) with no consumer emits one finding", () => {
    const src = `async function f(p: string) { return fs.readFile(p, "utf-8") }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("fs-read")
  })

  test("fs.readFileSync(path) emits one finding", () => {
    const src = `function f(p: string) { return fs.readFileSync(p, "utf-8") }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["fs-read"])
  })

  test("fs.promises.readFile(path) emits one finding", () => {
    const src = `async function f(p: string) { return fs.promises.readFile(p, "utf-8") }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["fs-read"])
  })

  test("fs.readFileSync flowing into JSON.parse (non-approved) still emits fs-read finding", () => {
    const src = `function f(p: string) {
  return Schema.parse(JSON.parse(fs.readFileSync(p, "utf-8")))
}\n`
    const kinds = findingsOf(src).map((f) => f.kind)
    expect(kinds).toContain("fs-read")
  })

  test("bound and parsed via parseConfigFile emits no finding", () => {
    const src = `function f(p: string) {
  const raw = fs.readFileSync(p, "utf-8")
  return parseConfigFile(raw)
}\n`
    expect(findingsOf(src)).toEqual([])
  })
})
