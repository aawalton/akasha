import { idsNaming, type Listed, listedAt, listedById, listedFor } from "@akasha/indexes"
import { addressedIn } from "@akasha/pages/page-address"
import { textAt, valueAt } from "@akasha/pages/page-value"
import { slugStated, typeStated } from "../../modules/agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const ABOVE =
  "A seat answers for one domain, and every domain that one is a part of is read before the seat is changed."

const DOMAIN_TYPE = "domain"

const INITIATIVE_TYPE = "initiative"

const KEY = "assignmentSlug"

const DOMAIN_KEY = "domain"

const PARTS = "part-slugs"

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
  const found: Warrant[] = []
  const walked = new Set<string>([listed.id])
  let edge: readonly string[] = [listed.id]
  while (edge.length > 0) {
    const next: string[] = []
    for (const id of edge) {
      for (const above of idsNaming(root, id, PARTS)) {
        if (walked.has(above)) continue
        walked.add(above)
        next.push(above)
        const said = listedById(root, above)
        if (said === null) continue
        const oid = blobAt(root, said.path)
        if (oid === null) continue
        found.push({ path: said.path, oid, owed: ABOVE })
      }
    }
    edge = next
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
