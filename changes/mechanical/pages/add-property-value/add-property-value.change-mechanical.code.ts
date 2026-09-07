import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  answered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import {
  keyOf,
  literalIn,
} from "../change-page-property/change-page-property.change-mechanical.code.ts"

export type AddPropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
}

export function withValue(
  text: string,
  source: ts.SourceFile,
  holding: ts.ArrayLiteralExpression,
  value: string
): string {
  const put = JSON.stringify(value)
  const last = holding.elements[holding.elements.length - 1]
  if (last === undefined) {
    const opened = holding.getStart(source) + 1
    return text.slice(0, opened) + put + text.slice(opened)
  }
  const ended = last.getEnd()
  return `${text.slice(0, ended)}, ${put}${text.slice(ended)}`
}

export function addPropertyValue(world: World, given: AddPropertyValueAsked): Answer {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  const one =
    owner === null
      ? undefined
      : owner.properties.find((each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key)
  if (one === undefined || !ts.isPropertyAssignment(one)) {
    return refusing(`\`${given.at}\` states no \`${given.key}\``)
  }
  const holding = one.initializer
  if (!ts.isArrayLiteralExpression(holding)) {
    return refusing(`\`${given.key}\` holds one value, so \`${given.value}\` is a restatement`)
  }
  if (holding.elements.some((each) => ts.isStringLiteral(each) && each.text === given.value)) {
    return refusing(`\`${given.key}\` holds \`${given.value}\` already`)
  }
  return answered([writing(given.at, text, withValue(text, source, holding, given.value))])
}

export function runChange(world: World, given: AddPropertyValueAsked): Answer {
  return addPropertyValue(world, given)
}
