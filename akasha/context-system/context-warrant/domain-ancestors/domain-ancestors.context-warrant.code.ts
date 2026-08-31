import {
  idsNaming,
  standingAt,
  standingById,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { slugStated } from "../../seat-stated/seat-stated.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const ABOVE =
  "A seat answers for the domain it states, and every domain that one is a part of is read before the seat is changed."

const DOMAIN_TYPE = "domain"

const KEY = "assignmentSlug"

const PARTS = "part-slugs"

export function domainAncestors(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const standing = standingAt(root, DOMAIN_TYPE, slug)[0]
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
