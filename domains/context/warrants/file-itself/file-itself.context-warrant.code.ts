import { spellsText } from "akasha/code-system/utf8-body/utf8-body.module.code.ts"
import { blobIdOf } from "akasha/commands/modules/reading/reading.module.code.ts"
import {
  bytesAt,
  type Warrant,
} from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { generatedAt } from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"

export const ITSELF =
  "A file answers for the body it holds, and that body is read before the file is changed."

export function fileItself(root: string, path: string): readonly Warrant[] {
  if (generatedAt(root, path)) return []
  const bytes = bytesAt(root, path)
  if (bytes === null || !spellsText(bytes)) return []
  return [{ path, oid: blobIdOf(bytes), owed: ITSELF }]
}
