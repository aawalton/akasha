import { createRequire } from "node:module"
import { join } from "node:path"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { namedIn } from "../../pages-system/page/page-file-name/page-file-name.module.code.ts"

const SEAT = "seat"

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
