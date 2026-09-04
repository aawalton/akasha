import { valuesOfType } from "@akasha/indexes"
import { type Carried, carryingOf, heldBeside } from "@akasha/indexes/property-carrying"
import type { Value } from "@akasha/pages-system/page-value"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const ITSELF =
  "A file answers for the body it holds, and that body is read before the file is changed."

const NAMED = "named-file-property"

const WRITTEN = "machineWritten"

export function machineWrote(value: Value): boolean {
  return value[WRITTEN] === true
}

export function writtenBeside(root: string, path: string): boolean {
  try {
    const carrying = (named: string): Carried => carryingOf(root, named)
    return heldBeside(path, valuesOfType(root, NAMED), machineWrote, carrying)
  } catch {
    return false
  }
}

export function fileItself(root: string, path: string): readonly Warrant[] {
  if (writtenBeside(root, path)) return []
  const oid = blobAt(root, path)
  return oid === null ? [] : [{ path, oid: oid, owed: ITSELF }]
}
