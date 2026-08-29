import { createRequire } from "node:module"
import { join } from "node:path"
import {
  schemaOf,
  standingAt,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { slugFor } from "../../../pages-system/page-property/page-property-key/page-property-key.module.code.ts"
import { type Knowing, standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const PROPERTY =
  "A page states each property as the page defining it shapes it, and that page is read first."

const reach_ = createRequire(import.meta.url)

export function statedIn(root: string, path: string, slug: string): readonly string[] {
  let mod: Record<string, unknown>
  try {
    mod = reach_(join(root, path)) as Record<string, unknown>
  } catch {
    return []
  }
  const said = mod[exportedAs(slug)]
  if (said === null || typeof said !== "object") return []
  return Object.keys(said as Record<string, unknown>).map(slugFor)
}

export function fileProperty(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const said = namedIn(path)
  if (said === null || !knowing().types.has(said.tail)) return []
  const found: Warrant[] = []
  for (const slug of statedIn(root, path, said.stem)) {
    const schema = schemaOf(root, slug)
    if (schema === null) continue
    const standing = standingAt(root, schema.pageTypeSlug, slug)[0]
    if (standing === undefined || standing.path === path) continue
    const oid = standingOf(root, standing.path)
    if (oid === null) continue
    found.push({ path: standing.path, oid, owed: PROPERTY })
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
