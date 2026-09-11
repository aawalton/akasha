import {
  type Body,
  overEachFile,
  overEachText,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { specifiersIn } from "akasha/code/code-specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"

const RELATIVE = /^\.\.?\//

const SPELT = /["'`]\.\.?\//

const ROOT = "akasha"

const GENERATED = "./+types/"

function found(path: string, text: string): readonly string[] {
  if (!SPELT.test(text)) return []
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    if (!RELATIVE.test(one)) continue
    if (one.startsWith(GENERATED)) continue
    said.push(`\`${one}\` names a file by a relative path rather than from \`${ROOT}\``)
  }
  return said
}

export const reasonsIn: (given: Body) => readonly string[] = overEachText(found)

export function refusalsOver(change: Change): readonly Judged[] {
  return overEachFile(change, reasonsIn)
}
