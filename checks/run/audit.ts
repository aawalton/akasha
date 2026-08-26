import { relative } from "node:path"
import { answersAt } from "../../cache/cache.ts"
import { oidsUnder } from "../../repo/oid.ts"
import { contextOver } from "../../cache/said/said.ts"
import type { Check, CheckRun } from "../check/check-shape.ts"
import { onDisk } from "./tree.ts"
import { judgesAuthor } from "./all.ts"
import { runKept, type Subject } from "./kept.ts"

export function runAudit(checks: readonly Check[], root: string): readonly CheckRun[] {
  const tree = onDisk(root)
  const oids = oidsUnder(root, null)
  const runtime = `bun-${process.versions.bun ?? "unknown"}`
  const ctx = contextOver(root, runtime, oids)
  const subjects: Subject[] = []
  for (const path of tree.paths()) {
    const oid = oids.get(relative(root, path))
    if (oid === undefined) continue
    subjects.push({ at: path, oid })
  }
  const answers = answersAt(root)
  const runs = checks
    .filter((one) => !judgesAuthor(one))
    .map((check) => runKept(check, subjects, runtime, answers, tree, { act: null, trial: false, oids, ctx }))
  ctx.said.done()
  return runs
}
