import { describe, expect, it } from "bun:test"
import { deriveNewTarget, deriveOldDir, toRefPath } from "./tsconfig-rewrites"
import type { WorkspaceMove } from "./types"

const move: WorkspaceMove = {
  old: "packages/shared/foo",
  new: "packages/shared/bar",
  oldName: "@shared/foo",
  newName: "@shared/bar",
}

describe("deriveOldDir", () => {
  it("unchanged for paths outside the moved directory", () => {
    expect(deriveOldDir("packages/shared/other", move)).toBe("packages/shared/other")
  })

  it("rewinds the moved directory itself", () => {
    expect(deriveOldDir("packages/shared/bar", move)).toBe("packages/shared/foo")
  })

  it("rewinds descendants of the moved directory", () => {
    expect(deriveOldDir("packages/shared/bar/src", move)).toBe("packages/shared/foo/src")
    expect(deriveOldDir("packages/shared/bar/a/b/c", move)).toBe("packages/shared/foo/a/b/c")
  })

  it("does not confuse similar-prefix siblings", () => {
    expect(deriveOldDir("packages/shared/barbell", move)).toBe("packages/shared/barbell")
  })

  it("no-op when old === new", () => {
    const renameOnly: WorkspaceMove = {
      old: "packages/shared/foo",
      new: "packages/shared/foo",
      oldName: "@shared/foo",
      newName: "@shared/renamed",
    }
    expect(deriveOldDir("packages/shared/foo/src", renameOnly)).toBe("packages/shared/foo/src")
  })
})

describe("deriveNewTarget", () => {
  it("unchanged for paths outside the moved directory", () => {
    expect(deriveNewTarget("packages/shared/other", move)).toBe("packages/shared/other")
  })

  it("applies rename to the moved directory itself", () => {
    expect(deriveNewTarget("packages/shared/foo", move)).toBe("packages/shared/bar")
  })

  it("applies rename to descendants of the moved directory", () => {
    expect(deriveNewTarget("packages/shared/foo/src", move)).toBe("packages/shared/bar/src")
  })

  it("does not confuse similar-prefix siblings", () => {
    expect(deriveNewTarget("packages/shared/foobar", move)).toBe("packages/shared/foobar")
  })
})

describe("toRefPath", () => {
  it("returns '.' when target is the dir itself", () => {
    expect(toRefPath("packages/a/b", "packages/a/b")).toBe(".")
  })

  it("preserves leading './' for same-dir targets (self-references must stay relative)", () => {
    expect(toRefPath("packages/a/b", "packages/a/b/tsconfig.json")).toBe("./tsconfig.json")
    expect(toRefPath("packages/shared/pages/ui", "packages/shared/pages/ui/tsconfig.json")).toBe(
      "./tsconfig.json"
    )
  })

  it("preserves '../' for ancestor-directory targets", () => {
    expect(toRefPath("packages/a/b", "packages/a/c")).toBe("../c")
    expect(toRefPath("packages/a/b/c", "packages/a")).toBe("../..")
  })
})
