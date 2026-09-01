import { blobAt, type Warrant } from "../../warranting/warranting.module.code.ts"

export const ITSELF =
  "A write replaces the body standing there, and what is replaced is read first."

export function fileItself(root: string, path: string): readonly Warrant[] {
  const standing = blobAt(root, path)
  return standing === null ? [] : [{ path, oid: standing, owed: ITSELF }]
}
