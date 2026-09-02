import { createRequire } from "node:module"
import { join } from "node:path"
import { addressIn } from "@akasha/pages-system/page-address"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { partedIn } from "@akasha/pages-system/page-file-name"

const AGENT: ReadonlySet<string> = new Set(["seat", "subagent"])

const loadFrom = createRequire(import.meta.url)

function statedIn(root: string, path: string, key: string): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0 || !AGENT.has(said.pageType)) return null
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(join(root, path)) as Record<string, unknown>
  } catch {
    return null
  }
  const held = mod[exportedAs(said.slug)]
  if (held === null || typeof held !== "object") return null
  const stated = (held as Record<string, unknown>)[key]
  if (typeof stated !== "string" || stated === "") return null
  return stated
}

export function slugStated(root: string, path: string, key: string): string | null {
  const stated = statedIn(root, path, key)
  return stated === null ? null : stated.slice(stated.lastIndexOf("/") + 1)
}

export function typeStated(root: string, path: string, key: string): string | null {
  const stated = statedIn(root, path, key)
  if (stated === null) return null
  const address = addressIn(stated)
  return address.kind === "qualified" ? address.pageTypeSlug : null
}
