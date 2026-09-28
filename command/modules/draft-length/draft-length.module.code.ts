import {
  type BodyOf,
  type FileChange,
  pathsOf,
  replayed,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  exemptIn,
  reasonsIn,
} from "akasha/check/code/pages/file-length/file-length.check-code.decision.code.ts"
import { unparsedAfter } from "akasha/command/modules/draft-parsing/draft-parsing.module.code.ts"
import {
  judgeOver,
  mistypedAfter,
} from "akasha/command/modules/draft-typing/draft-typing.module.code.ts"
import { definingRefused } from "akasha/command/modules/mechanic-defining/mechanic-defining.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"

export type LetOff = (path: string) => boolean

const ENCODER = new TextEncoder()

export function overLongAfter(
  bodyOf: BodyOf,
  rows: readonly FileChange[],
  asked: readonly FileChange[],
  letOff: LetOff
): readonly string[] {
  const named = new Set(asked.flatMap(pathsOf))
  if (named.size === 0) return []
  const after = replayed({ edits: rows, refused: null }, bodyOf)
  if ("refused" in after) return []
  const found: string[] = []
  for (const path of named) {
    const body = after.get(path)
    if (typeof body !== "string" || letOff(path)) continue
    for (const reason of reasonsIn(path, ENCODER.encode(body).byteLength)) {
      found.push(`\`${path}\` would be ${reason}`)
    }
  }
  return found
}

export function draftFaults(
  root: string,
  bodyOf: BodyOf,
  index: Answering,
  rows: readonly FileChange[],
  asked: readonly FileChange[],
  page: string
): readonly string[] {
  const paged = { index, pageOf: () => null }
  const unparsed = unparsedAfter(bodyOf, rows, asked)
  return [
    ...unparsed,
    ...overLongAfter(bodyOf, rows, asked, (path) => exemptIn(path, paged)),
    ...(unparsed.length > 0 ? [] : mistypedAfter(bodyOf, rows, asked, judgeOver(root, index))),
    ...definingRefused(index, bodyOf, page, asked),
  ]
}
