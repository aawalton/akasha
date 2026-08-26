import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import type { Check, CheckOutcome } from "../check-shape.ts"
import { runAll } from "./all.ts"

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

export function changedBy(patch: Patch, index: string): readonly string[] {
  git(patch, index, ["read-tree", "HEAD"])
  git(patch, index, ["apply", "--cached", patch.file])
  const named = git(patch, index, [
    "diff",
    "--cached",
    "--name-only",
    "--diff-filter=AM",
    "-z",
    "HEAD",
  ])
  return named.toString("utf8").split("\0").filter((one) => one !== "")
}

export function runGate(checks: readonly Check[], patch: Patch): readonly CheckOutcome[] {
  const overlay = mkdtempSync(`${SCRATCH}/gate-`)
  const index = `${overlay}.index`
  try {
    const changed = changedBy(patch, index)
    const inRepo = new Map<string, string>()
    for (const rel of changed) {
      const at = resolve(overlay, rel)
      mkdirSync(dirname(at), { recursive: true })
      writeFileSync(at, git(patch, index, ["cat-file", "blob", `:${rel}`]))
      inRepo.set(at, resolve(patch.root, rel))
    }
    return runAll(checks, [...inRepo.keys()]).map((outcome) =>
      "threw" in outcome
        ? outcome
        : {
            slug: outcome.slug,
            failures: outcome.failures.map((one) => ({
              path: inRepo.get(one.path) ?? one.path,
              reason: one.reason,
            })),
          }
    )
  } finally {
    rmSync(overlay, { recursive: true, force: true })
    rmSync(index, { force: true })
  }
}
