import { parsedAs } from "@akasha/code/code-source"
import { refusing, spliced, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { without } from "../../../../modules/literal-splicing/literal-splicing.module.code.ts"
import {
  listIn,
  matchingIn,
  recordsIn,
} from "../../../../modules/page-literal/page-literal.module.code.ts"

export type RemovePropertyRecordAsked = {
  readonly at: string
  readonly key: string
  readonly where: string
  readonly is: string
}

export function recordGone(path: string, text: string, given: RemovePropertyRecordAsked): Said {
  const source = parsedAs(path, text)
  const list = listIn(source, given.key)
  if (list === null || recordsIn(list).length === 0) {
    return refusing(`\`${path}\` states no records under \`${given.key}\``)
  }
  const found = matchingIn(list, given.where, given.is)
  const at = found[0]
  if (at === undefined) {
    return refusing(`no record under \`${given.key}\` states that text under \`${given.where}\``)
  }
  if (found.length > 1) {
    return refusing(
      `${found.length} records under \`${given.key}\` state that text under \`${given.where}\`, and one change works one`
    )
  }
  return stating(spliced(path, text, without(text, source, list, list.elements, at)))
}

export function runChange(world: World, given: RemovePropertyRecordAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  return recordGone(given.at, text, given)
}
