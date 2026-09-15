import { refusalsOver } from "akasha/check/code/pages/hand-written-global-is-no-method/hand-written-global-is-no-method.check-code.decision.code.ts"
import { bodyOf, onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function handWrittenGlobalIsNoMethod(root: string): readonly Judged[] {
  const disk = onDisk(root)
  return refusalsOver(shadowAt(root), (path) => {
    const bytes = disk(path)
    return bytes === null ? null : bodyOf({ root, path, bytes })
  })
}
