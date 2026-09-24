import type {
  Given,
  Marking,
  Refusal,
} from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { calledIn } from "akasha/page/modules/export-name/modules/export-spelling/export-spelling.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"

const COMMANDS_AT = "command/pages/"

export const mark: Marking = (_text, path) => path.startsWith(COMMANDS_AT)

const CODE_NAMED = /^(.+)\.command\.code\.tsx?$/

const FIRST = 1

const LAST = 1

const INSTEAD = "the command system reaches a command under that name and finds nothing"

export function slugOf(path: string): string | null {
  if (!path.startsWith(COMMANDS_AT)) return null
  const parts = path.slice(COMMANDS_AT.length).split("/")
  const named = parts[parts.length - LAST] ?? ""
  return firstCapture(CODE_NAMED.exec(named))
}

export function commandExportNamedForItsSlug(standing: Given): readonly Refusal[] {
  const slug = slugOf(standing.path)
  if (slug === null) return []
  const named = exportedAs(slug)
  if (calledIn(standing.path, standing.source.text, named)) return []
  return [
    {
      line: FIRST,
      reason: `this code exports no \`${named}\`, the name \`${slug}\` spells — ${INSTEAD}`,
    },
  ]
}
