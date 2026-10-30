import {
  type BodyOf,
  type FileChange,
  pathsOf,
  replayed,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { refusalsIn } from "akasha/check/code/pages/page-matches-its-type/page-matches-its-type.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { generatedProperties } from "akasha/page/index/modules/generated-properties/generated-properties.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

type Read = (path: string) => string | null

export type Judge = (
  paths: readonly string[],
  read: Read,
  added?: ReadonlySet<string>
) => readonly Judged[]

const PAGE = /\.ts$/

const ADD = "add"

const NOTHING: ReadonlySet<string> = new Set()

export function judgeOver(root: string, index: Answering): Judge {
  return (paths, read, added = NOTHING) => {
    const pageOf = (path: string): Value | null => {
      const text = read(path)
      return text === null ? null : valueIn(text)
    }
    let generated: ReadonlySet<string> | null = null
    const excusedAt = (path: string): ReadonlySet<string> => {
      if (!added.has(path)) return NOTHING
      if (generated === null) generated = new Set(generatedProperties({ index, pageOf }).keys())
      return generated
    }
    try {
      return refusalsIn({ root, index, paths, read, pageOf, bytes: () => null }, excusedAt)
    } catch {
      return []
    }
  }
}

function textOf(held: ReturnType<BodyOf>): string | null {
  return typeof held === "string" ? held : null
}

function keyOf(one: Judged): string {
  return `${one.path}\n${one.reason}`
}

export function mistypedAfter(
  bodyOf: BodyOf,
  rows: readonly FileChange[],
  asked: readonly FileChange[],
  judge: Judge
): readonly string[] {
  const before: Read = (path) => textOf(bodyOf(path))
  const held = [...new Set(asked.flatMap(pathsOf))].filter(
    (path) => PAGE.test(path) && before(path) !== null
  )
  const adding = asked.flatMap((one) =>
    one.kind === ADD && PAGE.test(one.path) && before(one.path) === null ? [one.path] : []
  )
  if (held.length === 0 && adding.length === 0) return []
  const after = replayed({ edits: rows, refused: null }, bodyOf)
  if ("refused" in after) return []
  const drafted: Read = (path) => (after.has(path) ? textOf(after.get(path) ?? null) : before(path))
  const added = new Set(adding.filter((path) => drafted(path) !== null))
  const already = new Map<string, number>()
  for (const one of judge(held, before)) {
    already.set(keyOf(one), (already.get(keyOf(one)) ?? 0) + 1)
  }
  const found: string[] = []
  for (const one of judge([...held, ...added], drafted, added)) {
    const left = already.get(keyOf(one)) ?? 0
    if (left > 0) {
      already.set(keyOf(one), left - 1)
      continue
    }
    found.push(`\`${one.path}\` would not match its page type — ${one.reason}`)
  }
  return found
}
