import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import * as fs from "node:fs"
import * as os from "node:os"
import * as path from "node:path"
import { withLuaVm } from "@temper/shared-build-deploy-lua-runner/lua-vm"
import { z } from "zod"
import * as tstl from "../src/transpilation"

function write(target: string, contents: string) {
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents, "utf8")
}

function buildCycleBundle(root: string): string {
  write(
    path.join(root, "src/a.ts"),
    [
      `import { b } from "./b"`,
      `export function a(): number {`,
      `  return b() + 1`,
      `}`,
      `export function a2(): number {`,
      `  return 10`,
      `}`,
      `export let counter = 0`,
      `export function bump(): void {`,
      `  counter = counter + 1`,
      `}`,
      ``,
    ].join("\n")
  )
  write(
    path.join(root, "src/b.ts"),
    [
      `import * as A from "./a"`,
      `export function b(): number {`,
      `  return A.a2() * 2`,
      `}`,
      `export function readCounter(): number {`,
      `  return A.counter`,
      `}`,
      ``,
    ].join("\n")
  )
  write(
    path.join(root, "src/main.ts"),
    [
      `import { a, bump } from "./a"`,
      `import { b, readCounter } from "./b"`,
      `export const resultA = a()`,
      `export const resultB = b()`,
      `bump()`,
      `bump()`,
      `export const counterThroughCycle = readCounter()`,
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
  return z.string().parse(fs.readFileSync(bundlePath, "utf8"))
}

describe("luaBundle require shim — runtime import cycles", () => {
  let root: string

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "tstl-bundle-cycle-"))
  })

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true })
  })

  it("loads a two-module cycle without stack overflow and both modules' functions are callable post-load", async () => {
    const bundle = buildCycleBundle(root)

    await withLuaVm(async (vm) => {
      await vm.run(`__cycle_entry = (function(...) ${bundle} end)()`)
      expect(await vm.get("__cycle_entry.resultA")).toBe(21)
      expect(await vm.get("__cycle_entry.resultB")).toBe(20)
      expect(await vm.get("__cycle_entry.counterThroughCycle")).toBe(2)
      expect(await vm.run(`return __cycle_entry and true`)).toBe(true)
    })
  })

  it("keeps acyclic require behavior intact (single shared module required twice)", async () => {
    write(
      path.join(root, "src/shared.ts"),
      [
        `export const tag: string = "shared"`,
        `export function id(x: number): number {`,
        `  return x`,
        `}`,
        ``,
      ].join("\n")
    )
    write(
      path.join(root, "src/user.ts"),
      [
        `import { id } from "./shared"`,
        `export function twice(x: number): number {`,
        `  return id(x) * 2`,
        `}`,
        ``,
      ].join("\n")
    )
    write(
      path.join(root, "src/main.ts"),
      [
        `import { tag } from "./shared"`,
        `import { twice } from "./user"`,
        `export const value = twice(21)`,
        `export const sharedTag = tag`,
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
            strict: true,
            skipLibCheck: true,
            rootDir: ".",
            outDir: "./lua-out",
            types: [],
          },
          tstl: { luaTarget: "5.1", luaBundle: "out.lua", luaBundleEntry: "./src/main.ts" },
          include: ["src/**/*.ts"],
        },
        null,
        2
      )
    )
    const { diagnostics, emitSkipped } = tstl.transpileProject(tsconfigPath)
    expect(diagnostics.filter((d) => d.category === 1)).toHaveLength(0)
    expect(emitSkipped).toBe(false)
    const bundle = z.string().parse(fs.readFileSync(path.join(root, "lua-out", "out.lua"), "utf8"))

    await withLuaVm(async (vm) => {
      await vm.run(`__acyclic_entry = (function(...) ${bundle} end)()`)
      expect(await vm.get("__acyclic_entry.value")).toBe(42)
      expect(await vm.get("__acyclic_entry.sharedTag")).toBe("shared")
    })
  })
})
