import {
  slugStated,
  typeStated,
} from "akasha/domain/context/modules/agent-stated/agent-stated.module.code.ts"
import {
  blobAt,
  type Warrant,
} from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { parents } from "akasha/graph/predicate/pages/parents/parents.graph-predicate.ts"
import { answeringOver } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  type Listed,
  listedAt,
  listedFor,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressedIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const ABOVE =
  "A seat answers for one domain, and every domain that one is a part of is read before the seat is changed."

const DOMAIN_TYPE = "domain"

const INITIATIVE_TYPE = "initiative"

const KEY = "assignmentSlug"

const DOMAIN_KEY = "domain"

function domainOf(root: string, path: string): Listed | undefined {
  const value = valueAt(path, root)
  const named = value === null ? null : textAt(value, DOMAIN_KEY)
  if (named === null) return undefined
  const address = addressedIn(named)
  if ("refused" in address) throw new Error(address.refused)
  return listedFor(root, address) ?? undefined
}

function answeredFor(root: string, path: string): Listed | undefined {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return undefined
  const stated = typeStated(root, path, KEY) ?? DOMAIN_TYPE
  if (stated !== INITIATIVE_TYPE) return listedAt(root, stated, slug)[0]
  const held = listedAt(root, INITIATIVE_TYPE, slug)[0]
  return held === undefined ? undefined : domainOf(root, held.path)
}

export function domainAncestors(root: string, path: string): readonly Warrant[] {
  const listed = answeredFor(root, path)
  if (listed === undefined) return []
  const index = answeringOver(readingIn(root), (at) => valueAt(at, root))
  const found: Warrant[] = []
  for (const above of closureOf(parents, [listed.path], { index })) {
    if (above === listed.path) continue
    const oid = blobAt(root, above)
    if (oid === null) continue
    found.push({ path: above, oid, owed: ABOVE })
  }
  return found
}
