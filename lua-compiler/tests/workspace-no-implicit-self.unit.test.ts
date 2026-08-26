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

const PRODUCER_SOURCE =
  `export function greet(name: string): string {\n` + `  return "hello " + name\n` + `}\n`

const CONSUMER_SOURCE =
  `import { greet } from "@fixture/lib/greet"\n` + `export const message = greet("world")\n`

function writeTsconfig(root: string) {
  write(
    path.join(root, "tsconfig.json"),
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
          noImplicitSelf: true,
        },
        include: ["src/**/*.ts"],
      },
      null,
      2
    )
  )
}

function transpileAndReadBundle(root: string): string {
  const { diagnostics, emitSkipped } = tstl.transpileProject(path.join(root, "tsconfig.json"))
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
  return z.string().parse(fs.readFileSync(path.join(root, "lua-out", "out.lua"), "utf8"))
}

describe("workspace packages are in-program for noImplicitSelf", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-workspace-noselsf-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("a workspace-symlinked producer compiles self-free under noImplicitSelf", () => {
    const realLibDir = path.join(root, "packages/lib")
    write(
      path.join(realLibDir, "package.json"),
      JSON.stringify(
        { name: "@fixture/lib", version: "0.0.0", exports: { "./*": "./src/*.ts" } },
        null,
        2
      )
    )
    write(path.join(realLibDir, "src/greet.ts"), PRODUCER_SOURCE)
    fs.mkdirSync(path.join(root, "node_modules/@fixture"), { recursive: true })
    fs.symlinkSync(realLibDir, path.join(root, "node_modules/@fixture/lib"), "dir")

    write(path.join(root, "src/main.ts"), CONSUMER_SOURCE)
    writeTsconfig(root)

    const bundle = transpileAndReadBundle(root)

    expect(bundle).toContain('"hello "')
    expect(bundle).toMatch(/function\s+[\w.]*greet\(name\)/)
    expect(bundle).not.toMatch(/function\s+[\w.]*greet\(self[,)]/)
  })

  it("a true third-party node_modules producer stays external-library and self-ful", () => {
    const libDir = path.join(root, "node_modules/@fixture/lib")
    write(
      path.join(libDir, "package.json"),
      JSON.stringify(
        { name: "@fixture/lib", version: "0.0.0", exports: { "./*": "./src/*.ts" } },
        null,
        2
      )
    )
    write(path.join(libDir, "src/greet.ts"), PRODUCER_SOURCE)

    write(path.join(root, "src/main.ts"), CONSUMER_SOURCE)
    writeTsconfig(root)

    const bundle = transpileAndReadBundle(root)

    expect(bundle).toContain('"hello "')
    expect(bundle).toMatch(/function\s+[\w.]*greet\(self[,)]/)
  })
})
