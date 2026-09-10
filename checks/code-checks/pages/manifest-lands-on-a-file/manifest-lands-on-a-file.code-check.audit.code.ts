import { shadowAt } from "@akasha/pages/shadow"
import { bodyOf, onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { manifestsIn } from "../package-reached-where-named/package-reached-where-named.code-check.code.ts"
import { type Asking, refusalsOver } from "./manifest-lands-on-a-file.code-check.decision.code.ts"

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
