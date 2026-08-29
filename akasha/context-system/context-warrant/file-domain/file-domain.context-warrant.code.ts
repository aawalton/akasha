import {
  idsNaming,
  standingById,
  standingByPath,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const WHOLE =
  "A page names its parts, and the whole a part belongs to is read before the part is changed."

const PARTS = "part-slugs"

export function fileDomain(root: string, path: string): readonly Warrant[] {
  const held = standingByPath(root, path)[0]
  if (held === undefined) return []
  const found: Warrant[] = []
  for (const id of idsNaming(root, held.id, PARTS)) {
    const said = standingById(root, id)
    if (said === null || said.path === path) continue
    const standing = standingOf(root, said.path)
    if (standing === null) continue
    found.push({ path: said.path, oid: standing, owed: WHOLE })
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
