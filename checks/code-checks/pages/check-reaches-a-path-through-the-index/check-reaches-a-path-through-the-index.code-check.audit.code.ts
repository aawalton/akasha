import { readFileSync } from "node:fs"
import { join } from "node:path"
import { everyPath } from "@akasha/indexes"
import { pageTypesIn } from "@akasha/indexes/entries"
import { bodyOf } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  askingOver,
  judgedBy,
  reasonsIn,
} from "./check-reaches-a-path-through-the-index.code-check.decision.code.ts"

export function checkReachesAPathThroughTheIndex(root: string): readonly Judged[] {
  const paths = everyPath(root)
  const asking = askingOver(paths)
  const judged = judgedBy(pageTypesIn(root))
  const said: Judged[] = []
  for (const path of paths) {
    if (!judged(path)) continue
    const bytes = readFileSync(join(root, path))
    for (const reason of reasonsIn(asking, path, bodyOf({ root, path, bytes }))) {
      said.push({ path, reason })
    }
  }
  return said
}
