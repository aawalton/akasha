import { dirname } from "node:path"
import {
  type Body,
  overEachFile,
  overEachText,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { specifiersIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const ROOT = "akasha/"

const UNDER = "change/"

const SPELT = `${ROOT}${UNDER}`

const REACHED = /^akasha\/change\/(agent|mechanical)\//

const CODE = ".code.ts"

const ADDRESSED = ".change-runner.addressed.ts"

function found(path: string, text: string): readonly string[] {
  if (path.endsWith(ADDRESSED) || !text.includes(SPELT)) return []
  const home = dirname(path)
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    if (!REACHED.test(one) || !one.endsWith(CODE)) continue
    if (dirname(one.slice(ROOT.length)) === home) continue
    said.push(
      `\`${one}\` is another change's code, and a change is reached through a runner rather than` +
        " by importing that change"
    )
  }
  return said
}

export const reasonsIn: (given: Body) => readonly string[] = overEachText(found)

export function refusalsOver(change: Change): readonly Judged[] {
  return overEachFile(change, textNamed, reasonsIn)
}
