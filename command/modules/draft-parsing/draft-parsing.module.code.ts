import {
  type BodyOf,
  type FileChange,
  pathsOf,
  replayed,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  faultPlaced,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const TYPESCRIPT = /\.tsx?$/

export function unparsedAfter(
  bodyOf: BodyOf,
  rows: readonly FileChange[],
  asked: readonly FileChange[]
): readonly string[] {
  const named = new Set(asked.flatMap(pathsOf).filter((one) => TYPESCRIPT.test(one)))
  if (named.size === 0) return []
  const after = replayed({ edits: rows, refused: null }, bodyOf)
  if ("refused" in after) return []
  const found: string[] = []
  for (const path of named) {
    const body = after.get(path)
    if (typeof body !== "string") continue
    const fault = faultPlaced(parsedAs(path, body))
    if (fault !== null) found.push(`\`${path}\` would no longer parse — ${fault}`)
  }
  return found
}
