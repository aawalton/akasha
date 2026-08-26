import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import * as fs from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import { z } from "zod"

const FULL_MATCH_SCHEMA = z
  .unknown()
  .transform((v) => (Array.isArray(v) && typeof v[0] === "string" ? v[0] : null))

import * as tstl from "../src/transpilation"
import { fixtureTsconfig } from "./_fixture-tsconfig"

function write(target: string, contents: string) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents, "utf8")
}

interface Fixture {
  name: string
  source: string
  expectInBundle?: string
  expectInBundleRegex?: readonly RegExp[]
  expectLualibInclusion?: string
}

const fixtures: Fixture[] = [
  {
    name: "Number as map callback wraps __TS__Number in a self-absorbing adapter",
    source: `declare const sink: (this: void, value: unknown) => void\nsink(["1", "2", "3"].map(Number))\n`,
    expectInBundle: "function(____, ...) return __TS__Number(...) end",
    expectLualibInclusion: "function __TS__Number(",
  },
  {
    name: "String as map callback wraps tostring in a self-absorbing adapter",
    source: `declare const sink: (this: void, value: unknown) => void\nsink([1, 2, 3].map(String))\n`,
    expectInBundle: "function(____, ...) return tostring(...) end",
  },
  {
    name: "parseInt as map callback wraps __TS__ParseInt in a self-absorbing adapter",
    source: `declare const sink: (this: void, value: unknown) => void\nsink(["1", "2", "3"].map(parseInt))\n`,
    expectInBundle: "function(____, ...) return __TS__ParseInt(...) end",
    expectLualibInclusion: "function __TS__ParseInt(",
  },
  {
    name: "parseFloat as map callback wraps __TS__ParseFloat in a self-absorbing adapter",
    source: `declare const sink: (this: void, value: unknown) => void\nsink(["1.1", "2.2", "3.3"].map(parseFloat))\n`,
    expectInBundle: "function(____, ...) return __TS__ParseFloat(...) end",
    expectLualibInclusion: "function __TS__ParseFloat(",
  },
  {
    name: "user `function f(this: void, ...)` passed as predicate is wrapped",
    source: [
      `declare const sink: (this: void, value: unknown) => void`,
      `function isPositive(this: void, n: number): boolean { return n > 0 }`,
      `sink([-1, -2, 3, 4].find(isPositive))`,
      ``,
    ].join("\n"),
    expectInBundle: "function(____, ...) return isPositive(...) end",
  },
  {
    name: "property access (`obj.f`) on a `this: void`-typed property is hoisted and wrapped",
    source: [
      `declare const sink: (this: void, value: unknown) => void`,
      `interface Helpers { isPositive: (this: void, n: number) => boolean }`,
      `declare const helpers: Helpers`,
      `sink([-1, -2, 3, 4].find(helpers.isPositive))`,
      ``,
    ].join("\n"),
    expectInBundleRegex: [
      /local ____helpers_isPositive_\d+ = helpers\.isPositive/,
      /function\(____, \.\.\.\) return ____helpers_isPositive_\d+\(\.\.\.\) end/,
    ],
  },
  {
    name: "element access (`obj['f']`) on a `this: void`-typed property is hoisted and wrapped",
    source: [
      `declare const sink: (this: void, value: unknown) => void`,
      `interface Helpers { isPositive: (this: void, n: number) => boolean }`,
      `declare const helpers: Helpers`,
      `sink([-1, -2, 3, 4].find(helpers["isPositive"]))`,
      ``,
    ].join("\n"),
    expectInBundleRegex: [
      /local ____helpers_isPositive_\d+ = helpers\.isPositive/,
      /function\(____, \.\.\.\) return ____helpers_isPositive_\d+\(\.\.\.\) end/,
    ],
  },
  {
    name: "optional-chained property access (`obj?.f`) on a `this: void`-typed property is hoisted and wrapped",
    source: [
      `declare const sink: (this: void, value: unknown) => void`,
      `interface Helpers { isPositive: (this: void, n: number) => boolean }`,
      `declare const helpers: Helpers | undefined`,
      `if (helpers) sink([-1, -2, 3, 4].find(helpers?.isPositive))`,
      ``,
    ].join("\n"),
    expectInBundleRegex: [/function\(____, \.\.\.\) return ____\w+\(\.\.\.\) end/],
  },
  {
    name: "optional-chained element access (`obj?.['f']`) on a `this: void`-typed property is hoisted and wrapped",
    source: [
      `declare const sink: (this: void, value: unknown) => void`,
      `interface Helpers { isPositive: (this: void, n: number) => boolean }`,
      `declare const helpers: Helpers | undefined`,
      `if (helpers) sink([-1, -2, 3, 4].find(helpers?.["isPositive"]))`,
      ``,
    ].join("\n"),
    expectInBundleRegex: [/function\(____, \.\.\.\) return ____\w+\(\.\.\.\) end/],
  },
]

function compileSource(root: string, source: string): string {
  write(path.join(root, "src/main.ts"), source)

  const tsconfigPath = path.join(root, "tsconfig.json")
  write(tsconfigPath, JSON.stringify(fixtureTsconfig(), null, 2))

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
  return z.string().parse(fs.readFileSync(bundlePath, "utf8"))
}

describe("this:void callback adapter wrapping", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-this-void-adapter-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  for (const fixture of fixtures) {
    it(fixture.name, () => {
      const bundle = compileSource(root, fixture.source)

      if (fixture.expectInBundle !== undefined) {
        expect(bundle).toContain(fixture.expectInBundle)
      }
      if (fixture.expectInBundleRegex !== undefined) {
        for (const re of fixture.expectInBundleRegex) {
          expect(bundle).toMatch(re)
        }
      }
      if (fixture.expectLualibInclusion) {
        expect(bundle).toContain(fixture.expectLualibInclusion)
      }

      const danger =
        /__TS__Array(?:Map|Filter|ForEach|Reduce|FlatMap|Some|Every|Find|FindIndex)\([^,)]+,\s*(?:Number|parseInt|parseFloat|__TS__Number|__TS__ParseInt|__TS__ParseFloat|helpers\.\w+|helpers\["\w+"\])\b/
      const matched = FULL_MATCH_SCHEMA.parse(danger.exec(bundle))
      if (matched !== null) {
        throw new Error(`bare polyfill reference passed as __TS__Array* callback: ${matched}`)
      }
    })
  }

  it("does not import the Number lualib feature when only the polyfill identifier appears in user code", () => {
    const bundle = compileSource(
      root,
      `declare const sink: (this: void, value: unknown) => void\nsink([1, 2, 3].map(String))\n`
    )
    expect(bundle).toContain("tostring")
    expect(bundle).not.toContain("function __TS__Number(")
  })

  it("direct call form `Number(x)` emits the call without a wrapper", () => {
    const bundle = compileSource(
      root,
      `declare const sink: (this: void, value: unknown) => void\nsink(Number("42"))\n`
    )
    expect(bundle).toContain("__TS__Number(")
    expect(bundle).not.toContain("function(____, ...) return __TS__Number(...) end")
  })
})
