import {
  blobAt,
  type Knowing,
  knowingIn,
  type Warrant,
} from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import {
  extensionPropertiesAt,
  filePropertiesAt,
  folderPropertiesAt,
  pageTypesIn,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  claimantOf,
  pagingOf,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  everyOfType,
  listedById,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { idsNaming } from "akasha/page/modules/reference-reading/page-reference-reading.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const WHOLE =
  "A page names its parts, and the whole a part belongs to is read before the part is changed."

const PARTS = "parts"

const ID = "id"

export function fileDomain(
  root: string,
  path: string,
  knowing: Knowing = knowingIn(root)
): readonly Warrant[] {
  const reading = knowing().reading
  const claimant = claimantOf(
    pagingOf((slug) => everyOfType(reading, slug)),
    path,
    pageTypesIn(reading),
    filePropertiesAt(reading),
    folderPropertiesAt(reading),
    extensionPropertiesAt(reading)
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
