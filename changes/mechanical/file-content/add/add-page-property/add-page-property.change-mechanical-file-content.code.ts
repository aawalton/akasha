import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  refusing,
  spliced,
  stating,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"
import { withProperty } from "../add-property-value/add-property-value.change-mechanical-file-content.code.ts"

export type AddPagePropertyAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly after?: string
}

const READING = "value.ts"

function isData(held: ts.Expression): boolean {
  if (ts.isStringLiteral(held) || ts.isNumericLiteral(held)) return true
  if (held.kind === ts.SyntaxKind.TrueKeyword || held.kind === ts.SyntaxKind.FalseKeyword) {
    return true
  }
  if (held.kind === ts.SyntaxKind.NullKeyword) return true
  if (ts.isPrefixUnaryExpression(held)) {
    return held.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(held.operand)
  }
  if (ts.isArrayLiteralExpression(held)) return held.elements.every(isData)
  if (!ts.isObjectLiteralExpression(held)) return false
  return held.properties.every(
    (one) => ts.isPropertyAssignment(one) && keyOf(one) !== null && isData(one.initializer)
  )
}

export function valueIn(value: string): ts.Expression | null {
  const source = parsedAs(READING, `const held = ${value}`)
  const held = source.statements[0]
  if (held === undefined || !ts.isVariableStatement(held)) return null
  const one = held.declarationList.declarations[0]?.initializer
  if (one === undefined || one.getEnd() !== source.text.length) return null
  return isData(one) ? one : null
}

export function addPageProperty(world: World, given: AddPagePropertyAsked): Said {
  const value = given.value.trim()
  if (valueIn(value) === null) {
    return refusing(`\`${value}\` parses as no value, so nothing is put in`)
  }
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${given.at}\` exports no object`)
  const held = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
  )
  if (held !== undefined) {
    return refusing(`\`${given.key}\` is stated already, so \`${value}\` is a restatement`)
  }
  const put = `${given.key}: ${value}`
  return stating(spliced(given.at, text, withProperty(text, source, owner, put, given.after)))
}

export function runChange(world: World, given: AddPagePropertyAsked): Said {
  return addPageProperty(world, given)
}
