import { listedAt } from "@akasha/indexes"
import { partedIn } from "@akasha/pages-system/page-file-name"
import {
  blobAt,
  type Knowing,
  type Warrant,
} from "../../modules/warranting/warranting.module.code.ts"

export const TYPE = "A page answers to its type, and to every type that one extends."

const PAGE_TYPE = "page-type"

export function typeSlugOf(path: string, types: ReadonlySet<string>): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return null
  return types.has(said.pageType) ? said.pageType : null
}

export function filePageType(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const known = knowing()
  const first = typeSlugOf(path, known.types)
  if (first === null) return []
  const found: Warrant[] = []
  const walked = new Set<string>()
  const above = known.above()
  const waiting: string[] = [first]
  for (let at = 0; at < waiting.length; at += 1) {
    const here = waiting[at]
    if (here === undefined || walked.has(here)) continue
    walked.add(here)
    const listed = listedAt(root, PAGE_TYPE, here)[0]
    const oid = listed === undefined ? null : blobAt(root, listed.path)
    if (listed !== undefined && oid !== null) {
      found.push({ path: listed.path, oid, owed: TYPE })
    }
    for (const one of above.get(here) ?? []) waiting.push(one)
  }
  return found
}
