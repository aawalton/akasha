import { listedAt } from "@akasha/indexes"
import { slugStated } from "../../modules/agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const PERSON =
  "A seat is held by the person it states, and that person is read before the seat is changed."

const PERSON_TYPE = "person"

const KEY = "personSlug"

export function personItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const listed = listedAt(root, PERSON_TYPE, slug)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: PERSON }]
}
