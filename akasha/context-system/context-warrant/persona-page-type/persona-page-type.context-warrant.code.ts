import { standingAt } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { slugStated } from "../../seat-stated/seat-stated.module.code.ts"
import type { Knowing, Warrant } from "../../warranting/warranting.module.code.ts"
import { filePageType } from "../file-page-type/file-page-type.context-warrant.code.ts"

export const PERSONA_TYPE =
  "A seat works as the persona it states, and what every persona is held to is read before the seat is changed."

const PERSONA = "persona"

const KEY = "personaSlug"

export function personaPageType(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const standing = standingAt(root, PERSONA, slug)[0]
  if (standing === undefined) return []
  return filePageType(root, standing.path, knowing).map((one) => ({ ...one, owed: PERSONA_TYPE }))
}
