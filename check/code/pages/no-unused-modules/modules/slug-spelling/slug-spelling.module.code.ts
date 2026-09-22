import {
  pathsSearched,
  TYPED_KINDS,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"

const DOUBLE = '"'

const SINGLE = "'"

export type Named = {
  readonly slug: string
  readonly files: readonly string[]
}

function spellingsOf(slug: string): readonly string[] {
  return [`${DOUBLE}${slug}${DOUBLE}`, `${SINGLE}${slug}${SINGLE}`]
}

function bodiesOver(read: (path: string) => string | null): (path: string) => string | null {
  const held = new Map<string, string | null>()
  return (path) => {
    const found = held.get(path)
    if (found !== undefined || held.has(path)) return found ?? null
    const said = read(path)
    held.set(path, said)
    return said
  }
}

function spelledBy(
  bodyOf: (path: string) => string | null,
  naming: readonly string[],
  one: Named
): boolean {
  const own = new Set(one.files)
  const wanted = spellingsOf(one.slug)
  for (const at of naming) {
    if (own.has(at)) continue
    const body = bodyOf(at)
    if (body === null) continue
    if (wanted.some((two) => body.includes(two))) return true
  }
  return false
}

export function slugsSpelled(
  root: string,
  read: (path: string) => string | null,
  named: readonly Named[]
): ReadonlySet<string> {
  const found = new Set<string>()
  if (named.length === 0) return found
  const asked = named.flatMap((one) => spellingsOf(one.slug))
  const naming = pathsSearched(root, asked, TYPED_KINDS)
  const bodyOf = bodiesOver(read)
  for (const one of named) {
    if (spelledBy(bodyOf, naming, one)) found.add(one.slug)
  }
  return found
}
