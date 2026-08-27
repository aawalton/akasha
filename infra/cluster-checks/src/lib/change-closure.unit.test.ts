import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { CHANGED_FILES_MANIFEST, describeClosure, resolveChangeClosure } from "./change-closure.ts"

const SCRATCH_ROOT = "/var/tmp"

const WIDENING = [
  "infra/cluster-checks/",
  "shared/pages-core/src/page-type-sequence-name.ts",
]

function rootWithManifest(lines: readonly string[] | undefined): string {
  const root = mkdtempSync(join(SCRATCH_ROOT, "change-closure-"))
  if (lines !== undefined) {
    mkdirSync(join(root, ".ci"), { recursive: true })
    writeFileSync(join(root, CHANGED_FILES_MANIFEST), `${lines.join("\n")}\n`)
  }
  return root
}

describe("resolveChangeClosure", () => {
  test("no manifest is the whole tree — nothing states the change, so nothing may be skipped", () => {
    const root = rootWithManifest(undefined)
    try {
      expect(resolveChangeClosure({ repoRoot: root, widening: WIDENING }).kind).toBe("whole-tree")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("an ordinary change yields exactly the changed set", () => {
    const root = rootWithManifest(["shared/pages-query/src/a.ts", "docs/b.md"])
    try {
      const closure = resolveChangeClosure({ repoRoot: root, widening: WIDENING })
      expect(closure.kind).toBe("changed-files")
      if (closure.kind !== "changed-files") throw new Error("unreachable")
      expect(closure.files.has("shared/pages-query/src/a.ts")).toBe(true)
      expect(closure.files.has("shared/pages-query/src/other.ts")).toBe(false)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a change under a widening PREFIX returns the whole tree", () => {
    const root = rootWithManifest([
      "shared/pages-query/src/a.ts",
      "infra/cluster-checks/src/lib/ts-enum-declarations.ts",
    ])
    try {
      expect(resolveChangeClosure({ repoRoot: root, widening: WIDENING }).kind).toBe("whole-tree")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a change to a widening FILE returns the whole tree", () => {
    const root = rootWithManifest(["shared/pages-core/src/page-type-sequence-name.ts"])
    try {
      expect(resolveChangeClosure({ repoRoot: root, widening: WIDENING }).kind).toBe("whole-tree")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a path merely sharing a prefix's leading text does not widen", () => {
    const root = rootWithManifest(["shared/pages-core/src/page-type-sequence-name.ts.bak"])
    try {
      expect(resolveChangeClosure({ repoRoot: root, widening: WIDENING }).kind).toBe(
        "changed-files"
      )
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("an empty manifest is a real empty closure, not a missing one", () => {
    const root = rootWithManifest([])
    try {
      const closure = resolveChangeClosure({ repoRoot: root, widening: WIDENING })
      expect(closure.kind).toBe("changed-files")
      if (closure.kind !== "changed-files") throw new Error("unreachable")
      expect(closure.files.size).toBe(0)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})

describe("describeClosure", () => {
  test("a narrowed run and a whole-tree run do not read the same", () => {
    const narrowed = describeClosure({ kind: "changed-files", files: new Set(["a.ts"]) })
    const whole = describeClosure({ kind: "whole-tree", reason: "no manifest" })
    expect(narrowed).not.toBe(whole)
    expect(whole).toContain("whole tree")
    expect(whole).toContain("no manifest")
  })
})
