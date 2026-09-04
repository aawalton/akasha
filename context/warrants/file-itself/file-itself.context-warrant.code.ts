import { basename } from "node:path"
import { valuesOfType } from "@akasha/indexes"
import type { Value } from "@akasha/pages-system/page-value"
import { blobAt, type Warrant } from "../../warranting/warranting.module.code.ts"

export const ITSELF =
  "A file answers for the body it holds, and that body is read before the file is changed."

const NAMED = "named-file-property"

const WRITTEN = "machineWritten"

const FILE_NAME = "fileName"

export function writtenNamesFrom(values: Iterable<Value | null>): ReadonlySet<string> {
  const made = new Set<string>()
  for (const value of values) {
    if (value === null || value[WRITTEN] !== true) continue
    const named = value[FILE_NAME]
    if (typeof named === "string" && named !== "") made.add(named)
  }
  return made
}

export function writtenNamesIn(root: string): ReadonlySet<string> {
  try {
    return writtenNamesFrom(valuesOfType(root, NAMED).map((one) => one.value))
  } catch {
    return new Set<string>()
  }
}

export function fileItself(root: string, path: string): readonly Warrant[] {
  if (writtenNamesIn(root).has(basename(path))) return []
  const oid = blobAt(root, path)
  return oid === null ? [] : [{ path, oid: oid, owed: ITSELF }]
}
