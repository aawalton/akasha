import { listedAt } from "@akasha/indexes"
import { slugStated } from "../../modules/agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../warranting/warranting.module.code.ts"

export const PERSONA =
  "A seat works as the persona it states, and that persona is read before the seat is changed."

const PERSONA_TYPE = "persona"

const KEY = "personaSlug"

export function personaItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const listed = listedAt(root, PERSONA_TYPE, slug)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: PERSONA }]
}
