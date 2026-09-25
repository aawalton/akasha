import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { underIndex } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { referencesFiled } from "akasha/page/modules/referencing/page-referencing.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const LEFT_OUT =
  "this change's own files turn this index answer, and the change lands nothing for it"

export const UNASKED =
  "this change lands this index answer, and the change's own files turn no answer there"

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const held = (path: string): boolean => referencesFiled(path) || underIndex(path)
  const filed = shadow.filed()
  const lands = new Set(change.carried ?? [])
  const said: Judged[] = []
  for (const [path, body] of filed) {
    if (!held(path) || lands.has(path)) continue
    if (textOf(change.after(path)) === body) continue
    said.push({ path, reason: LEFT_OUT })
  }
  for (const path of lands) {
    if (!held(path) || filed.has(path)) continue
    if (change.after(path) === null) continue
    said.push({ path, reason: UNASKED })
  }
  return said
}
