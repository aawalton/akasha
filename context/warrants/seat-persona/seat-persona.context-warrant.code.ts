import { listedAt } from "@akasha/indexes"
import { partedIn } from "@akasha/pages/page-file-name"
import { slugStated } from "../../modules/agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const PERSONA_TYPE =
  "A seat works as a persona, and what every persona is held to is read before the seat is changed."

const PAGE_TYPE = "page-type"

const PERSONA = "persona"

const SEAT = "seat"

const KEY = "slug"

export function seatPersona(root: string, path: string): readonly Warrant[] {
  if (partedIn(path)?.pageType !== SEAT) return []
  if (slugStated(root, path, KEY) === null) return []
  const listed = listedAt(root, PAGE_TYPE, PERSONA)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: PERSONA_TYPE }]
}
