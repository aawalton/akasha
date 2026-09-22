import { pathsSearched } from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { uncommittedSpelled } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const UNTYPED_KINDS: readonly string[] = [
  "*.toml",
  "*.json",
  "*.yaml",
  "*.yml",
  "*.sh",
  "Containerfile",
  "Dockerfile",
]

export type Held = {
  readonly page: string
  readonly files: readonly string[]
}

function bodiesIn(change: Change, naming: readonly string[]): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const at of naming) {
    const said = textIn(change, at)
    if (said !== null) found.set(at, said)
  }
  return found
}

function namedBy(bodies: ReadonlyMap<string, string>, one: Held): boolean {
  const own = new Set(one.files)
  for (const [at, body] of bodies) {
    if (own.has(at)) continue
    if (one.files.some((two) => body.includes(two))) return true
  }
  return false
}

export function pathsNamed(change: Change, held: readonly Held[]): ReadonlySet<string> {
  const found = new Set<string>()
  if (held.length === 0) return found
  const asked = held.flatMap((one) => one.files)
  const naming = pathsSearched(change.root, asked, UNTYPED_KINDS).filter(
    (one) => !uncommittedSpelled(one)
  )
  const bodies = bodiesIn(change, naming)
  for (const one of held) {
    if (namedBy(bodies, one)) found.add(one.page)
  }
  return found
}
