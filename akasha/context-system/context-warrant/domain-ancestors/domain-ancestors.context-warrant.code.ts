import {
  slugAt,
  valueAt,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  idsNaming,
  type Standing,
  standingAt,
  standingById,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { slugStated, typeStated } from "../../seat-stated/seat-stated.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const ABOVE =
  "A seat answers for one domain, and every domain that one is a part of is read before the seat is changed."

const DOMAIN_TYPE = "domain"

const INITIATIVE_TYPE = "initiative"

const KEY = "assignmentSlug"

const DOMAIN_KEY = "domainSlug"

const PARTS = "part-slugs"

function domainOf(root: string, path: string): Standing | undefined {
  const value = valueAt(path, root)
  const named = value === null ? null : slugAt(value, DOMAIN_KEY)
  return named === null ? undefined : standingAt(root, DOMAIN_TYPE, named)[0]
}

function answeredFor(root: string, path: string): Standing | undefined {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return undefined
  const stated = typeStated(root, path, KEY) ?? DOMAIN_TYPE
  if (stated !== INITIATIVE_TYPE) return standingAt(root, stated, slug)[0]
  const held = standingAt(root, INITIATIVE_TYPE, slug)[0]
  return held === undefined ? undefined : domainOf(root, held.path)
}

export function domainAncestors(root: string, path: string): readonly Warrant[] {
  const standing = answeredFor(root, path)
  if (standing === undefined) return []
  const found: Warrant[] = []
  const walked = new Set<string>([standing.id])
  let edge: readonly string[] = [standing.id]
  while (edge.length > 0) {
    const next: string[] = []
    for (const id of edge) {
      for (const above of idsNaming(root, id, PARTS)) {
        if (walked.has(above)) continue
        walked.add(above)
        next.push(above)
        const said = standingById(root, above)
        if (said === null) continue
        const oid = standingOf(root, said.path)
        if (oid === null) continue
        found.push({ path: said.path, oid, owed: ABOVE })
      }
    }
    edge = next
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
