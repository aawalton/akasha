import { listedAt } from "@akasha/indexes"
import { partedIn } from "@akasha/pages/page-file-name"
import {
  blobAt,
  type Knowing,
  type Warrant,
} from "../../modules/warranting/warranting.module.code.ts"

export const TYPE = "A page answers to its type."

const PAGE_TYPE = "page-type"

export function typeSlugOf(path: string, types: ReadonlySet<string>): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return null
  return types.has(said.pageType) ? said.pageType : null
}

export function filePageType(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const first = typeSlugOf(path, knowing().types)
  if (first === null) return []
  const listed = listedAt(root, PAGE_TYPE, first)[0]
  if (listed === undefined) return []
  const oid = blobAt(root, listed.path)
  return oid === null ? [] : [{ path: listed.path, oid, owed: TYPE }]
}
