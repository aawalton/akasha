import { idsNaming, listedById, listedByPath } from "@akasha/indexes"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const WHOLE =
  "A page names its parts, and the whole a part belongs to is read before the part is changed."

const PARTS = "part-slugs"

export function fileDomain(root: string, path: string): readonly Warrant[] {
  const held = listedByPath(root, path)[0]
  if (held === undefined) return []
  const found: Warrant[] = []
  for (const id of idsNaming(root, held.id, PARTS)) {
    const said = listedById(root, id)
    if (said === null || said.path === path) continue
    const oid = blobAt(root, said.path)
    if (oid === null) continue
    found.push({ path: said.path, oid: oid, owed: WHOLE })
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
