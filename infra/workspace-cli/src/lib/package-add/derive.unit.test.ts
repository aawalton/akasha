import { describe, expect, it } from "bun:test"
import {
  appendWorkspace,
  buildClaudeMd,
  buildPackageJson,
  decideAppendWorkspace,
  derivePackageName,
  isFunctionalType,
  packagePathProblem,
} from "./derive"

describe("derivePackageName", () => {
  it("derives @scope/name from a two-segment path", () => {
    expect(derivePackageName("stories/engine")).toBe("@stories/engine")
  })

  it("joins nested segments with hyphens", () => {
    expect(derivePackageName("lua-compiler/vendor/addons")).toBe("@lua-compiler/vendor-addons")
    expect(derivePackageName("temper/game/trading/addon")).toBe("@temper/game-trading-addon")
  })

  it("throws on a scope-only path (no package segment)", () => {
    expect(() => derivePackageName("stories")).toThrow()
  })
})

describe("packagePathProblem", () => {
  it("accepts a flattened <scope>/<segment> path", () => {
    expect(packagePathProblem("stories/engine")).toBeNull()
    expect(packagePathProblem("temper/game/trading/addon")).toBeNull()
  })

  it("refuses a path under the packages/ root this repository does not have", () => {
    const why = packagePathProblem("packages/stories/engine")
    expect(why).toContain("packages/")
    expect(why).toContain("stories/engine")
  })

  it("refuses a scope-only path", () => {
    expect(packagePathProblem("stories")).toContain("only a scope")
  })

  it("refuses a path that is not plain and repo-relative", () => {
    expect(packagePathProblem("")).not.toBeNull()
    expect(packagePathProblem("/shared/widget")).not.toBeNull()
    expect(packagePathProblem("shared//widget")).not.toBeNull()
    expect(packagePathProblem("../shared/widget")).not.toBeNull()
    expect(packagePathProblem("shared\\widget")).not.toBeNull()
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
    expect(appendWorkspace(["a/b", "c/d"], "e/f")).toEqual(["a/b", "c/d", "e/f"])
  })

  it("does not mutate the input array", () => {
    const input = ["a/b"]
    appendWorkspace(input, "c/d")
    expect(input).toEqual(["a/b"])
  })

  it("throws if the path is already registered", () => {
    expect(() => appendWorkspace(["a/b"], "a/b")).toThrow(/already registered/)
  })
})

describe("decideAppendWorkspace", () => {
  const workspaces = ["shared/a", "temper/addons/*", "temper/addons/*/*"]

  it("no-ops (no literal) when a /* glob already covers the new addon", () => {
    expect(decideAppendWorkspace(workspaces, "temper/addons/newaddon")).toEqual({
      workspaces,
      added: false,
    })
  })

  it("no-ops for a nested addon covered by /*/*", () => {
    expect(decideAppendWorkspace(workspaces, "temper/addons/characters/cli2").added).toBe(
      false
    )
  })

  it("appends a literal for a non-covered (non-addon) path", () => {
    const result = decideAppendWorkspace(workspaces, "shared/new")
    expect(result.added).toBe(true)
    expect(result.workspaces).toEqual([...workspaces, "shared/new"])
  })
})
