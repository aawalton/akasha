import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import * as fs from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import { withLuaVm } from "@temper/shared-build-deploy-lua-runner/lua-vm"
import { z } from "zod"

import * as tstl from "../src/transpilation"
import { fixtureTsconfig } from "./_fixture-tsconfig"

const BUNDLE_TEXT_SCHEMA = z.string()

interface Captured {
  readonly values: Record<string, unknown>
}

function write(target: string, contents: string): undefined {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents, "utf8")
}

interface CompileOverrides {
  readonly compilerOptions?: Record<string, unknown>
  readonly tstl?: Record<string, unknown>
}

function compileBundle(root: string, source: string, overrides?: CompileOverrides): string {
  write(path.join(root, "src/main.ts"), source)

  const tsconfigPath = path.join(root, "tsconfig.json")
  write(tsconfigPath, JSON.stringify(fixtureTsconfig(overrides), null, 2))

  const { diagnostics, emitSkipped } = tstl.transpileProject(tsconfigPath)
  const errors = diagnostics.filter((d) => d.category === 1)
  if (errors.length > 0) {
    const formatted = errors
      .map((d) => {
        const msg = typeof d.messageText === "string" ? d.messageText : d.messageText.messageText
        return `${d.code}: ${msg}`
      })
      .join("\n")
    throw new Error(`tstl reported errors:\n${formatted}`)
  }
  expect(emitSkipped).toBe(false)

  const bundlePath = path.join(root, "lua-out", "out.lua")
  expect(fs.existsSync(bundlePath)).toBe(true)
  return BUNDLE_TEXT_SCHEMA.parse(fs.readFileSync(bundlePath, "utf8"))
}

const CAPTURED_SCHEMA = z.record(z.string(), z.unknown())

async function runBundle(bundle: string): Promise<Captured> {
  return await withLuaVm(async (vm) => {
    await vm.run(`
      __captured = {}
      function __record(key, value)
        __captured[key] = value
      end
    `)
    await vm.run(bundle)
    const captured = await vm.run("return __captured")
    return { values: CAPTURED_SCHEMA.parse(captured) }
  })
}

describe("this:void callback adapter wrapping (runtime correctness)", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-this-void-runtime-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("['1','2','3'].map(Number) returns [1,2,3] at runtime", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: string) => void`,
        `const arr = ["1", "2", "3"].map(Number)`,
        `__record("number_map", arr.join(","))`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.number_map).toBe("1,2,3")
  })

  it("[1,2,3].map(String) returns ['1','2','3'] at runtime", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: string) => void`,
        `const arr = [1, 2, 3].map(String)`,
        `__record("string_map", arr.join(","))`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.string_map).toBe("1,2,3")
  })

  it("['1.5','2.5','3.5'].map(parseFloat) returns [1.5,2.5,3.5] at runtime", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: string) => void`,
        `const arr = ["1.5", "2.5", "3.5"].map(parseFloat)`,
        `__record("parseFloat_map", arr.join(","))`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.parseFloat_map).toBe("1.5,2.5,3.5")
  })

  it("user `function f(this: void, n)` passed as predicate finds the first positive", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: number) => void`,
        `function isPositive(this: void, n: number): boolean { return n > 0 }`,
        `const found = [-1, -2, 3, 4].find(isPositive)`,
        `__record("first_positive", found ?? -1)`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.first_positive).toBe(3)
  })

  it("inline arrow `(n) => n > 0` (this:any source — control case) still works", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: string) => void`,
        `const arr = [1, -2, 3, -4].filter((n) => n > 0)`,
        `__record("positive_filter", arr.join(","))`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.positive_filter).toBe("1,3")
  })

  it("direct call `Number('42')` returns 42 at runtime (not callback context)", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: number) => void`,
        `const n = Number("42")`,
        `__record("direct_call", n)`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.direct_call).toBe(42)
  })

  it("property access `obj.f` on a `this: void`-typed property finds the first positive at runtime", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: number) => void`,
        `interface Helpers { isPositive: (this: void, n: number) => boolean }`,
        `const helpers: Helpers = { isPositive: (n: number) => n > 0 }`,
        `const found = [-1, -2, 3, 4].find(helpers.isPositive)`,
        `__record("property_access_first_positive", found ?? -1)`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.property_access_first_positive).toBe(3)
  })

  it("element access `obj['f']` on a `this: void`-typed property finds the first positive at runtime", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: number) => void`,
        `interface Helpers { isPositive: (this: void, n: number) => boolean }`,
        `const helpers: Helpers = { isPositive: (n: number) => n > 0 }`,
        `const found = [-1, -2, 3, 4].find(helpers["isPositive"])`,
        `__record("element_access_first_positive", found ?? -1)`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.element_access_first_positive).toBe(3)
  })

  it("optional-chained property access `obj?.f` on a `this: void`-typed property finds the first positive at runtime when receiver is non-null", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: number) => void`,
        `interface Helpers { isPositive: (this: void, n: number) => boolean }`,
        `const helpers: Helpers | undefined = { isPositive: (n: number) => n > 0 }`,
        `const found = helpers ? [-1, -2, 3, 4].find(helpers?.isPositive) : -1`,
        `__record("optional_property_first_positive", found ?? -1)`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.optional_property_first_positive).toBe(3)
  })

  it("cross-package self-mismatch: a no-self callback typed self-bearing is mis-called; `this: void` on the shared type fixes it", async () => {
    const broken = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: number) => void`,
        `type SelfBearing = (a: number, b: number) => number`,
        `type NoSelf = (this: void, a: number, b: number) => number`,
        `const r: NoSelf = (a, b) => a * 10 + b`,
        `const widened = r as unknown as SelfBearing`,
        `function evaluate(cb: SelfBearing, a: number, b: number): number { return cb(a, b) }`,
        `let result: number`,
        `try { result = evaluate(widened, 4, 6) } catch (_e) { result = -999 }`,
        `__record("broken_call", result)`,
        ``,
      ].join("\n"),
      { tstl: { noImplicitSelf: false } }
    )
    const brokenValues = (await runBundle(broken)).values
    expect(brokenValues.broken_call).not.toBe(46)

    const fixed = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: number) => void`,
        `type Shared = (this: void, a: number, b: number) => number`,
        `const r: Shared = (a, b) => a * 10 + b`,
        `function evaluate(cb: Shared, a: number, b: number): number { return cb(a, b) }`,
        `__record("fixed_call", evaluate(r, 4, 6))`,
        ``,
      ].join("\n"),
      { tstl: { noImplicitSelf: false } }
    )
    const fixedValues = (await runBundle(fixed)).values
    expect(fixedValues.fixed_call).toBe(46)
  })

  it("side-effecting receiver `getHelpers().f` is evaluated once per callback construction", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: number) => void`,
        `interface Helpers { isPositive: (this: void, n: number) => boolean }`,
        `let calls = 0`,
        `function getHelpers(): Helpers {`,
        `  calls += 1`,
        `  return { isPositive: (n: number) => n > 0 }`,
        `}`,
        `const found = [-1, -2, 3, 4].find(getHelpers().isPositive)`,
        `__record("getHelpers_call_count", calls)`,
        `__record("getHelpers_first_positive", found ?? -1)`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.getHelpers_call_count).toBe(1)
    expect(values.getHelpers_first_positive).toBe(3)
  })

  it("user `function f(this: void, a, b)` passed to .sort under strict (optional compareFn — union contextual type) sorts correctly", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: string) => void`,
        `interface Named { name: string }`,
        `function byName(this: void, a: Named, b: Named): number {`,
        `  if (a.name < b.name) return -1`,
        `  if (a.name > b.name) return 1`,
        `  return 0`,
        `}`,
        `const arr: Named[] = [{ name: "gamma" }, { name: "alpha" }, { name: "beta" }]`,
        `const sorted = [...arr].sort(byName)`,
        `__record("sorted_names", sorted.map((n) => n.name).join(","))`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.sorted_names).toBe("alpha,beta,gamma")
  })

  it("noImplicitSelf named comparator passed to .sort under strict sorts correctly", async () => {
    const bundle = compileBundle(
      root,
      [
        `declare const __record: (this: void, key: string, value: string) => void`,
        `interface Named { name: string }`,
        `function byName(a: Named, b: Named): number {`,
        `  if (a.name < b.name) return -1`,
        `  if (a.name > b.name) return 1`,
        `  return 0`,
        `}`,
        `const arr: Named[] = [{ name: "gamma" }, { name: "alpha" }, { name: "beta" }]`,
        `const sorted = [...arr].sort(byName)`,
        `__record("sorted_names_nis", sorted.map((n) => n.name).join(","))`,
        ``,
      ].join("\n")
    )
    const { values } = await runBundle(bundle)
    expect(values.sorted_names_nis).toBe("alpha,beta,gamma")
  })
})
