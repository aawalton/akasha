import { textOf } from "akasha/code-system/body-text/body-text.module.code.ts"
import { pageTypesIn } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import {
  facingOn,
  generatedIn,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import { everyPath, listedByPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { everythingIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  askingOver,
  judgingOver,
  namingOver,
  reasonsIn,
} from "./check-reaches-a-path-through-the-index.code-check.decision.code.ts"

export function checkReachesAPathThroughTheIndex(root: string): readonly Judged[] {
  const paths = everyPath(root)
  const asking = askingOver(paths)
  const naming = namingOver(paths, pageTypesIn(root))
  const facing = facingOn(root)
  const judged = judgingOver({
    types: pageTypesIn(root),
    listed: (path) => listedByPath(root, path).length > 0,
    generated: (path) => generatedIn(facing, path),
  })
  const change = everythingIn(root)
  const said: Judged[] = []
  for (const path of change.changed) {
    if (!judged(path)) continue
    const text = textOf(change.after(path))
    if (text === null) continue
    for (const reason of reasonsIn(asking, naming, path, text)) said.push({ path, reason })
  }
  return said
}
