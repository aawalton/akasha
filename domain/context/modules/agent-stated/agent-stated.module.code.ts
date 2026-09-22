import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textUnder } from "akasha/page/modules/value/page-value.module.code.ts"

const AGENT: ReadonlySet<string> = new Set(["seat", "subagent"])

function statedIn(root: string, path: string, key: string): string | null {
  const said = partedIn(path)
  if (said === null || said.sections.length > 0 || !AGENT.has(said.pageType)) return null
  const stated = textUnder(root, path, key)
  return stated === "" ? null : stated
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
