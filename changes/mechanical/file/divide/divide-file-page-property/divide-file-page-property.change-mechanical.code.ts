import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { ENTRY_CEILING } from "akasha/pages/entry-ceiling/entry-ceiling.module.code.ts"
import {
  type Part,
  type Parts,
  partsOverLines,
} from "akasha/pages/entry-writing/page-entry-writing.module.code.ts"
import { partsOf } from "akasha/pages/file-parts/page-file-parts.module.code.ts"

const NEWLINE = "\n"

export type Asked = {
  readonly at: string
  readonly property: string
}

export function* linesIn(texts: Iterable<string>): Iterable<string> {
  for (const text of texts) {
    let at = 0
    while (at < text.length) {
      const end = text.indexOf(NEWLINE, at)
      if (end < 0) {
        yield text.slice(at)
        break
      }
      yield text.slice(at, end + 1)
      at = end + 1
    }
  }
}

export function partsFor(
  page: string,
  property: string,
  held: string,
  texts: readonly string[],
  ceiling: number
): Parts {
  return partsOverLines(page, property, held, linesIn(texts), ceiling)
}

export function editsOver(
  was: readonly string[],
  textOf: (at: string) => string | null,
  made: readonly Part[]
): readonly FileChange[] {
  const edits: FileChange[] = []
  const surplus = new Set(was)
  for (const one of made) {
    surplus.delete(one.path)
    const had = textOf(one.path)
    if (had === one.text) continue
    if (had === null) edits.push({ kind: "add", path: one.path, content: one.text })
    else edits.push({ kind: "replace", path: one.path, contentFrom: had, contentTo: one.text })
  }
  for (const path of was) {
    if (surplus.has(path)) edits.push({ kind: "remove", path })
  }
  return edits
}

export function runChange(world: World, given: Asked): Answer {
  const value = world.index.pageByPath(given.at)
  if (value === null) {
    return refusing(`\`${given.at}\` is no page here, so nothing says what holds its rows`)
  }
  const held = (value as Record<string, unknown>)[given.property]
  if (typeof held !== "string") {
    return refusing(
      `\`${given.at}\` states no \`${given.property}\`, so that property is held in no file`
    )
  }
  const textOf = (at: string): string | null => world.textOf(at)
  const was = partsOf(given.at, given.property, held, (at) => textOf(at) !== null)
  const made = partsFor(
    given.at,
    given.property,
    held,
    was.map((at) => textOf(at) ?? ""),
    ENTRY_CEILING
  )
  if ("refused" in made) return refusing(made.refused)
  return stating(editsOver(was, textOf, made.parts))
}
