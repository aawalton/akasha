import type { Check, CheckRun } from "../check-shape.ts"
import { onDisk } from "../tree.ts"
import { runAll } from "./all.ts"

export function runAudit(checks: readonly Check[], root: string): readonly CheckRun[] {
  const tree = onDisk(root)
  return runAll(checks, tree.paths(), tree)
}
