import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/bodies/modules/body-text/body-text.module.code.ts"
import { heldByGit } from "akasha/pages/indexes/modules/carrying/index-carrying.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"

const SLASH = "/"

export const LEFT_OUT =
  "this change's own files turn this index answer, and the change lands nothing for it"

export const UNASKED =
  "this change lands this index answer, and the change's own files turn no answer there"

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const under = heldByGit(shadow).map((one) => `${one}${SLASH}`)
  if (under.length === 0) return []
  const held = (path: string): boolean => under.some((one) => path.startsWith(one))
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
    said.push({ path, reason: UNASKED })
  }
  return said
}
