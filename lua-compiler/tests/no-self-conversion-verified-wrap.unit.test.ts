import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import * as fs from "node:fs"
import * as os from "node:os"
import * as path from "node:path"

import * as tstl from "../src/transpilation"

function write(target: string, contents: string): undefined {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents, "utf8")
}

function transpileFixture(root: string, source: string): readonly string[] {
  write(path.join(root, "src/main.ts"), source)

  const tsconfigPath = path.join(root, "tsconfig.json")
  write(
    tsconfigPath,
    JSON.stringify(
      {
        compilerOptions: {
          target: "esnext",
          module: "esnext",
          moduleResolution: "bundler",
          strict: true,
          skipLibCheck: true,
          rootDir: ".",
          outDir: "./lua-out",
          types: [],
        },
        tstl: {
          luaTarget: "5.1",
          luaBundle: "out.lua",
          luaBundleEntry: "./src/main.ts",
          luaLibImport: "inline",
        },
        include: ["src/**/*.ts"],
      },
      null,
      2
    )
  )

  const { diagnostics } = tstl.transpileProject(tsconfigPath)
  return diagnostics
    .filter((d) => d.category === 1)
    .map((d) => (typeof d.messageText === "string" ? d.messageText : d.messageText.messageText))
}

const CONVERSION_ERROR = "Unable to convert function with a 'this' parameter"

describe("Void → NonVoid conversions are verified against the adapter, not trusted", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-noself-verified-wrap-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("fires on a member-level conversion through a non-literal source (no adapter can fire)", () => {
    const errors = transpileFixture(
      root,
      [
        `interface Handlers {`,
        `  readonly onTick: (n: number) => boolean`,
        `}`,
        `function impl(this: void, n: number): boolean {`,
        `  return n > 0`,
        `}`,
        `const source = { onTick: impl }`,
        `const target: Handlers = source`,
        `void target`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })

  it("fires on a member-level conversion passed as a call argument through a non-literal source", () => {
    const errors = transpileFixture(
      root,
      [
        `interface Handlers {`,
        `  readonly onTick: (n: number) => boolean`,
        `}`,
        `declare function register(h: Handlers): void`,
        `function impl(this: void, n: number): boolean {`,
        `  return n > 0`,
        `}`,
        `const source = { onTick: impl }`,
        `register(source)`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })

  it("stays silent when the adapter will wrap: this:void fn passed to a self-ful callback param", () => {
    const errors = transpileFixture(
      root,
      [
        `declare function take(f: (n: number) => boolean): void`,
        `function impl(this: void, n: number): boolean {`,
        `  return n > 0`,
        `}`,
        `take(impl)`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(false)
  })

  it("stays silent when the adapter will wrap: this:void comparator passed to .sort (optional param union)", () => {
    const errors = transpileFixture(
      root,
      [
        `interface Named { name: string }`,
        `function byName(this: void, a: Named, b: Named): number {`,
        `  if (a.name < b.name) return -1`,
        `  if (a.name > b.name) return 1`,
        `  return 0`,
        `}`,
        `const sorted = [{ name: "b" }, { name: "a" }].sort(byName)`,
        `void sorted`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(false)
  })

  it("stays silent on a member-level conversion through an object literal (adapter fires on the initializer)", () => {
    const errors = transpileFixture(
      root,
      [
        `interface Handlers {`,
        `  readonly onTick: (n: number) => boolean`,
        `}`,
        `function impl(this: void, n: number): boolean {`,
        `  return n > 0`,
        `}`,
        `const target: Handlers = { onTick: impl }`,
        `void target`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(false)
  })
})
