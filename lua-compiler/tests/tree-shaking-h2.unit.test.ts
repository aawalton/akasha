import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import * as fs from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import { z } from "zod"

import * as tstl from "../src/transpilation"

function write(target: string, contents: string) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents, "utf8")
}

function moduleKeys(bundle: string): Set<string> {
  const keys = new Set<string>()
  for (const match of bundle.matchAll(/\["([^"]+)"\]\s*=\s*function/g)) {
    const k = match[1]
    if (k !== undefined) keys.add(k)
  }
  return keys
}

function makeTsconfig(): unknown {
  return {
    compilerOptions: {
      target: "esnext",
      module: "esnext",
      moduleResolution: "bundler",
      strict: false,
      skipLibCheck: true,
      rootDir: ".",
      outDir: "./lua-out",
      types: [],
    },
    tstl: {
      luaTarget: "JIT",
      luaBundle: "out.lua",
      luaBundleEntry: "./src/main.ts",
    },
    include: ["src/**/*.ts"],
  }
}

function transpile(root: string): string {
  const tsconfigPath = path.join(root, "tsconfig.json")
  write(tsconfigPath, JSON.stringify(makeTsconfig(), null, 2))
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
  if (emitSkipped) throw new Error("tstl emit skipped")
  return z.string().parse(fs.readFileSync(path.join(root, "lua-out", "out.lua"), "utf8"))
}

describe("tree-shaking H2 — re-export pruning", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-h2-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("drops `export * from` re-exports whose names are not reached", () => {
    write(
      path.join(root, "src/main.ts"),
      `import { a } from "./barrel"\n` + `export const result = a\n`
    )
    write(
      path.join(root, "src/barrel.ts"),
      `export * from "./mod-a"\n` + `export * from "./mod-b"\n`
    )
    write(path.join(root, "src/mod-a.ts"), `export const a = 1\n`)
    write(path.join(root, "src/mod-b.ts"), `export const b = 2\n`)

    const bundle = transpile(root)
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("main"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("barrel"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("mod-a"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("mod-b"))).toBe(false)
    expect(bundle).not.toMatch(/require\("[^"]*mod-b"\)/)
  })

  it("drops selective `export { x } from` names that are not reached", () => {
    write(
      path.join(root, "src/main.ts"),
      `import { a } from "./barrel"\n` + `export const result = a\n`
    )
    write(
      path.join(root, "src/barrel.ts"),
      `export { a } from "./mod-a"\n` + `export { b } from "./mod-b"\n`
    )
    write(path.join(root, "src/mod-a.ts"), `export const a = 1\n`)
    write(path.join(root, "src/mod-b.ts"), `export const b = 2\n`)

    const bundle = transpile(root)
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("mod-a"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("mod-b"))).toBe(false)
    expect(bundle).not.toMatch(/require\("[^"]*mod-b"\)/)
  })

  it("propagates pruning across multi-hop barrel chains", () => {
    write(
      path.join(root, "src/main.ts"),
      `import { a } from "./barrel-1"\n` + `export const result = a\n`
    )
    write(path.join(root, "src/barrel-1.ts"), `export * from "./barrel-2"\n`)
    write(
      path.join(root, "src/barrel-2.ts"),
      `export * from "./mod-a"\n` + `export * from "./mod-b"\n`
    )
    write(path.join(root, "src/mod-a.ts"), `export const a = 1\n`)
    write(path.join(root, "src/mod-b.ts"), `export const b = 2\n`)

    const bundle = transpile(root)
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("mod-a"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("mod-b"))).toBe(false)
    expect(bundle).not.toMatch(/require\("[^"]*mod-b"\)/)
  })

  it("preserves all re-exports under namespace import (`import * as ns`) when every re-export is accessed", () => {
    write(
      path.join(root, "src/main.ts"),
      `import * as ns from "./barrel"\n` + `export const result = ns.a + ns.b\n`
    )
    write(
      path.join(root, "src/barrel.ts"),
      `export * from "./mod-a"\n` + `export * from "./mod-b"\n`
    )
    write(path.join(root, "src/mod-a.ts"), `export const a = 1\n`)
    write(path.join(root, "src/mod-b.ts"), `export const b = 2\n`)

    const bundle = transpile(root)
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("mod-a"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("mod-b"))).toBe(true)
  })

  it("prunes unreached re-exports when namespace import accesses a strict subset", () => {
    write(
      path.join(root, "src/main.ts"),
      `import * as ns from "./barrel"\n` + `export const result = ns.a\n`
    )
    write(
      path.join(root, "src/barrel.ts"),
      `export * from "./mod-a"\n` + `export * from "./mod-b"\n`
    )
    write(path.join(root, "src/mod-a.ts"), `export const a = 1\n`)
    write(path.join(root, "src/mod-b.ts"), `export const b = 2\n`)

    const bundle = transpile(root)
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("mod-a"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("mod-b"))).toBe(false)
    expect(bundle).not.toMatch(/require\("[^"]*mod-b"\)/)
  })

  it("keeps both re-exports when namespace binding escapes", () => {
    write(
      path.join(root, "src/main.ts"),
      `import * as ns from "./barrel"\n` +
        `declare function f(x: unknown): void\n` +
        `f(ns)\n` +
        `export const result = 1\n`
    )
    write(
      path.join(root, "src/barrel.ts"),
      `export * from "./mod-a"\n` + `export * from "./mod-b"\n`
    )
    write(path.join(root, "src/mod-a.ts"), `export const a = 1\n`)
    write(path.join(root, "src/mod-b.ts"), `export const b = 2\n`)

    const bundle = transpile(root)
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("mod-a"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("mod-b"))).toBe(true)
  })

  it("preserves side-effect re-exports (no named exports consumed)", () => {
    write(
      path.join(root, "src/main.ts"),
      `import { a } from "./barrel"\n` + `export const result = a\n`
    )
    write(
      path.join(root, "src/barrel.ts"),
      `import "./side-effect"\n` + `export { a } from "./mod-a"\n`
    )
    write(path.join(root, "src/mod-a.ts"), `export const a = 1\n`)
    write(path.join(root, "src/side-effect.ts"), `export const _ran = (() => { return true })()\n`)

    const bundle = transpile(root)
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("side-effect"))).toBe(true)
    expect(bundle).toMatch(/require\("[^"]*side-effect"\)/)
  })
})
