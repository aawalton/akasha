import {
  slugStated,
  typeStated,
} from "akasha/domain/context/modules/agent-stated/agent-stated.module.code.ts"
import {
  blobAt,
  type Warrant,
} from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { listedAt, listedFor } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressedIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textUnder } from "akasha/page/modules/value/page-value.module.code.ts"

export const ASSIGNMENT =
  "A seat answers for the assignment it states, and that assignment is read before the seat is changed."

export const WITHIN =
  "A seat assigned an initiative answers for the domain that initiative names, and that domain is read before the seat is changed."

export const KIND =
  "A seat assigned an initiative answers to what an initiative is, and the initiative page type is read before the seat is changed."

export const VOICE =
  "A seat assigned an initiative works for the persona that initiative states, and that persona is read before the seat is changed."

const DOMAIN_TYPE = "domain"

const INITIATIVE_TYPE = "initiative"

const PAGE_TYPE = "page-type"

const KEY = "assignmentSlug"

const DOMAIN_KEY = "domain"

const PERSONA_KEY = "persona"

const SEAT = "seat"

function warrantAt(root: string, path: string, owed: string): readonly Warrant[] {
  const oid = blobAt(root, path)
  return oid === null ? [] : [{ path, oid, owed }]
}

function namedUnder(root: string, path: string, key: string, owed: string): readonly Warrant[] {
  const named = textUnder(root, path, key)
  if (named === null) return []
  const address = addressedIn(named)
  if ("refused" in address) throw new Error(address.refused)
  const listed = listedFor(root, address)
  return listed === null ? [] : warrantAt(root, listed.path, owed)
}

function kindOf(root: string): readonly Warrant[] {
  const listed = listedAt(root, PAGE_TYPE, INITIATIVE_TYPE)[0]
  return listed === undefined ? [] : warrantAt(root, listed.path, KIND)
}

function initiativeOf(root: string, slug: string, seat: boolean): readonly Warrant[] {
  const listed = listedAt(root, INITIATIVE_TYPE, slug)[0]
  if (listed === undefined) return []
  return [
    ...warrantAt(root, listed.path, ASSIGNMENT),
    ...namedUnder(root, listed.path, DOMAIN_KEY, WITHIN),
    ...kindOf(root),
    ...(seat ? namedUnder(root, listed.path, PERSONA_KEY, VOICE) : []),
  ]
}

export function assignmentItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const stated = typeStated(root, path, KEY) ?? DOMAIN_TYPE
  if (stated === INITIATIVE_TYPE) return initiativeOf(root, slug, partedIn(path)?.pageType === SEAT)
  const listed = listedAt(root, stated, slug)[0]
  return listed === undefined ? [] : warrantAt(root, listed.path, ASSIGNMENT)
}
