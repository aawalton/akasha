import { createRequire } from "node:module"
import { join } from "node:path"
import { standingAt } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { namedIn } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { standingOf, type Warrant } from "../../warranting/warranting.module.code.ts"

export const PERSONA =
  "A seat works as the persona it states, and that persona is read before the seat is changed."

const SEAT = "seat"

const PERSONA_TYPE = "persona"

const KEY = "personaSlug"

const loadFrom = createRequire(import.meta.url)

export function slugStated(root: string, path: string, key: string): string | null {
  const said = namedIn(path)
  if (said === null || said.tail !== SEAT) return null
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(join(root, path)) as Record<string, unknown>
  } catch {
    return null
  }
  const held = mod[exportedAs(said.stem)]
  if (held === null || typeof held !== "object") return null
  const stated = (held as Record<string, unknown>)[key]
  if (typeof stated !== "string" || stated === "") return null
  return stated.slice(stated.lastIndexOf("/") + 1)
}

export function personaItself(root: string, path: string): readonly Warrant[] {
  const slug = slugStated(root, path, KEY)
  if (slug === null) return []
  const standing = standingAt(root, PERSONA_TYPE, slug)[0]
  if (standing === undefined) return []
  const oid = standingOf(root, standing.path)
  return oid === null ? [] : [{ path: standing.path, oid, owed: PERSONA }]
}
