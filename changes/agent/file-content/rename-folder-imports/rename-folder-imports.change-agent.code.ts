import { dirname, join } from "node:path"
import {
  missing,
  refusing,
  splicing,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { placedIn } from "akasha/code/modules/specifier/code-specifier.module.code.ts"
import { typed } from "akasha/code/typing/code-typing.module.code.ts"

const AT = "at"

const ROOT = "akasha/"

const RELATIVE = /^\.\.?\//

const CLIMBS = ".."

const UNSPELT = "so no path is spelled anew"

export type RenameFolderImportsAsked = {
  readonly at: string
}

export function landedFor(path: string, said: string): string | null {
  if (!RELATIVE.test(said)) return null
  const landed = join(dirname(path), said)
  return landed.startsWith(CLIMBS) ? null : landed
}

export function spellingIn(world: World, path: string, text: string): readonly Splice[] {
  const found: Splice[] = []
  for (const one of placedIn(path, text)) {
    const landed = landedFor(path, one.text)
    if (landed === null || world.textOf(landed) === null) continue
    found.push({ from: one.start, to: one.end, put: JSON.stringify(`${ROOT}${landed}`) })
  }
  return found
}

export function renameFolderImports(world: World, given: RenameFolderImportsAsked): Said {
  const edits: FileChange[] = []
  let read = 0
  for (const path of world.under(given.at)) {
    if (!typed(path)) continue
    read += 1
    const text = world.textOf(path)
    if (text === null) continue
    const found = spellingIn(world, path, text)
    if (found.length === 0) continue
    edits.push(...splicing(path, text, found))
  }
  if (read === 0) return refusing(`\`${given.at}\` holds no TypeScript, ${UNSPELT}`)
  if (edits.length === 0) {
    return refusing(`no body under \`${given.at}\` names a file by a relative path, ${UNSPELT}`)
  }
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT]

export function runChange(world: World, given: Asked): Said {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return renameFolderImports(world, { at })
}
