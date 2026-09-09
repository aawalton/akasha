import { parsedAs } from "@akasha/code/code-source"
import { refusing, spliced, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import { statedIn } from "../../../../modules/page-literal/page-literal.module.code.ts"
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const TRAILING_LINES = /\n+$/

export function restated(path: string, text: string, key: string, to: string): Said {
  const stated = to.replace(TRAILING_LINES, "")
  const source = parsedAs(path, text)
  const held = statedIn(source).get(key)
  if (held === undefined) return refusing(`\`${path}\` states no text under \`${key}\``)
  if (held.text === stated) return refusing(`\`${stated}\` is what \`${key}\` states already`)
  const put = JSON.stringify(stated)
  return stating(spliced(path, text, { from: held.getStart(source), to: held.getEnd(), put }))
}

export type Given = {
  readonly at: string
  readonly key: string
  readonly to: string
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so nothing is restated`)
  return restated(given.at, text, given.key, given.to)
}
