import { parsedAs } from "@akasha/code/code-source"
import { exportedAs } from "@akasha/pages/page-export-name"
import ts from "typescript"
import { refusing, spliced, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  withProperty,
  withValue,
} from "../../../../modules/literal-splicing/literal-splicing.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"

export type AddPropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly after?: string
  readonly single?: boolean
}

const BARE = /^[A-Za-z_$][A-Za-z0-9_$]*$/

function keyFaultIn(key: string): string | null {
  if (BARE.test(key)) return null
  const spelled = exportedAs(key)
  if (!BARE.test(spelled)) return `\`${key}\` is no key a page spells`
  return `\`${key}\` is no key a page spells, and \`${spelled}\` is the key that spelling names`
}

export function addPropertyValue(world: World, given: AddPropertyValueAsked): Said {
  const fault = keyFaultIn(given.key)
  if (fault !== null) return refusing(fault)
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${given.at}\` exports no object`)
  const one = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
  )
  if (one === undefined || !ts.isPropertyAssignment(one)) {
    const said = JSON.stringify(given.value)
    const put = given.single === true ? `${given.key}: ${said}` : `${given.key}: [${said}]`
    return stating(spliced(given.at, text, withProperty(text, source, owner, put, given.after)))
  }
  const holding = one.initializer
  if (!ts.isArrayLiteralExpression(holding)) {
    return refusing(`\`${given.key}\` holds one value, so \`${given.value}\` is a restatement`)
  }
  if (holding.elements.some((each) => ts.isStringLiteral(each) && each.text === given.value)) {
    return refusing(`\`${given.key}\` holds \`${given.value}\` already`)
  }
  return stating(spliced(given.at, text, withValue(source, holding, given.value)))
}

export function runChange(world: World, given: AddPropertyValueAsked): Said {
  return addPropertyValue(world, given)
}
