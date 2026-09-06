import { createRequire } from "node:module"
import { join } from "node:path"
import { listedAt } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages/page-export-name"
import { partedIn } from "@akasha/pages/page-file-name"
import { slugFor } from "@akasha/pages/page-property-key"
import { propertiesIfNamedOf } from "@akasha/pages/page-type-properties"
import { valueAt } from "@akasha/pages/page-value"
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
  const declared = propertiesIfNamedOf(said.pageType, root, (at) => valueAt(at, root)) ?? []
  const under = new Map(declared.map((one) => [one.propertySlug, one]))
  const found: Warrant[] = []
  for (const slug of statedIn(root, path, said.slug)) {
    const one = under.get(slug)
    if (one === undefined) continue
    const listed = listedAt(root, one.pageTypeSlug, one.pagePropertySlug)[0]
    if (listed === undefined || listed.path === path) continue
    const oid = blobAt(root, listed.path)
    if (oid === null) continue
    found.push({ path: listed.path, oid, owed: PROPERTY })
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
