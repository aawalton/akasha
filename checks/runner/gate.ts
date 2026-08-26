import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync } from "node:fs"
import { resolve } from "node:path"
import { answersAt } from "../../cache/answer.ts"
import { oidOf } from "../../cache/mark.ts"
import type { Check, CheckRun } from "../check-shape.ts"
import { trackedIn, treeOn } from "../tree.ts"
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

export function runGate(checks: readonly Check[], patch: Patch): readonly CheckRun[] {
  const index = `${mkdtempSync(`${SCRATCH}/gate-`)}.index`
  let made: string | null = null
  try {
    const landing = changedBy(patch, index)
    const changed = new Map<string, Buffer | null>()
    const subjects: Subject[] = []
    for (const relPath of landing) {
      const at = resolve(patch.root, relPath)
      const body = git(patch, index, ["cat-file", "blob", `:${relPath}`])
      changed.set(at, body)
      subjects.push({ at, oid: oidOf(body) })
    }
    for (const relPath of named(patch, index, "D")) changed.set(resolve(patch.root, relPath), null)
    const dir = (): string => {
      if (made === null) {
        made = mkdtempSync(`${SCRATCH}/patched-`)
        git(patch, index, ["checkout-index", "--all", `--prefix=${made}/`])
      }
      return made
    }
    const tree = treeOn(patch.root, changed, () => trackedIn(patch.root, index), dir)
    const answers = answersAt(patch.root)
    const runtime = `bun-${process.versions.bun ?? "unknown"}`
    return checks.map((check) => runKept(check, subjects, runtime, answers, tree))
  } finally {
    rmSync(index, { force: true })
    if (made !== null) rmSync(made, { recursive: true, force: true })
  }
}
