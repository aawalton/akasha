import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { refusing, spliced, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  requiredIn,
  type Sought,
} from "../../../../modules/key-requiring/key-requiring.module.code.ts"
import { without } from "../../../../modules/literal-splicing/literal-splicing.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"

export type RemovePropertyValueAsked = Sought & {
  readonly value: string
}

export function removePropertyValue(world: World, given: RemovePropertyValueAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  const at =
    owner === null
      ? -1
      : owner.properties.findIndex(
          (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
        )
  const one = owner === null ? undefined : owner.properties[at]
  if (owner === null || one === undefined || !ts.isPropertyAssignment(one)) {
    return refusing(`\`${given.at}\` states no \`${given.key}\``)
  }
  const holding = one.initializer
  if (ts.isArrayLiteralExpression(holding)) {
    const found = holding.elements.findIndex(
      (each) => ts.isStringLiteral(each) && each.text === given.value
    )
    if (found < 0) return refusing(`\`${given.key}\` holds no \`${given.value}\``)
    const gone = without(text, source, holding, holding.elements, found)
    return stating(spliced(given.at, text, gone))
  }
  if (!ts.isStringLiteral(holding) || holding.text !== given.value) {
    return refusing(`\`${given.key}\` holds no \`${given.value}\``)
  }
  const required = requiredIn(world, given)
  if (required === null) {
    return refusing(`whether \`${given.key}\` is required could not be read`)
  }
  if (required) {
    return refusing(`\`${given.key}\` is required, so taking \`${given.value}\` away is a retype`)
  }
  const left = without(text, source, owner, owner.properties, at)
  return stating(spliced(given.at, text, left))
}

export function runChange(world: World, given: RemovePropertyValueAsked): Said {
  return removePropertyValue(world, given)
}
