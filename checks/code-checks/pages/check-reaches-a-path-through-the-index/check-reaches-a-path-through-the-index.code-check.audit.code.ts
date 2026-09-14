import {
  askingOver,
  judgingOver,
  namingOver,
  reasonsIn,
} from "akasha/checks/code-checks/pages/check-reaches-a-path-through-the-index/check-reaches-a-path-through-the-index.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/bodies/modules/body-text/body-text.module.code.ts"
import {
  filePropertiesAt,
  folderPropertiesAt,
  pageTypesIn,
} from "akasha/pages/indexes/modules/entries/index-entries.module.code.ts"
import {
  claimantOf,
  type Listing,
} from "akasha/pages/indexes/modules/path-claiming/path-claiming.module.code.ts"
import {
  facingOn,
  generatedIn,
  toolResolvesPathsIn,
} from "akasha/pages/indexes/modules/property-carrying/property-carrying.module.code.ts"
import { everyPath } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { filesIn } from "akasha/pages/indexes/modules/tree-reading/tree-reading.module.code.ts"

export function checkReachesAPathThroughTheIndex(root: string): readonly Judged[] {
  const paths = everyPath(root)
  const types = pageTypesIn(root)
  const asking = askingOver(paths)
  const naming = namingOver(paths, types)
  const facing = facingOn(root)
  const listing: Listing = (folder) => filesIn(root, folder)
  const fileProperties = filePropertiesAt(root)
  const folders = folderPropertiesAt(root)
  const judged = judgingOver({
    types,
    listed: (path) => claimantOf(listing, path, types, fileProperties, folders) !== null,
    generated: (path) => generatedIn(facing, path),
    toolResolvesPaths: (path) => toolResolvesPathsIn(facing, path),
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
