import { listedAt } from "@akasha/indexes"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { blobAt, type Knowing, type Warrant } from "../../warranting/warranting.module.code.ts"

export const TYPE = "A page answers to its type, and to every type that one extends."

const PAGE_TYPE = "page-type"

export function typeSlugOf(path: string, types: ReadonlySet<string>): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return null
  return types.has(said.pageType) ? said.pageType : null
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
    const listed = listedAt(root, PAGE_TYPE, here)[0]
    const oid = listed === undefined ? null : blobAt(root, listed.path)
    if (listed !== undefined && oid !== null) {
      found.push({ path: listed.path, oid, owed: TYPE })
    }
    here = above.get(here) ?? null
  }
  return found
}
