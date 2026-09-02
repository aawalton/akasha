import { dirname, join } from "node:path"
import { listedAt, schemaOf } from "@akasha/indexes"
import { besideAt, type Named, namedIn, pageNamed } from "@akasha/pages-system/page-file-name"
import { blobAt, type Knowing, type Warrant } from "../../warranting/warranting.module.code.ts"

export const PAGE =
  "A property's file answers to the page it stands beside, and that page states the property it holds."

export const PROPERTY =
  "What a property's file must hold is said on the property's own page, never on the page the file stands beside."

const TS = "ts"

function pageBeside(path: string, said: Named): string | null {
  const held = join(dirname(path), `${said.stem}.${TS}`)
  return besideAt(held, said.tail, said.held) === path ? held : null
}

function propertyOf(root: string, propertySlug: string): Warrant | null {
  const said = schemaOf(root, propertySlug)
  if ("refused" in said) return null
  const listed = listedAt(root, said.schema.pageTypeSlug, propertySlug)[0]
  if (listed === undefined) return null
  const oid = blobAt(root, listed.path)
  return oid === null ? null : { path: listed.path, oid, owed: PROPERTY }
}

export function filePropertyFile(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const said = namedIn(path)
  if (said === null) return []
  const known = knowing()
  if (known.types.has(said.tail)) return []
  const page = pageBeside(path, said)
  if (page === null || !pageNamed(page, known.types)) return []
  const oid = blobAt(root, page)
  if (oid === null) return []
  const found: Warrant[] = [{ path: page, oid: oid, owed: PAGE }]
  const held = propertyOf(root, said.tail)
  if (held !== null) found.push(held)
  return found
}
