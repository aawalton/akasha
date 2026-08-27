import { describe, expect, it } from "bun:test"
import ts from "typescript"
import { scanSuspenseThrows } from "./ts-suspense-throw.ts"

function scan(source: string) {
  const sf = ts.createSourceFile("probe.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  return scanSuspenseThrows(sf)
}

describe("scanSuspenseThrows", () => {
  it("flags the zero-parameter executor — the exact #15911 defect", () => {
    const findings = scan("if (isLoading) throw new Promise<void>(() => {})")
    expect(findings).toHaveLength(1)
    expect(findings[0]?.line).toBe(1)
  })

  it("flags an executor that never references its resolve parameter", () => {
    const findings = scan('throw new Promise<void>((resolve) => { console.log("nope") })')
    expect(findings).toHaveLength(1)
  })

  it("flags a zero-parameter function-expression executor", () => {
    const findings = scan("throw new Promise(function () { doSomething() })")
    expect(findings).toHaveLength(1)
  })

  it("permits an executor that resolves", () => {
    expect(scan("throw new Promise<void>((resolve) => { setTimeout(resolve, 10) })")).toHaveLength(
      0
    )
  })

  it("permits an executor that rejects", () => {
    expect(
      scan("throw new Promise(function (resolve, reject) { reject(new Error()) })")
    ).toHaveLength(0)
  })

  it("permits a resolve referenced through a nested closure", () => {
    const findings = scan(
      "throw new Promise<void>((resolve) => { void load().then(() => { resolve() }) })"
    )
    expect(findings).toHaveLength(0)
  })

  it("ignores a non-Promise throw", () => {
    expect(scan("throw new Error('boom')")).toHaveLength(0)
  })

  it("ignores a Promise construction that is not thrown", () => {
    expect(scan("const p = new Promise<void>(() => {})")).toHaveLength(0)
  })

  it("reads a destructured parameter conservatively as settleable", () => {
    expect(scan("throw new Promise(({ a }) => { noop() })")).toHaveLength(0)
  })
})
