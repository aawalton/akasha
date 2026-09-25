import {
  blobAt,
  type Knowing,
  type Warrant,
} from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { inLowerKebabCase } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import { propertiesIfNamedOf } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export const PROPERTY =
  "A page states each property as the page defining it shapes it, and that page is read first."

function statedIn(root: string, path: string): readonly string[] {
  const said = valueAt(path, root)
  if (said === null) return []
  return Object.keys(said).map(inLowerKebabCase)
}

export function fileProperty(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0) return []
  const known = knowing()
  if (!known.types.has(said.pageType)) return []
  const declared =
    propertiesIfNamedOf(said.pageType, known.reading, (at) => valueAt(at, root)) ?? []
  const under = new Map(declared.map((one) => [one.propertySlug, one]))
  const found: Warrant[] = []
  for (const slug of statedIn(root, path)) {
    const one = under.get(slug)
    if (one === undefined) continue
    const listed = listedAt(known.reading, one.pageTypeSlug, one.pagePropertySlug)[0]
    if (listed === undefined || listed.path === path) continue
    const oid = blobAt(root, listed.path)
    if (oid === null) continue
    found.push({ path: listed.path, oid, owed: PROPERTY })
  }
  return found.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}
