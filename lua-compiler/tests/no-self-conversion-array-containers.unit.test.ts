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

const SELECTOR_FIXTURE_PRELUDE = [
  `interface Selector {`,
  `  readonly matches: (this: void, n: number) => boolean`,
  `}`,
  `function isPositive(n: number): boolean {`,
  `  return n > 0`,
  `}`,
].join("\n")

const CONVERSION_ERROR = "Unable to convert function with a 'this' parameter"

describe("unsupportedNoSelfFunctionConversion through array containers", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-noself-readonly-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("fires on a direct property assignment (control)", () => {
    const errors = transpileFixture(
      root,
      [SELECTOR_FIXTURE_PRELUDE, `const s: Selector = { matches: isPositive }`, `void s`, ``].join(
        "\n"
      )
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })

  it("fires through a mutable array literal (control)", () => {
    const errors = transpileFixture(
      root,
      [
        SELECTOR_FIXTURE_PRELUDE,
        `const sels: Selector[] = [{ matches: isPositive }]`,
        `void sels`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })

  it("fires through a readonly array literal", () => {
    const errors = transpileFixture(
      root,
      [
        SELECTOR_FIXTURE_PRELUDE,
        `const sels: readonly Selector[] = [{ matches: isPositive }]`,
        `void sels`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })

  it("fires through a heterogeneous array literal (union element type)", () => {
    const errors = transpileFixture(
      root,
      [
        SELECTOR_FIXTURE_PRELUDE,
        `const sels: readonly Selector[] = [`,
        `  { matches: (n: number): boolean => n < 0 },`,
        `  { matches: isPositive },`,
        `]`,
        `void sels`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })

  it("does not fire when the assigned function declares this: void", () => {
    const errors = transpileFixture(
      root,
      [
        `interface Selector {`,
        `  readonly matches: (this: void, n: number) => boolean`,
        `}`,
        `function isPositive(this: void, n: number): boolean {`,
        `  return n > 0`,
        `}`,
        `const sels: readonly Selector[] = [{ matches: isPositive }]`,
        `void sels`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(false)
  })

  it("fires through an index-signature target (Record)", () => {
    const errors = transpileFixture(
      root,
      [
        SELECTOR_FIXTURE_PRELUDE,
        `const byKey: Record<string, Selector> = {`,
        `  positive: { matches: isPositive },`,
        `}`,
        `void byKey`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })

  it("fires through an array literal nested in an object literal", () => {
    const errors = transpileFixture(
      root,
      [
        SELECTOR_FIXTURE_PRELUDE,
        `interface Config {`,
        `  readonly selectors: readonly Selector[]`,
        `}`,
        `const cfg: Config = {`,
        `  selectors: [{ matches: (n: number): boolean => n < 0 }, { matches: isPositive }],`,
        `}`,
        `void cfg`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })

  it("fires through Map-constructor tuple arguments", () => {
    const errors = transpileFixture(
      root,
      [
        SELECTOR_FIXTURE_PRELUDE,
        `const byName = new Map<string, Selector>([`,
        `  ["negative", { matches: (n: number): boolean => n < 0 }],`,
        `  ["positive", { matches: isPositive }],`,
        `])`,
        `void byName`,
        ``,
      ].join("\n")
    )
    expect(errors.some((m) => m.includes(CONVERSION_ERROR))).toBe(true)
  })
})
