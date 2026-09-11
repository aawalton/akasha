import { slugStated } from "akasha/domains/context/modules/agent-stated/agent-stated.module.code.ts"
import {
  blobAt,
  type Warrant,
} from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const PERSONA =
  "A seat works as the persona it states, and that persona is read before the seat is changed."

const PERSONA_TYPE = "persona"

const KEY = "persona"

export function personaItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const listed = listedAt(root, PERSONA_TYPE, slug)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: PERSONA }]
}
