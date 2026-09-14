import {
  blobAt,
  type Warrant,
} from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
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
  idsNaming,
  listedById,
  readingIn,
  valueByPath,
} from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { filesIn } from "akasha/pages/indexes/modules/tree-reading/tree-reading.module.code.ts"
import { textAt } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

export const WHOLE =
  "A page names its parts, and the whole a part belongs to is read before the part is changed."

const PARTS = "parts"

const ID = "id"

export function fileDomain(root: string, path: string): readonly Warrant[] {
  const reading = readingIn(root)
  const listing: Listing = (folder) => filesIn(root, folder)
  const claimant = claimantOf(
    listing,
    path,
    pageTypesIn(reading),
    filePropertiesAt(reading),
    folderPropertiesAt(reading)
  )
  if (claimant === null) return []
  const value = valueByPath(reading, claimant)
  const held = value === null ? null : textAt(value, ID)
  if (held === null) return []
  const found: Warrant[] = []
  for (const id of idsNaming(reading, held, PARTS)) {
    const said = listedById(reading, id)
    if (said === null || said.path === path) continue
    const oid = blobAt(root, said.path)
    if (oid === null) continue
    found.push({ path: said.path, oid: oid, owed: WHOLE })
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
