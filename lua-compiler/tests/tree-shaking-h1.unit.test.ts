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

describe("tree-shaking H1 — file-level reachability filter", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-h1-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("excludes type-only sibling modules from ____modules", () => {
    write(
      path.join(root, "src/main.ts"),
      `import type { Greeting } from "./types"\n` +
        `import { greet } from "./greet"\n` +
        `export const message: Greeting = greet("world")\n`
    )
    write(path.join(root, "src/types.ts"), `export type Greeting = string\n`)
    write(
      path.join(root, "src/greet.ts"),
      `export function greet(name: string): string {\n` + `  return "hello " + name\n` + `}\n`
    )

    const tsconfigPath = path.join(root, "tsconfig.json")
    write(
      tsconfigPath,
      JSON.stringify(
        {
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
        },
        null,
        2
      )
    )

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

    const bundle = z.string().parse(fs.readFileSync(path.join(root, "lua-out", "out.lua"), "utf8"))
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("main"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("greet"))).toBe(true)

    expect([...keys].some((k) => k.endsWith("types"))).toBe(false)
  })

  it("excludes orphan parsed modules that no reachable code imports", () => {
    write(
      path.join(root, "src/main.ts"),
      `import { greet } from "./greet"\n` + `export const message = greet("world")\n`
    )
    write(
      path.join(root, "src/greet.ts"),
      `export function greet(name: string): string {\n` + `  return "hello " + name\n` + `}\n`
    )
    write(path.join(root, "src/orphan.ts"), `export const orphanValue = 42\n`)

    const tsconfigPath = path.join(root, "tsconfig.json")
    write(
      tsconfigPath,
      JSON.stringify(
        {
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
        },
        null,
        2
      )
    )

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

    const bundle = z.string().parse(fs.readFileSync(path.join(root, "lua-out", "out.lua"), "utf8"))
    const keys = moduleKeys(bundle)

    expect([...keys].some((k) => k.endsWith("main"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("greet"))).toBe(true)
    expect([...keys].some((k) => k.endsWith("orphan"))).toBe(false)
    expect(bundle).not.toContain("orphanValue")
  })
})
