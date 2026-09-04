import { blobAt, type Warrant } from "../../warranting/warranting.module.code.ts"

export const ITSELF =
  "A file answers for the body it holds, and that body is read before the file is changed."

export function fileItself(root: string, path: string): readonly Warrant[] {
  const oid = blobAt(root, path)
  return oid === null ? [] : [{ path, oid: oid, owed: ITSELF }]
}
