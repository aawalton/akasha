import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync } from "node:fs"
import { resolve } from "node:path"
import { answersAt } from "../../cache/answer.ts"
import type { Check, CheckRun } from "../check-shape.ts"
import { treeOn } from "../tree.ts"
import { runKept, type Subject } from "./kept.ts"

const SCRATCH = "/var/tmp"

const BUFFER_CEILING = 64 * 1024 * 1024

export type Patch = {
  readonly root: string
  readonly file: string
}

function git(patch: Patch, index: string, args: readonly string[]): Buffer {
  return execFileSync("git", ["-C", patch.root, ...args], {
    maxBuffer: BUFFER_CEILING,
    env: { ...process.env, GIT_INDEX_FILE: index },
  })
}

function named(patch: Patch, index: string, filter: string): readonly string[] {
  const out = git(patch, index, [
    "diff",
    "--cached",
    "--name-only",
    `--diff-filter=${filter}`,
    "-z",
    "HEAD",
  ])
  return out.toString("utf8").split("\0").filter((one) => one !== "")
}

export function changedBy(patch: Patch, index: string): readonly string[] {
  git(patch, index, ["read-tree", "HEAD"])
  git(patch, index, ["apply", "--cached", patch.file])
  return named(patch, index, "AM")
}

function oidsIn(patch: Patch, index: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const line of git(patch, index, ["ls-files", "-s", "-z"]).toString("utf8").split("\0")) {
    if (line === "") continue
    const [meta, path] = line.split("\t")
    const oid = meta?.split(" ")[1]
    if (oid !== undefined && path !== undefined) found.set(path, oid)
  }
  return found
}

export function runGate(checks: readonly Check[], patch: Patch): readonly CheckRun[] {
  const index = `${mkdtempSync(`${SCRATCH}/gate-`)}.index`
  try {
    const landing = changedBy(patch, index)
    const oids = oidsIn(patch, index)
    const changed = new Map<string, Buffer | null>()
    const subjects: Subject[] = []
    for (const relPath of landing) {
      const at = resolve(patch.root, relPath)
      changed.set(at, git(patch, index, ["cat-file", "blob", `:${relPath}`]))
      const oid = oids.get(relPath)
      if (oid !== undefined) subjects.push({ at, oid })
    }
    for (const relPath of named(patch, index, "D")) changed.set(resolve(patch.root, relPath), null)
    const tree = treeOn(patch.root, changed)
    const answers = answersAt(patch.root)
    const runtime = `bun-${process.versions.bun ?? "unknown"}`
    return checks.map((check) => runKept(check, subjects, runtime, answers, tree))
  } finally {
    rmSync(index, { force: true })
  }
}
