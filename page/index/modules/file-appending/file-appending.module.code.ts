import {
  type Carried,
  type Facing,
  heldBeside,
  namingFor,
  sectionHeld,
  slugsWhere,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const APPEND_ONLY = "appendOnly"

const APPENDING = new WeakMap<Facing, ReadonlySet<string>>()

export function appendsOnly(value: Value): boolean {
  return value[APPEND_ONLY] === true
}

export function appendingFor(given: Facing): ReadonlySet<string> {
  const found = APPENDING.get(given)
  if (found !== undefined) return found
  const made = slugsWhere(given, appendsOnly, given.carryingOf)
  APPENDING.set(given, made)
  return made
}

export function appendOnlyIn(given: Facing, path: string): boolean {
  if (sectionHeld(path, appendingFor(given))) return true
  const carrying = (named: string): Carried => given.carryingOf(named)
  return heldBeside(path, namingFor(given), appendsOnly, carrying)
}
