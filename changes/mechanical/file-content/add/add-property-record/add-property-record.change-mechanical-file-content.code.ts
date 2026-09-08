import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  refusing,
  spliced,
  stating,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"
import { withProperty } from "../add-property-value/add-property-value.change-mechanical-file-content.code.ts"

const READING = "record.ts"

export type AddPropertyRecordAsked = {
  readonly at: string
  readonly key: string
  readonly record: string
  readonly after?: string
}

export function recordIn(record: string): ts.ObjectLiteralExpression | null {
  const source = parsedAs(READING, `const held = ${record}`)
  const held = source.statements[0]
  if (held === undefined || !ts.isVariableStatement(held)) return null
  const one = held.declarationList.declarations[0]?.initializer
  if (one === undefined || !ts.isObjectLiteralExpression(one)) return null
  return one.getEnd() === source.text.length ? one : null
}

export function withRecord(
  text: string,
  source: ts.SourceFile,
  holding: ts.ArrayLiteralExpression,
  record: string
): Splice {
  const last = holding.elements[holding.elements.length - 1]
  if (last === undefined) {
    const opened = holding.getStart(source) + 1
    return { from: opened, to: opened, put: record }
  }
  const started = last.getStart(source)
  const indent = text.slice(text.lastIndexOf("\n", started) + 1, started)
  const ended = last.getEnd()
  if (indent.trim() !== "") return { from: ended, to: ended, put: `, ${record}` }
  return { from: ended, to: ended, put: `,\n${indent}${record}` }
}

export function addPropertyRecord(world: World, given: AddPropertyRecordAsked): Said {
  const record = given.record.trim()
  if (recordIn(record) === null) {
    return refusing(`\`${record}\` parses as no record, so nothing is put in`)
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
    const put = `${given.key}: [${record}]`
    return stating(spliced(given.at, text, withProperty(text, source, owner, put, given.after)))
  }
  const holding = one.initializer
  if (!ts.isArrayLiteralExpression(holding)) {
    return refusing(`\`${given.key}\` holds one value, so a record is a restatement`)
  }
  if (holding.elements.some((each) => each.getText(source) === record)) {
    return refusing(`\`${given.key}\` holds that record already`)
  }
  return stating(spliced(given.at, text, withRecord(text, source, holding, record)))
}

export function runChange(world: World, given: AddPropertyRecordAsked): Said {
  return addPropertyRecord(world, given)
}
