import { importingOf } from "../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { answered, refusing } from "../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../modules/change-answer/change-answer.module.types.ts"
import { repointed } from "../repoint-imports/repoint-imports.change.code.ts"

export type Asked = {
  readonly from: string
  readonly to: string
}

export function renamePath(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Answer {
  if (given.from === given.to) return refusing(`\`${given.to}\` is the path it already sits at`)
  const text = textOf(given.from)
  if (text === null) return refusing(`\`${given.from}\` could not be read`)
  if (textOf(given.to) !== null) return refusing(`\`${given.to}\` is a body already`)
  const moved = new Map([[given.from, given.to]])
  const reading = importingOf(root, moved)
  if ("unread" in reading) return refusing(reading.unread)
  const edits: Edit[] = [...repointed(given.from, given.to, text, moved).edits]
  for (const path of reading.importers) {
    const held = textOf(path)
    if (held === null) return refusing(`\`${path}\` names what moved and could not be read`)
    for (const one of repointed(path, path, held, moved).edits) {
      if (one.body !== held) edits.push(one)
    }
  }
  return answered(edits)
}
