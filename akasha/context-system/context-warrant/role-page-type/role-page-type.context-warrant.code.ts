import { listedAt } from "@akasha/indexes"
import { slugStated } from "../../agent-stated/agent-stated.module.code.ts"
import type { Knowing, Warrant } from "../../warranting/warranting.module.code.ts"
import { filePageType } from "../file-page-type/file-page-type.context-warrant.code.ts"

export const ROLE_TYPE =
  "A seat answers for the role it states, and what every role is held to is read before the seat is changed."

const ROLE = "role"

const KEY = "roleSlug"

export function rolePageType(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const listed = listedAt(root, ROLE, slug)[0]
  if (listed === undefined) return []
  return filePageType(root, listed.path, knowing).map((one) => ({ ...one, owed: ROLE_TYPE }))
}
