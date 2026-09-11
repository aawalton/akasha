import {
  refusing,
  spliced,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  withProperty,
  withValue,
} from "akasha/changes/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  keyFaultIn,
  keyOf,
  literalIn,
} from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

export type AddPropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly after?: string
  readonly single?: boolean
  readonly holds?: string
}

const BOOLEAN = "boolean"

const NUMBER = "number"

const TRUE = "true"

const FALSE = "false"

const NUMERAL = /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?$/

export function spelledAs(value: string, holds: string | undefined): string | null {
  if (holds === BOOLEAN) return value === TRUE || value === FALSE ? value : null
  if (holds === NUMBER) return NUMERAL.test(value) ? value : null
  return JSON.stringify(value)
}

export function addPropertyValue(world: World, given: AddPropertyValueAsked): Said {
  const fault = keyFaultIn(given.key)
  if (fault !== null) return refusing(fault)
  const said = spelledAs(given.value, given.holds)
  if (said === null) {
    return refusing(`\`${given.value}\` is no ${given.holds}, so nothing is put in`)
  }
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${given.at}\` exports no object`)
  const one = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
  )
  if (one === undefined || !ts.isPropertyAssignment(one)) {
    const put = given.single === true ? `${given.key}: ${said}` : `${given.key}: [${said}]`
    return stating(spliced(given.at, text, withProperty(text, source, owner, put, given.after)))
  }
  const holding = one.initializer
  if (!ts.isArrayLiteralExpression(holding)) {
    return refusing(`\`${given.key}\` holds one value, so \`${given.value}\` is a restatement`)
  }
  const already = holding.elements.some((each) =>
    ts.isStringLiteral(each) ? each.text === given.value : each.getText(source) === said
  )
  if (already) {
    return refusing(`\`${given.key}\` holds \`${given.value}\` already`)
  }
  return stating(spliced(given.at, text, withValue(source, holding, said)))
}

export function runChange(world: World, given: AddPropertyValueAsked): Said {
  return addPropertyValue(world, given)
}
