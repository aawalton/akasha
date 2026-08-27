import { describe, expect, it } from "bun:test"
import {
  appendWorkspace,
  buildClaudeMd,
  buildPackageJson,
  decideAppendWorkspace,
  derivePackageName,
  isFunctionalType,
} from "./derive"

describe("derivePackageName", () => {
  it("derives @scope/name from a two-segment path", () => {
    expect(derivePackageName("packages/stories/engine")).toBe("@stories/engine")
  })

  it("joins nested segments with hyphens", () => {
    expect(derivePackageName("packages/shared/pages/core")).toBe("@shared/pages-core")
    expect(derivePackageName("packages/temper/game/trading/addon")).toBe(
      "@temper/game-trading-addon"
    )
  })

  it("throws on a path outside packages/", () => {
    expect(() => derivePackageName("apps/foo")).toThrow()
  })

  it("throws on a scope-only path (no package segment)", () => {
    expect(() => derivePackageName("packages/stories")).toThrow()
  })
})

describe("isFunctionalType", () => {
  it("accepts every taxonomy value", () => {
    for (const t of [
      "pure",
      "access",
      "next-ui",
      "local-service",
      "next-app",
      "service",
      "worker",
      "program",
      "addon",
    ]) {
      expect(isFunctionalType(t)).toBe(true)
    }
  })

  it("rejects an unknown value", () => {
    expect(isFunctionalType("bogus")).toBe(false)
  })
})

describe("buildPackageJson", () => {
  it("pure → minimal three-field manifest", () => {
    expect(buildPackageJson("@stories/engine", "pure")).toEqual({
      name: "@stories/engine",
      functionalType: "pure",
      private: true,
    })
  })

  it("non-pure → adds version and type:module", () => {
    expect(buildPackageJson("@shared/widget", "access")).toEqual({
      name: "@shared/widget",
      functionalType: "access",
      version: "0.1.0",
      type: "module",
      private: true,
    })
  })
})

describe("buildClaudeMd", () => {
  it("emits description frontmatter and a heading", () => {
    const md = buildClaudeMd("@stories/engine")
    expect(md.startsWith("---\n")).toBe(true)
    expect(md).toContain("description: @stories/engine")
    expect(md).not.toContain("reviewedAt")
    expect(md).toContain("# @stories/engine")
  })
})

describe("appendWorkspace", () => {
  it("appends the path to the end, preserving order", () => {
    expect(appendWorkspace(["packages/a/b", "packages/c/d"], "packages/e/f")).toEqual([
      "packages/a/b",
      "packages/c/d",
      "packages/e/f",
    ])
  })

  it("does not mutate the input array", () => {
    const input = ["packages/a/b"]
    appendWorkspace(input, "packages/c/d")
    expect(input).toEqual(["packages/a/b"])
  })

  it("throws if the path is already registered", () => {
    expect(() => appendWorkspace(["packages/a/b"], "packages/a/b")).toThrow(/already registered/)
  })
})

describe("decideAppendWorkspace", () => {
  const workspaces = ["packages/shared/a", "packages/temper/addons/*", "packages/temper/addons/*/*"]

  it("no-ops (no literal) when a /* glob already covers the new addon", () => {
    expect(decideAppendWorkspace(workspaces, "packages/temper/addons/newaddon")).toEqual({
      workspaces,
      added: false,
    })
  })

  it("no-ops for a nested addon covered by /*/*", () => {
    expect(decideAppendWorkspace(workspaces, "packages/temper/addons/characters/cli2").added).toBe(
      false
    )
  })

  it("appends a literal for a non-covered (non-addon) path", () => {
    const result = decideAppendWorkspace(workspaces, "packages/shared/new")
    expect(result.added).toBe(true)
    expect(result.workspaces).toEqual([...workspaces, "packages/shared/new"])
  })
})
