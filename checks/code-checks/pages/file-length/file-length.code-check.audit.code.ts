import { lstatSync } from "node:fs"
import { join } from "node:path"
import { shadowAt } from "@akasha/pages/shadow"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { exemptIn, reasonsIn } from "./file-length.code-check.decision.code.ts"

const NOTHING = 0

function sizeAt(root: string, path: string): number {
  const held = lstatSync(join(root, path), { throwIfNoEntry: false })
  return held === undefined ? NOTHING : held.size
}

export function fileLength(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const said: Judged[] = []
  for (const path of everythingIn(root).changed) {
    if (exemptIn(path, shadow)) continue
    for (const reason of reasonsIn(path, sizeAt(root, path))) said.push({ path, reason })
  }
  return said
}
