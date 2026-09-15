import {
  type Asking,
  refusalsOver,
} from "akasha/check/code/pages/manifest-lands-on-a-file/manifest-lands-on-a-file.check-code.decision.code.ts"
import { bodyOf, onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { manifestsIn } from "akasha/code/workspace/modules/manifest-finding/manifest-finding.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

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
