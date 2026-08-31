import { standingAt } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { slugStated } from "../../seat-stated/seat-stated.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const PERSONA =
  "A seat works as the persona it states, and that persona is read before the seat is changed."

const PERSONA_TYPE = "persona"

const KEY = "personaSlug"

export function personaItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const standing = standingAt(root, PERSONA_TYPE, slug)[0]
  if (standing === undefined) return []
  const oid = standingOf(root, standing.path)
  return oid === null ? [] : [{ path: standing.path, oid, owed: PERSONA }]
}
