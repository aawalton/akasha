import { dirname, join } from "node:path"
import {
  type Answer,
  type Replacing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { formulaFileWrittenAgain } from "akasha/temper/player/character/stat/temper-metric/modules/metric-formula-writing/metric-formula-writing.module.code.ts"
import { temperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.ts"

const HERE = "change/agent/file/write-metric-formula-files"

const PAGES = "pages"

const ENDING = `.${temperMetric.slug}.formula.ts`

export type Asked = Readonly<Record<string, string>>

const SCOPE = "scope"

export const takes: readonly string[] = [SCOPE]

export function runChange(world: World, given: Asked): Promise<Answer> {
  if (given[SCOPE] !== "all")
    return Promise.resolve(refusing(`\`${SCOPE}\` is \`all\`, the one scope ${HERE} writes`))
  const listed = world.index.listedAt(pageType.slug, temperMetric.slug)[0]
  if (listed === undefined)
    return Promise.resolve(refusing(`the stat page type is not placed, ${HERE}`))
  const edits: Replacing[] = []
  for (const path of world.under(join(dirname(listed.path), PAGES))) {
    if (!path.endsWith(ENDING)) continue
    const text = world.textOf(path)
    if (text === null) continue
    const again = formulaFileWrittenAgain(text)
    if (again === null)
      return Promise.resolve(refusing(`\`${path}\` holds no formula ${HERE} reads`))
    if (again === text) continue
    edits.push({ kind: "replace", path, contentFrom: text, contentTo: again })
  }
  return Promise.resolve({ edits, refused: null })
}
