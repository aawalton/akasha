import { standingAt } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { slugStated } from "../../seat-stated/seat-stated.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const ROLE =
  "A seat answers for the role it states, and that role is read before the seat is changed."

const ROLE_TYPE = "role"

const KEY = "roleSlug"

export function roleItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const standing = standingAt(root, ROLE_TYPE, slug)[0]
  if (standing === undefined) return []
  const oid = standingOf(root, standing.path)
  return oid === null ? [] : [{ path: standing.path, oid, owed: ROLE }]
}
