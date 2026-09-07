import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import { refusing, stating } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"

export type AddPropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly after?: string
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

export function withProperty(
  text: string,
  source: ts.SourceFile,
  owner: ts.ObjectLiteralExpression,
  given: AddPropertyValueAsked
): string {
  const put = `${given.key}: [${JSON.stringify(given.value)}]`
  const named = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.after
  )
  const anchor = named ?? owner.properties[owner.properties.length - 1]
  if (anchor === undefined) {
    const opened = owner.getStart(source) + 1
    return `${text.slice(0, opened)}\n  ${put},\n${text.slice(opened)}`
  }
  const started = anchor.getStart(source)
  const indent = text.slice(text.lastIndexOf("\n", started) + 1, started)
  const ended = anchor.getEnd()
  return `${text.slice(0, ended)},\n${indent}${put}${text.slice(ended)}`
}

export function addPropertyValue(world: World, given: AddPropertyValueAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${given.at}\` exports no object`)
  const one = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
  )
  if (one === undefined || !ts.isPropertyAssignment(one)) {
    const gained = withProperty(text, source, owner, given)
    return stating([{ kind: "replace", path: given.at, contentFrom: text, contentTo: gained }])
  }
  const holding = one.initializer
  if (!ts.isArrayLiteralExpression(holding)) {
    return refusing(`\`${given.key}\` holds one value, so \`${given.value}\` is a restatement`)
  }
  if (holding.elements.some((each) => ts.isStringLiteral(each) && each.text === given.value)) {
    return refusing(`\`${given.key}\` holds \`${given.value}\` already`)
  }
  const put = withValue(text, source, holding, given.value)
  return stating([{ kind: "replace", path: given.at, contentFrom: text, contentTo: put }])
}

export function runChange(world: World, given: AddPropertyValueAsked): Said {
  return addPropertyValue(world, given)
}
