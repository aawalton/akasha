import {
  type Asking,
  refusalsOver,
} from "akasha/checks/code-checks/pages/manifest-lands-on-a-file/manifest-lands-on-a-file.code-check.decision.code.ts"
import { manifestsIn } from "akasha/checks/code-checks/pages/package-reached-where-named/package-reached-where-named.code-check.decision.code.ts"
import { bodyOf, onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"

export function askingAt(root: string): Asking {
  const disk = onDisk(root)
  return {
    textAt: (path) => {
      const bytes = disk(path)
      return bytes === null ? null : bodyOf({ root, path, bytes })
    },
    there: (path) => disk(path) !== null,
  }
}

export function manifestLandsOnAFile(root: string): readonly Judged[] {
  return refusalsOver(manifestsIn(shadowAt(root)), askingAt(root))
}
