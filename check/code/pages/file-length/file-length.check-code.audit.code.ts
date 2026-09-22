import { lstatSync, statSync } from "node:fs"
import { join } from "node:path"
import {
  exemptIn,
  reasonsIn,
} from "akasha/check/code/pages/file-length/file-length.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

function sizeAt(root: string, path: string): number | null {
  const at = join(root, path)
  const held = statSync(at, { throwIfNoEntry: false })
  if (held !== undefined) return held.isDirectory() ? null : held.size
  if (lstatSync(at, { throwIfNoEntry: false }) === undefined) {
    throw new Error(`${path} was listed in this tree and is not there`)
  }
  return null
}

export function fileLength(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const said: Judged[] = []
  for (const path of commit.paths) {
    if (exemptIn(path, commit)) continue
    const held = sizeAt(root, path)
    if (held === null) continue
    for (const reason of reasonsIn(path, held)) said.push({ path, reason })
  }
  return said
}
