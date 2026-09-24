import {
  refusing,
  type Said,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  type EntryAsked,
  entriesRewritten,
} from "akasha/change/modules/entry-rewriting/entry-rewriting.module.code.ts"
import { keyCopiedInEntries } from "akasha/change/modules/json-entries/json-entries.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Asked = EntryAsked & {
  readonly from: string
  readonly to: string
}

export function copyEntryKeyOnEveryPage(world: World, given: Asked): Said {
  const edits = entriesRewritten(world, given, (at, text) =>
    keyCopiedInEntries(at, text, given.from, given.to)
  )
  if (typeof edits === "string") return refusing(edits)
  if (edits.length === 0) {
    return telling(stating([]), [
      `no entry under \`${given.key}\` states \`${given.from}\` without \`${given.to}\``,
    ])
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return copyEntryKeyOnEveryPage(world, given)
}
