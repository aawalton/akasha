import { idsNaming, type Listed, listedAddressed, listedAt, listedById } from "@akasha/indexes"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import { slugStated, typeStated } from "../../agent-stated/agent-stated.module.code.ts"
import { blobAt, type Warrant } from "../../warranting/warranting.module.code.ts"

export const ABOVE =
  "A seat answers for one domain, and every domain that one is a part of is read before the seat is changed."

const DOMAIN_TYPE = "domain"

const INITIATIVE_TYPE = "initiative"

const KEY = "assignmentSlug"

const DOMAIN_KEY = "domainSlug"

const PARTS = "part-slugs"

function domainOf(root: string, path: string): Listed | undefined {
  const value = valueAt(path, root)
  const named = value === null ? null : textAt(value, DOMAIN_KEY)
  if (named === null) return undefined
  return listedAddressed(root, named, DOMAIN_TYPE) ?? undefined
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
