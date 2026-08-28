import { describe, expect, it } from "bun:test"

import { buildPackageNameMap } from "./generate-dockerfiles-deps.ts"
import { collectExecutedDeps, listEntryRoots } from "./generate-dockerfiles-imports.ts"
import { SERVICES } from "./generate-dockerfiles-registry.ts"

const NAME_MAP = buildPackageNameMap()

const BUN_SERVICES = Object.entries(SERVICES).filter(([, c]) => c.type === "bun-service")

const GFS_PROMOTER_DIR = "infra/k8s-postgres-gfs-promoter"

describe("collectExecutedDeps — a bun-service carries what it imports, not what it declares (#19458)", () => {
  it("answers for every registered bun-service, and every workspace import resolves", () => {
    for (const [name, config] of BUN_SERVICES) {
      const deps = collectExecutedDeps(config.dir, NAME_MAP)
      expect(deps, name).toBeArray()
      for (const dep of deps) expect(NAME_MAP.has(dep), `${name} -> ${dep}`).toBe(true)
    }
  })

  it("leaves out a package whose whole surface is a type — @shared/supabase-database exports only `export type`", () => {
    for (const [name, config] of BUN_SERVICES) {
      expect(collectExecutedDeps(config.dir, NAME_MAP), name).not.toContain(
        "@shared/supabase-database"
      )
    }
  })

  it("roots the closure at every module under the app's src/, not only the CMD entrypoint", () => {
    const roots = listEntryRoots(GFS_PROMOTER_DIR)
    expect(roots.some((r) => r.endsWith(`${GFS_PROMOTER_DIR}/src/main.ts`))).toBe(true)
    expect(roots.some((r) => r.endsWith(`${GFS_PROMOTER_DIR}/src/longtail-main.ts`))).toBe(true)
  })

  it("leaves test files out of the roots — a --production image installs no devDependencies", () => {
    for (const [name, config] of BUN_SERVICES) {
      const tests = listEntryRoots(config.dir).filter((r) => /\.test\.tsx?$/.test(r))
      expect(tests, name).toEqual([])
    }
  })
})
