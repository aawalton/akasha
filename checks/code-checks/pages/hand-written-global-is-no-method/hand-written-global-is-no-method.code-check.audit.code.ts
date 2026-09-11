import { refusalsOver } from "akasha/checks/code-checks/pages/hand-written-global-is-no-method/hand-written-global-is-no-method.code-check.decision.code.ts"
import { bodyOf, onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function handWrittenGlobalIsNoMethod(root: string): readonly Judged[] {
  const disk = onDisk(root)
  return refusalsOver(shadowAt(root), (path) => {
    const bytes = disk(path)
    return bytes === null ? null : bodyOf({ root, path, bytes })
  })
}
