import {
  refusing,
  type Said,
  spliced,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { without } from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  assignedIn,
  recordMatchedIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  valueRemoved,
} from "akasha/change/modules/value-removing/value-removing.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

export type RemovePropertyValueAsked = Asked & {
  readonly where?: string
  readonly is?: string
  readonly field?: string
}

type InRecord = Asked & {
  readonly where: string
  readonly is: string
  readonly field: string
}

function takenFromRecord(world: World, given: InRecord): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const matched = recordMatchedIn(given.at, source, given.key, given.where, given.is)
  if ("refused" in matched) return refusing(matched.refused)
  const one = assignedIn(matched.record, given.field)
  const holding = one === null ? null : one.initializer
  if (holding === null || !ts.isArrayLiteralExpression(holding)) {
    return refusing(`\`${given.field}\` in that record holds no list`)
  }
  const found = holding.elements.findIndex(
    (each) => ts.isStringLiteral(each) && each.text === given.value
  )
  if (found < 0) return refusing(`\`${given.field}\` in that record holds no \`${given.value}\``)
  return stating(spliced(given.at, text, without(text, source, holding, holding.elements, found)))
}

export function removePropertyValue(world: World, given: RemovePropertyValueAsked): Said {
  const { where, is, field } = given
  if (where !== undefined && is !== undefined && field !== undefined) {
    return takenFromRecord(world, { ...given, where, is, field })
  }
  if (where !== undefined || is !== undefined || field !== undefined) {
    return refusing("`where`, `is` and `field` are stated together or not at all")
  }
  return valueRemoved(world, given)
}

export function runChange(world: World, given: RemovePropertyValueAsked): Said {
  return removePropertyValue(world, given)
}
