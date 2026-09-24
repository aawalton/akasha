import {
  refusing,
  type Said,
  type Splice,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  type EntryAsked,
  entriesRewritten,
} from "akasha/change/modules/entry-rewriting/entry-rewriting.module.code.ts"
import { keysGoingInEntries } from "akasha/change/modules/json-entries/json-entries.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { z } from "zod"

const LINE = "\n"

const ENTRY = z.record(z.string(), z.unknown())

export type Asked = EntryAsked & {
  readonly field: string
  readonly kept?: string | null
}

function unkeptIn(at: string, text: string, field: string, kept: string): string | null {
  for (const line of text.split(LINE)) {
    if (line.trim() === "") continue
    const read = ENTRY.safeParse(JSON.parse(line))
    if (!read.success) continue
    const entry = read.data
    if (!(field in entry)) continue
    if (JSON.stringify(entry[kept]) === JSON.stringify(entry[field])) continue
    return `\`${at}\` has an entry whose \`${kept}\` does not hold the \`${field}\` it states`
  }
  return null
}

function spotsFor(given: Asked): (at: string, text: string) => readonly Splice[] | string {
  const kept = given.kept ?? null
  return (at, text) => {
    const unkept = kept === null ? null : unkeptIn(at, text, given.field, kept)
    return unkept ?? keysGoingInEntries(at, text, new Set([given.field]))
  }
}

export function removeEntryKeyOnEveryPage(world: World, given: Asked): Said {
  const edits = entriesRewritten(world, given, spotsFor(given))
  if (typeof edits === "string") return refusing(edits)
  if (edits.length === 0) {
    return telling(stating([]), [`no entry under \`${given.key}\` states \`${given.field}\``])
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return removeEntryKeyOnEveryPage(world, given)
}
