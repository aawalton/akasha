import { describe, expect, it } from "bun:test"

import { generateWorkspaceBunService } from "./generate-dockerfiles-bun"
import type { DockerfileExtensions, ServiceConfig } from "./generate-dockerfiles-types"

const CONFIG: ServiceConfig = { type: "bun-service", dir: "packages/synthetic/app" }
const ALL_WORKSPACE_DIRS = [
  "packages/synthetic/app",
  "packages/synthetic/pkg-0",
  "packages/synthetic/pkg-1",
] as const

function synthDepDirs(n: number): readonly string[] {
  return Array.from({ length: n }, (_, i) => `packages/synthetic/pkg-${i}`)
}

function generate(depDirs: readonly string[], ext: DockerfileExtensions = {}): string {
  return generateWorkspaceBunService(
    "synthetic",
    CONFIG,
    new Map<string, string>(),
    ext,
    [],
    depDirs,
    ALL_WORKSPACE_DIRS
  )
}

function copyLines(dockerfile: string): readonly string[] {
  return dockerfile.split("\n").filter((l) => l.startsWith("COPY"))
}

describe("generateWorkspaceBunService — every stacking COPY carries --link (#15636)", () => {
  it("emits no bare `COPY` — every generator-emitted COPY is `COPY --link` (fat and thin)", () => {
    for (const n of [1, 80]) {
      const bare = copyLines(generate(synthDepDirs(n))).filter((l) => !l.startsWith("COPY --link"))
      expect(bare).toEqual([])
    }
  })

  it("--link's the workspace-wide package.json family (the dominant layer-budget share)", () => {
    const df = generate(synthDepDirs(10))
    for (const dir of ALL_WORKSPACE_DIRS) {
      expect(df).toContain(`COPY --link ${dir}/package.json ./${dir}/package.json`)
    }
    const barePkgJson = df.split("\n").filter((l) => /^COPY (?!--link)[^ ]*package\.json/.test(l))
    expect(barePkgJson).toEqual([])
  })

  it("--link's the O(closure) source family in BOTH the build and runtime stages", () => {
    const depDirs = synthDepDirs(80)
    const df = generate(depDirs)
    for (const dir of [...depDirs, CONFIG.dir]) {
      expect(df).toContain(`COPY --link ${dir} ./${dir}`)
      expect(df).toContain(`COPY --link --from=build /workspace/${dir} ./${dir}`)
    }
  })

  it("--link's the fixed runtime cross-stage copies (node_modules, tsconfig, package.json)", () => {
    const df = generate(synthDepDirs(5))
    expect(df).toContain("COPY --link --from=build /workspace/node_modules ./node_modules")
    expect(df).toContain(
      "COPY --link --from=build /workspace/tsconfig.base.json ./tsconfig.base.json"
    )
    expect(df).toContain("COPY --link --from=build /workspace/package.json ./package.json")
  })

  it("--link's extra_source_copies in both stages, and keeps the closure pruned (no whole-tree COPY)", () => {
    const ext: DockerfileExtensions = { extra_source_copies: ["packages/agents/shared"] }
    const df = generate(synthDepDirs(40), ext)
    expect(df).toContain("COPY --link packages/agents/shared ./packages/agents/shared")
    expect(df).toContain(
      "COPY --link --from=build /workspace/packages/agents/shared ./packages/agents/shared"
    )
    expect(df).not.toContain("COPY --link --from=build /workspace/packages ./packages")
    expect(df).not.toContain("COPY packages ./packages")
  })

  it("does not depend on a build-stage RUN-mkdir before a --link COPY (dest is materialized independently)", () => {
    const df = generate(synthDepDirs(10))
    expect(df).not.toContain("RUN mkdir")
  })
})
