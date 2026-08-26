import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { answersAt } from "../../cache/answer.ts"
import type { Check, CheckRun } from "../check-shape.ts"
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
  const overlay = mkdtempSync(`${SCRATCH}/gate-`)
  const index = `${overlay}.index`
  try {
    const changed = changedBy(patch, index)
    const oids = oidsIn(patch, index)
    const inRepo = new Map<string, string>()
    const subjects: Subject[] = []
    for (const rel of changed) {
      const at = resolve(overlay, rel)
      mkdirSync(dirname(at), { recursive: true })
      writeFileSync(at, git(patch, index, ["cat-file", "blob", `:${rel}`]))
      inRepo.set(at, resolve(patch.root, rel))
      const oid = oids.get(rel)
      if (oid !== undefined) subjects.push({ at, oid })
    }
    const answers = answersAt(patch.root)
    const runtime = `bun-${process.versions.bun ?? "unknown"}`
    return checks
      .map((check) => runKept(check, subjects, runtime, answers, patch.root))
      .map((ran) =>
        "threw" in ran
          ? ran
          : {
              slug: ran.slug,
              failures: ran.failures.map((one) => ({
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
