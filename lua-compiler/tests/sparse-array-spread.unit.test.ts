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

describe("__TS__SparseArraySpread emission", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-sparse-spread-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("does not pass nil as the first argument to unpack", () => {
    write(
      path.join(root, "src/main.ts"),
      [
        `declare const sink: (this: void, ...values: unknown[]) => void`,
        `const arr: number[] = [1, 2, 3]`,
        `function emit(this: void, ...values: number[]): void {`,
        `  for (let i = 0; i < values.length; i++) sink(values[i])`,
        `}`,
        `// Spread + extra arg forces the SparseArray path (not a bare unpack).`,
        `emit(...arr, 42)`,
        ``,
      ].join("\n")
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

    expect(bundle).toContain("__TS__SparseArraySpread")

    const fnStart = bundle.indexOf("function __TS__SparseArraySpread(")
    expect(fnStart).toBeGreaterThanOrEqual(0)
    const fnEndMarker = bundle.indexOf("\nend\n", fnStart)
    expect(fnEndMarker).toBeGreaterThan(fnStart)
    const fnBody = bundle.substring(fnStart, fnEndMarker)

    expect(fnBody).not.toMatch(/unpack\(\s*nil\s*,/)
    expect(fnBody).not.toMatch(/____unpack/)
  })
})
