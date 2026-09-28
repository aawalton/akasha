import {
  type BodyOf,
  type FileChange,
  pathsOf,
  replayed,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { refusalsIn } from "akasha/check/code/pages/page-matches-its-type/page-matches-its-type.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"

export type Read = (path: string) => string | null

export type Judge = (paths: readonly string[], read: Read) => readonly Judged[]

const PAGE = /\.ts$/

export function judgeOver(root: string, index: Answering): Judge {
  return (paths, read) => {
    try {
      return refusalsIn({
        root,
        index,
        paths,
        read,
        pageOf: (path) => {
          const text = read(path)
          return text === null ? null : valueIn(text)
        },
        bytes: () => null,
      })
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
  const named = [...new Set(asked.flatMap(pathsOf))].filter(
    (path) => PAGE.test(path) && textOf(bodyOf(path)) !== null
  )
  if (named.length === 0) return []
  const after = replayed({ edits: rows, refused: null }, bodyOf)
  if ("refused" in after) return []
  const before: Read = (path) => textOf(bodyOf(path))
  const drafted: Read = (path) => (after.has(path) ? textOf(after.get(path) ?? null) : before(path))
  const already = new Map<string, number>()
  for (const one of judge(named, before)) {
    already.set(keyOf(one), (already.get(keyOf(one)) ?? 0) + 1)
  }
  const found: string[] = []
  for (const one of judge(named, drafted)) {
    const left = already.get(keyOf(one)) ?? 0
    if (left > 0) {
      already.set(keyOf(one), left - 1)
      continue
    }
    found.push(`\`${one.path}\` would not match its page type — ${one.reason}`)
  }
  return found
}
