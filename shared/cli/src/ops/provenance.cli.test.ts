import { afterAll, describe, expect, it } from "bun:test"
import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  readCheckoutProvenanceAt,
  readRunningCheckout,
  readRunningCheckoutProvenance,
} from "./provenance"

const HERE = import.meta.dir
const scratchDirs: string[] = []

afterAll(() => {
  for (const dir of scratchDirs) rmSync(dir, { recursive: true, force: true })
})

function git(cwd: string, ...args: readonly string[]): string {
  return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
}

function syntheticCheckout(): { root: string; commit: string } {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "ops-provenance-")))
  scratchDirs.push(root)
  writeFileSync(join(root, "package.json"), JSON.stringify({ name: "synthetic", workspaces: [] }))
  git(root, "init", "--initial-branch=synthetic-main")
  git(root, "add", "package.json")
  git(
    root,
    "-c",
    "user.name=test",
    "-c",
    "user.email=test@example.com",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-m",
    "synthetic"
  )
  return { root, commit: git(root, "rev-parse", "HEAD").trim() }
}

describe("readCheckoutProvenanceAt — a checkout other than the one running the test", () => {
  const { root, commit } = syntheticCheckout()

  it("reports that checkout's own commit, not the commit of the tree running the test", () => {
    const p = readCheckoutProvenanceAt(root)
    expect(p.kind).toBe("resolved")
    if (p.kind !== "resolved") return
    expect(p.commit).toBe(commit)
    expect(p.commit).not.toBe(git(HERE, "rev-parse", "HEAD").trim())
  })

  it("anchors on a path inside the checkout, not only on its root", () => {
    const nested = join(root, "packages", "deep")
    mkdirSync(nested, { recursive: true })
    const p = readCheckoutProvenanceAt(nested)
    expect(p.kind).toBe("resolved")
    if (p.kind !== "resolved") return
    expect(p.checkout).toBe(root)
  })

  it("reports the branch and the commit date git actually holds", () => {
    const p = readCheckoutProvenanceAt(root)
    if (p.kind !== "resolved") throw new Error("expected resolved")
    expect(p.branch).toBe("synthetic-main")
    expect(p.committedAt).toBe(git(root, "log", "-1", "--format=%cI", "HEAD").trim())
  })

  it("reads a clean tree as clean", () => {
    const p = readCheckoutProvenanceAt(root)
    if (p.kind !== "resolved") throw new Error("expected resolved")
    expect(p.dirty).toBe(false)
  })
})

describe("readCheckoutProvenanceAt — states that make a bare sha an incomplete answer", () => {
  it("reports a working tree carrying uncommitted code as dirty", () => {
    const { root } = syntheticCheckout()
    writeFileSync(join(root, "extra.ts"), "export const x = 1\n")
    const p = readCheckoutProvenanceAt(root)
    if (p.kind !== "resolved") throw new Error("expected resolved")
    expect(p.dirty).toBe(true)
  })

  it("reports a detached HEAD as having no branch", () => {
    const { root, commit } = syntheticCheckout()
    git(root, "update-ref", "--no-deref", "HEAD", commit)
    const p = readCheckoutProvenanceAt(root)
    if (p.kind !== "resolved") throw new Error("expected resolved")
    expect(p.branch).toBeNull()
    expect(p.commit).toBe(commit)
  })
})

describe("readCheckoutProvenanceAt — refuses to attribute a commit it cannot tie to the checkout", () => {
  it("names the path but no commit when the checkout has no git at all", () => {
    const root = realpathSync(mkdtempSync(join(tmpdir(), "ops-provenance-nogit-")))
    scratchDirs.push(root)
    writeFileSync(join(root, "package.json"), JSON.stringify({ name: "nogit", workspaces: [] }))
    const p = readCheckoutProvenanceAt(root)
    expect(p.kind).toBe("unattributable")
    expect(p.checkout).toBe(root)
    if (p.kind !== "unattributable") return
    expect(p.reason).toBe("not a git checkout")
  })

  it("refuses when git answers about an enclosing tree rather than this checkout", () => {
    const { root } = syntheticCheckout()
    const inner = join(root, "vendored")
    mkdirSync(inner, { recursive: true })
    writeFileSync(join(inner, "package.json"), JSON.stringify({ name: "inner", workspaces: [] }))
    const p = readCheckoutProvenanceAt(inner)
    expect(p.kind).toBe("unattributable")
    if (p.kind !== "unattributable") return
    expect(p.checkout).toBe(inner)
    expect(p.reason).toContain("git describes a different tree")
    expect(p.reason).toContain(root)
  })

  it("names the anchor when there is no checkout root above it", () => {
    const orphan = realpathSync(mkdtempSync(join(tmpdir(), "ops-provenance-orphan-")))
    scratchDirs.push(orphan)
    const p = readCheckoutProvenanceAt(orphan)
    expect(p.kind).toBe("unattributable")
    if (p.kind !== "unattributable") return
    expect(p.reason).toContain("no checkout root")
  })
})

describe("readRunningCheckoutProvenance — the running checkout", () => {
  it("reports the checkout this module was loaded from", () => {
    const p = readRunningCheckoutProvenance()
    expect(p.kind).toBe("resolved")
    if (p.kind !== "resolved") return
    expect(p.checkout).toBe(git(HERE, "rev-parse", "--show-toplevel").trim())
    expect(p.commit).toBe(git(HERE, "rev-parse", "HEAD").trim())
  })
})

describe("readRunningCheckout — the same rule, without the freshness reads", () => {
  it("reports the checkout this module was loaded from", () => {
    const c = readRunningCheckout()
    expect(c.kind).toBe("resolved")
    if (c.kind !== "resolved") return
    expect(c.checkout).toBe(git(HERE, "rev-parse", "--show-toplevel").trim())
    expect(c.commit).toBe(git(HERE, "rev-parse", "HEAD").trim())
  })

  it("agrees with the full reader on every fact they share", () => {
    const c = readRunningCheckout()
    const p = readRunningCheckoutProvenance()
    expect(c.kind).toBe(p.kind)
    if (c.kind !== "resolved" || p.kind !== "resolved") return
    expect(c.checkout).toBe(p.checkout)
    expect(c.commit).toBe(p.commit)
    expect(c.branch).toBe(p.branch)
  })

  it("does not read the working tree, so a dirty tree cannot change its answer", () => {
    const c: Record<string, unknown> = { ...readRunningCheckout() }
    expect("dirty" in c).toBe(false)
    expect("committedAt" in c).toBe(false)
  })
})
