import { machineWrittenAt } from "@akasha/indexes/property-carrying"
import { blobAt, type Warrant } from "../../modules/warranting/warranting.module.code.ts"

export const ITSELF =
  "A file answers for the body it holds, and that body is read before the file is changed."

export function fileItself(root: string, path: string): readonly Warrant[] {
  if (machineWrittenAt(root, path)) return []
  const oid = blobAt(root, path)
  return oid === null ? [] : [{ path, oid: oid, owed: ITSELF }]
}
