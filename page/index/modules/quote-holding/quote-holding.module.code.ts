import {
  type Facing,
  heldBeside,
  namingFor,
  sectionHeld,
  slugsWhere,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const QUOTED = "quoted"

const ENTRY = "page-property-entry"

export function quotes(value: Value): boolean {
  return value[QUOTED] === true
}

const QUOTING = new WeakMap<Facing, ReadonlySet<string>>()

function quotingFor(given: Facing): ReadonlySet<string> {
  const found = QUOTING.get(given)
  if (found !== undefined) return found
  const made = slugsWhere(given, quotes, given.carryingOf, ENTRY)
  QUOTING.set(given, made)
  return made
}

export function quotedIn(given: Facing, path: string): boolean {
  try {
    if (sectionHeld(path, quotingFor(given))) return true
    return heldBeside(path, namingFor(given), quotes, given.carryingOf)
  } catch {
    return false
  }
}
