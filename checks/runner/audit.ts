import { answersAt } from "../../cache/answer.ts"
import { oidOf } from "../../cache/mark.ts"
import type { Check, CheckRun } from "../check-shape.ts"
import { onDisk } from "../tree.ts"
import { runKept, type Subject } from "./kept.ts"

export function runAudit(checks: readonly Check[], root: string): readonly CheckRun[] {
  const tree = onDisk(root)
  const subjects: Subject[] = []
  for (const path of tree.paths()) {
    const body = tree.at(path)
    if (body === null) continue
    subjects.push({ at: path, oid: oidOf(body) })
  }
  const answers = answersAt(root)
  const runtime = `bun-${process.versions.bun ?? "unknown"}`
  return checks.map((check) => runKept(check, subjects, runtime, answers, tree))
}
