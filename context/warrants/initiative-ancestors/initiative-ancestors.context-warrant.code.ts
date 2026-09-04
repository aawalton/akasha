import { type Listed, listedAddressed, listedAt } from "@akasha/indexes"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { slugStated, typeStated } from "../../agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../warranting/warranting.module.code.ts"

export const UNDER =
  "A seat answers for the initiative it states, and every initiative that one stands under is read before the seat is changed."

const INITIATIVE_TYPE = "initiative"

const KEY = "assignmentSlug"

const PARENT_KEY = "parentSlug"

function aboveOf(root: string, standing: Listed): Listed | undefined {
  const value = valueAt(standing.path, root)
  const named = value === null ? null : textAt(value, PARENT_KEY)
  if (named === null) return undefined
  return listedAddressed(root, named, INITIATIVE_TYPE) ?? undefined
}

export function initiativeAncestors(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null || typeStated(root, path, KEY) !== INITIATIVE_TYPE) return []
  const listed = listedAt(root, INITIATIVE_TYPE, slug)[0]
  if (listed === undefined) return []
  const found: Warrant[] = []
  const walked = new Set<string>([listed.id])
  let above = aboveOf(root, listed)
  while (above !== undefined && !walked.has(above.id)) {
    walked.add(above.id)
    const oid = blobAt(root, above.path)
    if (oid !== null) found.push({ path: above.path, oid, owed: UNDER })
    above = aboveOf(root, above)
  }
  return found
}
