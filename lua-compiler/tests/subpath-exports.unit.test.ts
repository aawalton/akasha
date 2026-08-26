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

describe("subpath-exports resolver patch", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-subpath-exports-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("resolves package.json exports subpath patterns via ts.resolveModuleName", () => {
    const libDir = path.join(root, "node_modules/@fixture/lib")
    write(
      path.join(libDir, "package.json"),
      JSON.stringify(
        {
          name: "@fixture/lib",
          version: "0.0.0",
          exports: {
            "./*": "./src/*.ts",
          },
        },
        null,
        2
      )
    )
    write(
      path.join(libDir, "src/greet.ts"),
      `export function greet(name: string): string {\n` + `  return "hello " + name\n` + `}\n`
    )

    write(
      path.join(root, "src/main.ts"),
      `import { greet } from "@fixture/lib/greet"\n` + `export const message = greet("world")\n`
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

    const bundlePath = path.join(root, "lua-out", "out.lua")
    expect(fs.existsSync(bundlePath)).toBe(true)
    const bundle = z.string().parse(fs.readFileSync(bundlePath, "utf8"))

    expect(bundle).not.toContain('require("@fixture.lib.greet")')
    expect(bundle).not.toContain('require("@fixture/lib/greet")')
    expect(bundle).toContain("greet")
    expect(bundle).toContain('"hello "')
  })
})
