import { dirname, join } from "node:path"
import {
  schemaOf,
  standingAt,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  besideAt,
  type Named,
  namedIn,
  pageNamed,
} from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { type Knowing, standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const PAGE =
  "A property's file answers to the page it stands beside, and that page states the property it holds."

export const PROPERTY =
  "What a property's file must hold is said on the property's own page, never on the page the file stands beside."

const TS = "ts"

function pageBeside(path: string, said: Named): string | null {
  const held = join(dirname(path), `${said.stem}.${TS}`)
  return besideAt(held, said.tail, TS) === path ? held : null
}

function propertyOf(root: string, propertySlug: string): Warrant | null {
  const said = schemaOf(root, propertySlug)
  if ("refused" in said) return null
  const standing = standingAt(root, said.schema.pageTypeSlug, propertySlug)[0]
  if (standing === undefined) return null
  const oid = standingOf(root, standing.path)
  return oid === null ? null : { path: standing.path, oid, owed: PROPERTY }
}

export function filePropertyFile(root: string, path: string, knowing: Knowing): readonly Warrant[] {
  const said = namedIn(path)
  if (said === null) return []
  const known = knowing()
  if (known.types.has(said.tail)) return []
  const page = pageBeside(path, said)
  if (page === null || !pageNamed(page, known.types)) return []
  const standing = standingOf(root, page)
  if (standing === null) return []
  const found: Warrant[] = [{ path: page, oid: standing, owed: PAGE }]
  const held = propertyOf(root, said.tail)
  if (held !== null) found.push(held)
  return found
}
