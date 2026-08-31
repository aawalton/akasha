import { standingAt } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { slugStated } from "../../agent-stated/agent-stated.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const PERSON =
  "A seat is held by the person it states, and that person is read before the seat is changed."

const PERSON_TYPE = "person"

const KEY = "personSlug"

export function personItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const standing = standingAt(root, PERSON_TYPE, slug)[0]
  if (standing === undefined) return []
  const oid = standingOf(root, standing.path)
  return oid === null ? [] : [{ path: standing.path, oid, owed: PERSON }]
}
