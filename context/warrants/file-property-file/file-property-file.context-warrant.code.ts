import { dirname, join } from "node:path"
import { listedAt } from "@akasha/indexes"
import { besideAt, type Parted, pageNamed, pageOf, partedIn } from "@akasha/pages/page-file-name"
import { propertiesIfNamedOf } from "@akasha/pages/page-type-properties"
import { valueAt } from "@akasha/pages/page-value"
import {
  blobAt,
  type Knowing,
  type Warrant,
} from "../../modules/warranting/warranting.module.code.ts"

export const PAGE =
  "A property's file answers to the page it sits beside, and that page states the property it holds."

export const PROPERTY =
  "What a property's file must hold is said on the property's own page, never on the page the file sits beside."

const TS = "ts"

function pageBeside(path: string, said: Parted, propertySlug: string): string | null {
  const held = join(dirname(path), `${pageOf(said)}.${TS}`)
  return besideAt(held, propertySlug, said.held) === path ? held : null
}

function propertyOf(root: string, pageType: string, propertySlug: string): Warrant | null {
  const declared = propertiesIfNamedOf(pageType, root, (at) => valueAt(at, root)) ?? []
  const under = declared.find((one) => one.pagePropertySlug === propertySlug)
  if (under === undefined) return null
  const listed = listedAt(root, under.pageTypeSlug, propertySlug)[0]
  if (listed === undefined) return null
  const oid = blobAt(root, listed.path)
  return oid === null ? null : { path: listed.path, oid, owed: PROPERTY }
}

export function filePropertyFile(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const said = partedIn(path)
  if (said === null) return []
  const known = knowing()
  const only = said.sections.length === 1 ? said.sections[0] : undefined
  if (only === undefined || known.types.has(only)) return []
  const page = pageBeside(path, said, only)
  if (page === null || !pageNamed(page, known.types)) return []
  const oid = blobAt(root, page)
  if (oid === null) return []
  const found: Warrant[] = [{ path: page, oid: oid, owed: PAGE }]
  const held = propertyOf(root, said.pageType, only)
  if (held !== null) found.push(held)
  return found
}
