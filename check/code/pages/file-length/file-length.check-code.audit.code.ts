import { lstatSync, statSync } from "node:fs"
import { join } from "node:path"
import {
  exemptIn,
  reasonsIn,
} from "akasha/check/code/pages/file-length/file-length.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

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
  const shadow = shadowAt(root)
  const said: Judged[] = []
  for (const path of everythingIn(root).changed) {
    if (exemptIn(path, shadow)) continue
    const held = sizeAt(root, path)
    if (held === null) continue
    for (const reason of reasonsIn(path, held)) said.push({ path, reason })
  }
  return said
}
