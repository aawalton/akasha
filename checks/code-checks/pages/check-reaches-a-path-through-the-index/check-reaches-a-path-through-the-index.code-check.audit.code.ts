import { everyPath } from "@akasha/indexes"
import { pageTypesIn } from "@akasha/indexes/entries"
import { overEveryNamed } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  askingOver,
  judgedBy,
  reasonsIn,
} from "./check-reaches-a-path-through-the-index.code-check.decision.code.ts"

export function checkReachesAPathThroughTheIndex(root: string): readonly Judged[] {
  const asking = askingOver(everyPath(root))
  const judged = judgedBy(pageTypesIn(root))
  return overEveryNamed(root, judged, (path, text) => reasonsIn(asking, path, text))
}
