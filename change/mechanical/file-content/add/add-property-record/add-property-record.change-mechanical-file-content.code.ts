import {
  refusing,
  type Said,
  spliced,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  withProperty,
  withRecord,
} from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  afterFaultIn,
  keyFaultIn,
  keyOf,
  literalIn,
  spelledBare,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

const READING = "record.ts"

const NO_RECORD =
  "parses as no record, so nothing is put in — a record is one object literal, as" +
  ' `{ argument: "argument/onto", required: true, saidAs: "word" }` is,' +
  " and `key: value` lines are not"

const PLACED = "is written already, and `after` places a key rather than a record"

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

export function quotedKeyIn(one: ts.ObjectLiteralExpression): string | null {
  for (const each of one.properties) {
    if (!ts.isPropertyAssignment(each)) continue
    const name = each.name
    if (ts.isStringLiteral(name) && spelledBare(name.text)) {
      return name.text
    }
    const under = ts.isObjectLiteralExpression(each.initializer)
      ? [each.initializer]
      : ts.isArrayLiteralExpression(each.initializer)
        ? each.initializer.elements.filter((held) => ts.isObjectLiteralExpression(held))
        : []
    for (const held of under) {
      const found = quotedKeyIn(held as ts.ObjectLiteralExpression)
      if (found !== null) return found
    }
  }
  return null
}

export function addPropertyRecord(world: World, given: AddPropertyRecordAsked): Said {
  const fault = keyFaultIn(given.key)
  if (fault !== null) return refusing(fault)
  const record = given.record.trim()
  const read = recordIn(record)
  if (read === null) {
    return refusing(`\`${record}\` ${NO_RECORD}`)
  }
  const quoted = quotedKeyIn(read)
  if (quoted !== null) {
    return refusing(`\`${quoted}\` is quoted, and a page spells a key needing no quotes bare`)
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
    const placed = afterFaultIn(owner, given.after)
    if (placed !== null) return refusing(placed)
    const put = `${given.key}: [${record}]`
    return stating(spliced(given.at, text, withProperty(text, source, owner, put, given.after)))
  }
  if (given.after !== undefined) return refusing(`\`${given.key}\` ${PLACED}`)
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
