import { createRequire } from "node:module"
import { join } from "node:path"
import { listedAt, schemaOf } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { slugFor } from "@akasha/pages-system/page-property-key"
import {
  blobAt,
  type Knowing,
  type Warrant,
} from "../../modules/warranting/warranting.module.code.ts"

export const PROPERTY =
  "A page states each property as the page defining it shapes it, and that page is read first."

const loadFrom = createRequire(import.meta.url)

export function statedIn(root: string, path: string, slug: string): readonly string[] {
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(join(root, path)) as Record<string, unknown>
  } catch {
    return []
  }
  const said = mod[exportedAs(slug)]
  if (said === null || typeof said !== "object") return []
  return Object.keys(said as Record<string, unknown>).map(slugFor)
}

export function fileProperty(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return []
  if (!knowing().types.has(said.pageType)) return []
  const found: Warrant[] = []
  for (const slug of statedIn(root, path, said.slug)) {
    const filed = schemaOf(root, slug)
    if ("refused" in filed) continue
    const listed = listedAt(root, filed.schema.pageTypeSlug, slug)[0]
    if (listed === undefined || listed.path === path) continue
    const oid = blobAt(root, listed.path)
    if (oid === null) continue
    found.push({ path: listed.path, oid, owed: PROPERTY })
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
