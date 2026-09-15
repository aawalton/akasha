import {
  askingOver,
  judgingOver,
  namingOver,
  pagePathsOf,
  reasonsIn,
} from "akasha/check/code/pages/check-reaches-a-path-through-the-index/check-reaches-a-path-through-the-index.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/bodies/modules/body-text/body-text.module.code.ts"
import {
  filePropertiesAt,
  folderPropertiesAt,
  pageTypesIn,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  claimantOf,
  pagingOf,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  facingOn,
  generatedIn,
  toolResolvesPathsIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { everyOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

export function checkReachesAPathThroughTheIndex(root: string): readonly Judged[] {
  const change = everythingIn(root)
  const types = pageTypesIn(root)
  const paged = pagePathsOf(types, (slug) => everyOfType(root, slug))
  const asking = askingOver(change.changed, paged)
  const naming = namingOver(change.changed, types)
  const facing = facingOn(root)
  const paging = pagingOf((slug) => everyOfType(root, slug))
  const fileProperties = filePropertiesAt(root)
  const folders = folderPropertiesAt(root)
  const judged = judgingOver({
    types,
    listed: (path) => claimantOf(paging, path, types, fileProperties, folders) !== null,
    generated: (path) => generatedIn(facing, path),
    toolResolvesPaths: (path) => toolResolvesPathsIn(facing, path),
  })
  const said: Judged[] = []
  for (const path of change.changed) {
    if (!judged(path)) continue
    const text = textOf(change.after(path))
    if (text === null) continue
    for (const reason of reasonsIn(asking, naming, path, text)) said.push({ path, reason })
  }
  return said
}
