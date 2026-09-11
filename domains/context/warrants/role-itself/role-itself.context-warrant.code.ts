import { slugStated } from "akasha/domains/context/modules/agent-stated/agent-stated.module.code.ts"
import {
  blobAt,
  type Warrant,
} from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const ROLE =
  "A seat answers for the role it states, and that role is read before the seat is changed."

const ROLE_TYPE = "role"

const KEY = "role"

export function roleItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const listed = listedAt(root, ROLE_TYPE, slug)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: ROLE }]
}
