import {
  slugAt,
  valueAt,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { standingAt } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { slugStated, typeStated } from "../../seat-stated/seat-stated.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const ASSIGNMENT =
  "A seat answers for the assignment it states, and that assignment is read before the seat is changed."

export const WITHIN =
  "A seat assigned an initiative answers for the domain that initiative names, and that domain is read before the seat is changed."

const DOMAIN_TYPE = "domain"

const INITIATIVE_TYPE = "initiative"

const KEY = "assignmentSlug"

const DOMAIN_KEY = "domainSlug"

function warrantAt(root: string, path: string, owed: string): readonly Warrant[] {
  const oid = standingOf(root, path)
  return oid === null ? [] : [{ path, oid, owed }]
}

function namedAt(root: string, path: string, key: string): string | null {
  const value = valueAt(path, root)
  return value === null ? null : slugAt(value, key)
}

function domainOf(root: string, path: string): readonly Warrant[] {
  const named = namedAt(root, path, DOMAIN_KEY)
  if (named === null) return []
  const standing = standingAt(root, DOMAIN_TYPE, named)[0]
  return standing === undefined ? [] : warrantAt(root, standing.path, WITHIN)
}

function initiativeOf(root: string, slug: string): readonly Warrant[] {
  const standing = standingAt(root, INITIATIVE_TYPE, slug)[0]
  if (standing === undefined) return []
  return [...warrantAt(root, standing.path, ASSIGNMENT), ...domainOf(root, standing.path)]
}

export function assignmentItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  if (typeStated(root, path, KEY) === INITIATIVE_TYPE) return initiativeOf(root, slug)
  const standing = standingAt(root, DOMAIN_TYPE, slug)[0]
  return standing === undefined ? [] : warrantAt(root, standing.path, ASSIGNMENT)
}
