import { standingAt } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { type Knowing, standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const TYPE = "A page answers to its type, and to every type that one extends."

const PAGE_TYPE = "page-type"

export function typeSlugOf(path: string, types: ReadonlySet<string>): string | null {
  const said = namedIn(path)
  if (said === null) return null
  return types.has(said.tail) ? said.tail : null
}

export function filePageType(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const known = knowing()
  let here = typeSlugOf(path, known.types)
  if (here === null) return []
  const found: Warrant[] = []
  const walked = new Set<string>()
  const above = known.above()
  while (here !== null && !walked.has(here)) {
    walked.add(here)
    const standing = standingAt(root, PAGE_TYPE, here)[0]
    const oid = standing === undefined ? null : standingOf(root, standing.path)
    if (standing !== undefined && oid !== null) {
      found.push({ path: standing.path, oid, owed: TYPE })
    }
    here = above.get(here) ?? null
  }
  return found
}
