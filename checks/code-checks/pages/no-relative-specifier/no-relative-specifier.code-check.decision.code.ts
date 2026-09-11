import { specifiersIn } from "akasha/code-system/code-specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  type Body,
  overEachFile,
  overEachText,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const RELATIVE = /^\.\.?\//

const SPELT = /["'`]\.\.?\//

const ROOT = "akasha"

function found(path: string, text: string): readonly string[] {
  if (!SPELT.test(text)) return []
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    if (!RELATIVE.test(one)) continue
    said.push(`\`${one}\` names a file by a relative path rather than from \`${ROOT}\``)
  }
  return said
}

export const reasonsIn: (given: Body) => readonly string[] = overEachText(found)

export function refusalsOver(change: Change): readonly Judged[] {
  return overEachFile(change, reasonsIn)
}
