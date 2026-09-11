import type {
  Carried,
  Facing,
  Naming,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const idOf = (one: string): string => `01a058c0-0000-7000-8000-00000000000${one}`

export const HELD = idOf("1")

export const THING = idOf("2")

export const DEEPER = idOf("3")

export const RECORDS = idOf("4")

export const ONE = idOf("5")

export const TWO = idOf("6")

export const OTHER = idOf("8")

export const ENTRIES = idOf("9")

export const SECTIONED = "akasha/one.thing.entries.jsonl"

export const SAYS: Value = {
  id: ENTRIES,
  pageTypeSlug: "file-property",
  slug: "entries",
  propertySlug: "entries",
}

export const NAMING: Naming = {
  path: "akasha/lockfile.file-property.ts",
  value: { fileName: "bun.lock", said: true },
}

export const OWNER = "akasha-workspace.workspace.ts"

export const ICONS: Naming = {
  path: "akasha/icons.named-folder-property.ts",
  value: { folderName: "Icons", said: true },
}

export const OWN: Naming = {
  path: "akasha/icons.named-folder-property.ts",
  value: { folderName: ".", said: true },
}

const ADDON = "one/two.eso-addon.ts"

export function saidTrue(value: Value): boolean {
  return value.said === true
}

export function saidNever(): boolean {
  return false
}

export function carryingAt(at: string): (named: string) => Carried {
  return (named) =>
    named === "file-property/lockfile"
      ? { carrying: [{ pageTypeSlug: "workspace", path: at, id: ONE, within: null }] }
      : { refused: "no page property carries that slug" }
}

export function refusing(): Carried {
  return { refused: "no page property carries that slug" }
}

export function folderedAt(named: string): Carried {
  return named === "named-folder-property/icons"
    ? { carrying: [{ pageTypeSlug: "eso-addon", path: ADDON, id: TWO, within: null }] }
    : { refused: "no page property carries that slug" }
}

export function facingSaying(value: Value | null): Facing {
  return {
    kindsUnder: () => ["file-property"],
    everyOfType: () => [{ path: NAMING.path }],
    valueAt: () => value,
    carryingOf: carryingAt(OWNER),
    filesIn: () => [],
  }
}

export function counting(seen: { reads: number }): Facing {
  return {
    kindsUnder: () => ["file-property"],
    everyOfType: () => {
      seen.reads += 1
      return []
    },
    valueAt: () => null,
    carryingOf: refusing,
    filesIn: () => [],
  }
}
