import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { codeRoot } from "../../../../../../instructions/tools/lib/code-root.ts"
import { rewriteImports } from "./codemod"
import { exists, runCapture } from "./fs"
import type { Logger } from "./logger"
import { organizeImports } from "./organize-imports"
import type { WorkspaceMove } from "./types"

const REPO_ROOT = codeRoot()
const REPO_BIOME_BIN = join(REPO_ROOT, "node_modules/@biomejs/biome/bin/biome")

const OTHER = "@FIXTURE/MMM"
const OLD = "@FIXTURE/ZZZ"
const NEW = "@FIXTURE/AAA"

const move: WorkspaceMove = {
  old: "packages/fixture/zzz",
  new: "packages/fixture/aaa",
  oldName: OLD,
  newName: NEW,
}

const silent: Logger = { info: () => {}, warn: () => {} }

const roots: string[] = []
afterAll(() => {
  for (const r of roots) rmSync(r, { recursive: true, force: true })
})

function fixtureRoot(sample: string): string {
  const r = mkdtempSync(join(tmpdir(), "organize-imports-"))
  roots.push(r)
  writeFileSync(
    join(r, "biome.json"),
    JSON.stringify({
      $schema: "https://biomejs.dev/schemas/2.4.7/schema.json",
      assist: { actions: { source: { organizeImports: "on" } } },
    })
  )
  mkdirSync(join(r, "node_modules/.bin"), { recursive: true })
  symlinkSync(REPO_BIOME_BIN, join(r, "node_modules/.bin/biome"))
  writeFileSync(join(r, "sample.ts"), sample)
  return r
}

describe("organizeImports re-sorts import blocks the codemod disturbs", () => {
  it("resolves the repo biome bin (sanity)", () => {
    expect(exists(REPO_ROOT, "node_modules/@biomejs/biome/bin/biome")).toBe(true)
  })

  it("a sort-shifting rename comes out organized", () => {
    const root = fixtureRoot(
      `import { m } from "${OTHER}"\nimport { z } from "${OLD}"\n\nexport const x = m + z\n`
    )

    const touched = rewriteImports(root, move, silent)
    expect(touched).toEqual(["sample.ts"])

    const afterCodemod = readFileSync(join(root, "sample.ts"), "utf8")
    expect(afterCodemod.indexOf(NEW)).toBeGreaterThan(afterCodemod.indexOf(OTHER))

    organizeImports(root, touched, silent)

    const afterOrganize = readFileSync(join(root, "sample.ts"), "utf8")
    expect(afterOrganize.indexOf(NEW)).toBeLessThan(afterOrganize.indexOf(OTHER))

    const verdict = runCapture(root, join(root, "node_modules/.bin/biome"), [
      "check",
      "--linter-enabled=false",
      "--formatter-enabled=false",
      join(root, "sample.ts"),
    ])
    expect(verdict.status).toBe(0)
  })

  it("no-op on an empty touched set (path-only move)", () => {
    const root = fixtureRoot(`import { m } from "${OTHER}"\n\nexport const x = m\n`)
    const before = readFileSync(join(root, "sample.ts"), "utf8")
    organizeImports(root, [], silent)
    expect(readFileSync(join(root, "sample.ts"), "utf8")).toBe(before)
  })
})
