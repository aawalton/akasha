import {
  HANDLERS,
  PERSONAS,
  seatSectionOf,
} from "akasha/agent/seat/fleet/modules/seat-section/seat-section.computed-property-module.code.ts"
import {
  slugStated,
  typeStated,
} from "akasha/domain/context/modules/agent-stated/agent-stated.module.code.ts"
import {
  blobAt,
  type Warrant,
} from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

export const PERSON =
  "A persona or handler seat is held by the person it states, and that person is read before the seat is changed."

const PERSON_TYPE = "person"

const KEY = "person"

const ROLE = "role"

const ASSIGNMENT = "assignmentSlug"

const HELD: ReadonlySet<string> = new Set([PERSONAS, HANDLERS])

function sectionOf(root: string, path: string): string {
  const slug = slugStated(root, path, ASSIGNMENT)
  const type = typeStated(root, path, ASSIGNMENT)
  const assignment = slug === null || type === null ? slug : `${type}/${slug}`
  return seatSectionOf(slugStated(root, path, ROLE), assignment)
}

export function personItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  if (!HELD.has(sectionOf(root, path))) return []
  const listed = listedAt(root, PERSON_TYPE, slug)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: PERSON }]
}
