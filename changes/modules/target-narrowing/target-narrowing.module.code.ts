import type { World } from "../change-shadow/change-shadow.module.code.ts"

const SUBTYPE = "change-target-subtype"

const PARENT = "parent"

export function slugIn(address: string): string {
  return address.slice(address.indexOf("/") + 1)
}

export function narrows(world: World, kind: string, of: string): boolean {
  const seen = new Set<string>()
  let held: string | null = kind
  while (held !== null && !seen.has(held)) {
    if (held === of) return true
    seen.add(held)
    const value = world.index.pageAt(SUBTYPE, held)
    if (value === null) return false
    const named = value[PARENT]
    held = typeof named === "string" ? slugIn(named) : null
  }
  return false
}
