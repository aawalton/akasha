import { execFileSync } from "node:child_process"
import { mkdtempSync, rmSync } from "node:fs"
import { resolve } from "node:path"
import { answersAt } from "../../cache/cache.ts"
import { oidsUnder } from "../../repo/oid/oid.ts"
import { contextOver } from "../../cache/said/said.ts"
import type { Check, CheckRun } from "../check/check-shape.ts"
import { installedInto, linkedInto } from "../../workspace-package/packages.ts"
import { onDisk, trackedIn, treeOn } from "./tree.ts"
import { forgetRetired, runKept, type Subject } from "./kept.ts"
import { checksFound } from "../checks.ts"

const SCRATCH = "/var/tmp"

const BUFFER_CEILING = 64 * 1024 * 1024

export type Patch = {
  readonly root: string
  readonly file: string
  readonly writer: string | null
  readonly mechanical: boolean
  readonly goneElsewhere: readonly string[]
  readonly repointedElsewhere: ReadonlyMap<string, string>
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
    "--no-renames",
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

export function applying(checks: readonly Check[], mechanical: boolean): readonly Check[] {
  return mechanical ? checks.filter((one) => one.needsAuthor !== true) : checks
}

export function runGate(checks: readonly Check[], patch: Patch): readonly CheckRun[] {
  const index = `${mkdtempSync(`${SCRATCH}/gate-`)}.index`
  let made: string | null = null
  try {
    const landing = changedBy(patch, index)
    const staged = oidsUnder(patch.root, index)
    const changed = new Map<string, Buffer | null>()
    const subjects: Subject[] = []
    for (const relPath of landing) {
      const at = resolve(patch.root, relPath)
      changed.set(at, git(patch, index, ["cat-file", "blob", `:${relPath}`]))
      const oid = staged.get(relPath)
      if (oid !== undefined) subjects.push({ at, oid })
    }
    for (const relPath of named(patch, index, "D")) changed.set(resolve(patch.root, relPath), null)
    const dir = (): string => {
      if (made === null) {
        made = mkdtempSync(`${SCRATCH}/patched-`)
        git(patch, index, ["checkout-index", "--all", `--prefix=${made}/`])
        installedInto(patch.root, made)
        linkedInto(made)
      }
      return made
    }
    const tree = treeOn(
      patch.root,
      changed,
      () => trackedIn(patch.root, index),
      dir,
      () => patch.goneElsewhere,
      () => patch.repointedElsewhere
    )
    const answers = answersAt(patch.root)
    forgetRetired(answers, checksFound(patch.root))
    const runtime = `bun-${process.versions.bun ?? "unknown"}`
    const oids = oidsUnder(patch.root, null)
    const ctx = contextOver(patch.root, runtime, oids)
    const act = patch.mechanical ? null : { writer: patch.writer, before: onDisk(patch.root) }
    const runs = applying(checks, patch.mechanical).map((check) =>
      runKept(check, subjects, runtime, answers, tree, { act, trial: true, oids, ctx })
    )
    ctx.said.done()
    return runs
  } finally {
    rmSync(index, { force: true })
    if (made !== null) rmSync(made, { recursive: true, force: true })
  }
}
