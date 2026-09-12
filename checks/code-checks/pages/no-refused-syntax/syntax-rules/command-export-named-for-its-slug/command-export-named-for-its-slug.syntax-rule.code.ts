import { calledIn } from "akasha/changes/modules/export-spelling/export-spelling.module.code.ts"
import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"

const COMMANDS_AT = "commands/pages/"

const CODE_NAMED = /^(.+)\.command\.code\.tsx?$/

const FIRST = 1

const LAST = 1

const INSTEAD = "the command system reaches a command under that name and finds nothing"

export function slugOf(path: string): string | null {
  if (!path.startsWith(COMMANDS_AT)) return null
  const parts = path.slice(COMMANDS_AT.length).split("/")
  const named = parts[parts.length - LAST] ?? ""
  return CODE_NAMED.exec(named)?.[LAST] ?? null
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
