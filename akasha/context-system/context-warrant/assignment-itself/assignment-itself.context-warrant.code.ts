import { standingAt } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { slugStated } from "../../seat-stated/seat-stated.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const DOMAIN =
  "A seat answers for the domain it states, and that domain is read before the seat is changed."

const DOMAIN_TYPE = "domain"

const KEY = "assignmentSlug"

export function domainItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const standing = standingAt(root, DOMAIN_TYPE, slug)[0]
  if (standing === undefined) return []
  const oid = standingOf(root, standing.path)
  return oid === null ? [] : [{ path: standing.path, oid, owed: DOMAIN }]
}
