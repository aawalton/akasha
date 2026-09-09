import { shadowAt } from "@akasha/pages/shadow"
import { bodyOf, onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { refusalsOver } from "./hand-written-global-is-no-method.code-check.decision.code.ts"

export function handWrittenGlobalIsNoMethod(root: string): readonly Judged[] {
  const disk = onDisk(root)
  return refusalsOver(shadowAt(root), (path) => {
    const bytes = disk(path)
    return bytes === null ? null : bodyOf({ root, path, bytes })
  })
}
