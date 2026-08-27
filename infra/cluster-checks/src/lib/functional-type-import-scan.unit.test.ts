import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { scanWorkspaceImportsOfSpecifier } from "./functional-type-import-scan.ts"

describe("scanWorkspaceImportsOfSpecifier", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "import-scan-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  function writeFile(relPath: string, body: string): undefined {
    const full = join(tmp, relPath)
    mkdirSync(join(full, ".."), { recursive: true })
    writeFileSync(full, body, "utf-8")
  }

  test("empty workspace → empty samples", () => {
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("no imports of the specifier → empty samples", () => {
    writeFile("src/a.ts", `import { x } from "@scope/other"\nexport const y = x\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("top-level `import type` → allTypeOnly true, names captured", () => {
    writeFile("src/a.ts", `import type { X, Y } from "@scope/dep"\nexport type Z = X | Y\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.names).toEqual(["X", "Y"])
    expect(samples[0]?.allTypeOnly).toBe(true)
    expect(samples[0]?.hasDefaultOrNamespace).toBe(false)
  })

  test("inline `import { type X }` (single, all-typed) → allTypeOnly true", () => {
    writeFile("src/a.ts", `import { type X } from "@scope/dep"\nexport type Z = X\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.names).toEqual(["X"])
    expect(samples[0]?.allTypeOnly).toBe(true)
  })

  test("inline `import { type X, type Y }` (all-typed multi) → allTypeOnly true", () => {
    writeFile("src/a.ts", `import { type X, type Y } from "@scope/dep"\nexport type Z = X | Y\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.names).toEqual(["X", "Y"])
    expect(samples[0]?.allTypeOnly).toBe(true)
  })

  test("plain value `import { X }` → allTypeOnly false", () => {
    writeFile("src/a.ts", `import { X } from "@scope/dep"\nexport const y = X\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.names).toEqual(["X"])
    expect(samples[0]?.allTypeOnly).toBe(false)
  })

  test("mixed `import { type X, Y }` (one type, one value) → allTypeOnly false", () => {
    writeFile("src/a.ts", `import { type X, Y } from "@scope/dep"\nexport const z = Y\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.names).toEqual(["X", "Y"])
    expect(samples[0]?.allTypeOnly).toBe(false)
  })

  test("default import → allTypeOnly false, hasDefaultOrNamespace true", () => {
    writeFile("src/a.ts", `import D from "@scope/dep"\nexport const y = D\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.allTypeOnly).toBe(false)
    expect(samples[0]?.hasDefaultOrNamespace).toBe(true)
  })

  test("namespace import → allTypeOnly false, hasDefaultOrNamespace true", () => {
    writeFile("src/a.ts", `import * as Ns from "@scope/dep"\nexport const y = Ns\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.allTypeOnly).toBe(false)
    expect(samples[0]?.hasDefaultOrNamespace).toBe(true)
  })

  test("multiple files with mixed forms → one sample per import statement", () => {
    writeFile("src/a.ts", `import type { A } from "@scope/dep"\nexport type X = A\n`)
    writeFile("src/b.ts", `import { B } from "@scope/dep"\nexport const z = B\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(2)
    const byFile = new Map(samples.map((s) => [s.filePath.replace(`${tmp}/`, ""), s]))
    expect(byFile.get("src/a.ts")?.allTypeOnly).toBe(true)
    expect(byFile.get("src/a.ts")?.names).toEqual(["A"])
    expect(byFile.get("src/b.ts")?.allTypeOnly).toBe(false)
    expect(byFile.get("src/b.ts")?.names).toEqual(["B"])
  })

  test("specifier match is exact (no prefix / subpath match)", () => {
    writeFile("src/a.ts", `import type { X } from "@scope/dep/sub"\nexport type Y = X\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes test files (no sample even with import)", () => {
    writeFile("src/foo.test.ts", `import { X } from "@scope/dep"\nconst _u = X\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes spec files", () => {
    writeFile("src/foo.spec.ts", `import { X } from "@scope/dep"\nconst _u = X\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes script files", () => {
    writeFile("src/foo.script.ts", `import { X } from "@scope/dep"\nconst _u = X\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes .d.ts files", () => {
    writeFile("src/foo.d.ts", `import { X } from "@scope/dep"\nexport type Y = typeof X\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes node_modules / dist / build / out / generated / coverage", () => {
    for (const dir of ["node_modules", "dist", "build", "out", "generated", "coverage"]) {
      writeFile(`${dir}/x.ts`, `import { X } from "@scope/dep"\nconst _u = X\n`)
    }
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes dotdirs", () => {
    writeFile(".next/x.ts", `import { X } from "@scope/dep"\nconst _u = X\n`)
    writeFile(".turbo/y.ts", `import type { Y } from "@scope/dep"\nexport type _ = Y\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes k8s/", () => {
    writeFile("k8s/synth.ts", `import { X } from "@scope/dep"\nconst _u = X\n`)
    writeFile("deploy/k8s/synth.ts", `import type { Y } from "@scope/dep"\nexport type _ = Y\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes test/ tests/ __tests__/ __fixtures__/", () => {
    for (const dir of ["test", "tests", "__tests__", "__fixtures__"]) {
      writeFile(`${dir}/x.ts`, `import { X } from "@scope/dep"\nconst _u = X\n`)
    }
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("excludes nested workspaces by package.json boundary", () => {
    writeFile("inner/package.json", `{"name":"@scope/inner","version":"0.0.0","private":true}\n`)
    writeFile("inner/src/a.ts", `import { X } from "@scope/dep"\nconst _u = X\n`)
    expect(scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")).toEqual([])
  })

  test("nested-workspace parent's own sources still scanned", () => {
    writeFile("inner/package.json", `{"name":"@scope/inner","version":"0.0.0","private":true}\n`)
    writeFile("inner/src/a.ts", `import { X } from "@scope/dep"\nconst _u = X\n`)
    writeFile("src/b.ts", `import type { Y } from "@scope/dep"\nexport type Z = Y\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.allTypeOnly).toBe(true)
  })

  test("two import declarations in one file → two samples", () => {
    writeFile(
      "src/a.ts",
      `import type { A } from "@scope/dep"\nimport { B } from "@scope/dep"\nexport const _x = B\nexport type _y = A\n`
    )
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(2)
    const allTypeOnly = samples.map((s) => s.allTypeOnly).sort()
    expect(allTypeOnly).toEqual([false, true])
  })

  test("re-exports are captured — value `export { X } from` is allTypeOnly false", () => {
    writeFile("src/a.ts", `export { X } from "@scope/dep"\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.names).toEqual(["X"])
    expect(samples[0]?.allTypeOnly).toBe(false)
    expect(samples[0]?.hasDefaultOrNamespace).toBe(false)
  })

  test("type-only re-export `export type { X } from` is allTypeOnly true", () => {
    writeFile("src/a.ts", `export type { X } from "@scope/dep"\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.names).toEqual(["X"])
    expect(samples[0]?.allTypeOnly).toBe(true)
    expect(samples[0]?.hasDefaultOrNamespace).toBe(false)
  })

  test("inline-typed re-export `export { type X }` is allTypeOnly true", () => {
    writeFile("src/a.ts", `export { type X } from "@scope/dep"\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.names).toEqual(["X"])
    expect(samples[0]?.allTypeOnly).toBe(true)
  })

  test("namespace re-export `export * from` is allTypeOnly false (no names known)", () => {
    writeFile("src/a.ts", `export * from "@scope/dep"\n`)
    const samples = scanWorkspaceImportsOfSpecifier(tmp, "@scope/dep")
    expect(samples).toHaveLength(1)
    expect(samples[0]?.allTypeOnly).toBe(false)
    expect(samples[0]?.hasDefaultOrNamespace).toBe(true)
  })
})
