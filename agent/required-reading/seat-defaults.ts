import { diskFileTree } from "../../page/file-tree.ts"
import { compiledPageTypeFor } from "../../page/property/frontmatter.ts"
import { registryOf } from "../../page/property/registry.ts"
import { rootsHere } from "../../repo/roots/roots.ts"

const SEAT_TYPE = "seat"

const held = new Map<string, ReadonlyMap<string, string>>()

export function seatDefaults(): ReadonlyMap<string, string> {
  const roots = rootsHere()
  const key = roots.akasha ?? ""
  const already = held.get(key)
  if (already !== undefined) return already
  const tree = diskFileTree(roots)
  const seat = registryOf(tree).find((one) => one.slug === SEAT_TYPE)
  const made = new Map<string, string>()
  for (const one of seat === undefined ? [] : (compiledPageTypeFor(seat, tree).properties ?? [])) {
    if (typeof one.default === "string") made.set(one.name, one.default)
  }
  held.set(key, made)
  return made
}
