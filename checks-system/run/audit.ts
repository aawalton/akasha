import { relative } from "node:path"
import { answersAt } from "../../cache/cache.ts"
import { duringOneCall } from "../../during-call/during-call.ts"
import { oidsUnder } from "../../repo/oid/oid.ts"
import { RUNTIME_MARK } from "../../page/runtime/runtime.ts"
import { contextOver } from "../../cache/said/said.ts"
import type { Check, CheckRun } from "../check/check-shape.ts"
import { onDisk } from "./tree.ts"
import { forgetRetired, runKept, type Subject } from "./kept.ts"
import { checksFound } from "../checks.ts"

export function judgesAuthor(check: Check): boolean {
  return check.needsAuthor === true
}

export function runAudit(checks: readonly Check[], root: string): readonly CheckRun[] {
  return duringOneCall(() => auditRun(checks, root))
}

function auditRun(checks: readonly Check[], root: string): readonly CheckRun[] {
  const tree = onDisk(root)
  const oids = oidsUnder(root, null)
  const ctx = contextOver(root, RUNTIME_MARK, oids)
  const subjects: Subject[] = []
  for (const path of tree.paths()) {
    const oid = oids.get(relative(root, path))
    if (oid === undefined) continue
    subjects.push({ at: path, oid })
  }
  const answers = answersAt(root)
  forgetRetired(answers, checksFound(root))
  const runs = checks
    .filter((one) => !judgesAuthor(one))
    .map((check) =>
      runKept(check, subjects, RUNTIME_MARK, answers, tree, {
        act: null,
        before: null,
        trial: false,
        oids,
        ctx,
      })
    )
  ctx.said.done()
  return runs
}
