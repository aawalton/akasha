import { relative } from "node:path"
import { answersAt } from "../../cache/answer.ts"
import { contextOver } from "../../cache/closure.ts"
import { oidsUnder } from "../../cache/oid.ts"
import type { Check, CheckRun } from "../check-shape.ts"
import { onDisk } from "../tree.ts"
import { judgesAuthor } from "./all.ts"
import { runKept, type Subject } from "./kept.ts"

export function runAudit(checks: readonly Check[], root: string): readonly CheckRun[] {
  const tree = onDisk(root)
  const oids = oidsUnder(root, null)
  const ctx = contextOver(root)
  const subjects: Subject[] = []
  for (const path of tree.paths()) {
    const oid = oids.get(relative(root, path))
    if (oid === undefined) continue
    subjects.push({ at: path, oid })
  }
  const answers = answersAt(root)
  const runtime = `bun-${process.versions.bun ?? "unknown"}`
  return checks
    .filter((one) => !judgesAuthor(one))
    .map((check) => runKept(check, subjects, runtime, answers, tree, { act: null, trial: false, oids, ctx }))
}
