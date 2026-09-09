import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { refusing, spliced, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  listIn,
  matchingIn,
  recordsIn,
  textsOf,
} from "../../../../modules/page-literal/page-literal.module.code.ts"

export type Named = {
  readonly key: string
  readonly where: string
  readonly is: string
  readonly field: string
}

export function fieldRestated(path: string, text: string, named: Named, to: string): Said {
  const source = parsedAs(path, text)
  const list = listIn(source, named.key)
  if (list === null || recordsIn(list).length === 0) {
    return refusing(`\`${path}\` states no records under \`${named.key}\``)
  }
  const found = matchingIn(list, named.where, named.is)
  const at = found[0]
  const one = at === undefined ? undefined : list.elements[at]
  if (one === undefined || !ts.isObjectLiteralExpression(one)) {
    return refusing(`no record under \`${named.key}\` states that text under \`${named.where}\``)
  }
  if (found.length > 1) {
    return refusing(
      `${found.length} records under \`${named.key}\` state that text under \`${named.where}\`, and one change works one`
    )
  }
  const held = textsOf(one).get(named.field)
  if (held === undefined) {
    return refusing(`that record states no text under \`${named.field}\``)
  }
  if (held.text === to) {
    return refusing(`\`${to}\` is what \`${named.field}\` states already`)
  }
  const put = JSON.stringify(to)
  return stating(spliced(path, text, { from: held.getStart(source), to: held.getEnd(), put }))
}

export type Given = Named & {
  readonly at: string
  readonly to: string
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so nothing is restated`)
  return fieldRestated(given.at, text, given, given.to)
}
