import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scriptKindFor } from "./syntax-scanner-entry.ts"
import { scanBoundaryReads } from "./ts-boundary-reads.ts"

const parse = (source: string, filePath: string): ts.SourceFile =>
  ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, scriptKindFor(filePath))

const findingsOf = (src: string, filePath = "x.ts") => scanBoundaryReads(parse(src, filePath))

describe("scanBoundaryReads — bun-file-read", () => {
  test("Bun.file(p).text() bare emits one finding", () => {
    const src = `async function f(p: string) { return Bun.file(p).text() }\n`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.kind).toBe("bun-file-read")
  })

  test("Bun.file(p).json() emits one finding", () => {
    const src = `async function f(p: string) { return Bun.file(p).json() }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["bun-file-read"])
  })

  test("Schema.parse(await Bun.file(p).text()) emits no finding", () => {
    const src = `async function f(p: string) { return Schema.parse(await Bun.file(p).text()) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("bound and parsed via Schema.parse emits no finding", () => {
    const src = `async function f(p: string) {
  const body = await Bun.file(p).text()
  return Schema.parse(body)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("bound and parsed via parseManifest emits no finding", () => {
    const src = `async function f(p: string) {
  const body = await Bun.file(p).json()
  return parseManifest(body)
}\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanBoundaryReads — subprocess-stdout", () => {
  test("Bun.spawn([...]).stdout inline emits one finding", () => {
    const src = `function f() { return Bun.spawn(["ls"]).stdout }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["subprocess-stdout"])
  })

  test("spawn([...]).stdout emits one finding", () => {
    const src = `function f() { return spawn(["ls"]).stdout }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["subprocess-stdout"])
  })

  test("synchronous spawn variant .stdout emits one finding", () => {
    const fn = `spawn${"Sync"}`
    const src = `function f() { return ${fn}(["ls"]).stdout }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["subprocess-stdout"])
  })

  test("Schema.parse(Bun.spawn(['ls']).stdout) emits no finding", () => {
    const src = `function f() { return Schema.parse(Bun.spawn(["ls"]).stdout) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("bound and parsed via parseStdout emits no finding", () => {
    const src = `function f() {
  const out = Bun.spawn(["ls"]).stdout
  return parseStdout(out)
}\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanBoundaryReads — supabase-rpc", () => {
  test("supabase.rpc('name') emits one finding", () => {
    const src = `async function f() { return supabase.rpc("get_data") }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["supabase-rpc"])
  })

  test("client.rpc('name', { arg: 1 }) emits one finding", () => {
    const src = `async function f() { return client.rpc("get_data", { arg: 1 }) }\n`
    expect(findingsOf(src).map((f) => f.kind)).toEqual(["supabase-rpc"])
  })

  test("Schema.parse(supabase.rpc('name')) emits no finding", () => {
    const src = `async function f() { return Schema.parse(supabase.rpc("get_data")) }\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("bound and parsed emits no finding", () => {
    const src = `async function f() {
  const r = await supabase.rpc("get_data")
  return Schema.parse(r)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("bound and parsed via parseRpc emits no finding", () => {
    const src = `async function f() {
  const r = await supabase.rpc("get_data")
  return parseRpc(r)
}\n`
    expect(findingsOf(src)).toEqual([])
  })

  test("foo.rpc(dynamicName) (non-string-literal first arg) emits no finding", () => {
    const src = `async function f(name: string) { return supabase.rpc(name) }\n`
    expect(findingsOf(src)).toEqual([])
  })
})
