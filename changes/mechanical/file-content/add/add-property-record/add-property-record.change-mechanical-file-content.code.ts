import { parsedAs } from "@akasha/code/code-source"
import { exportedAs } from "@akasha/pages/page-export-name"
import ts from "typescript"
import { refusing, spliced, stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { withProperty } from "../../../../modules/literal-splicing/literal-splicing.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"

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

const BARE = /^[A-Za-z_$][A-Za-z0-9_$]*$/

function keyFaultIn(key: string): string | null {
  if (BARE.test(key)) return null
  const spelled = exportedAs(key)
  if (!BARE.test(spelled)) return `\`${key}\` is no key a page spells`
  return `\`${key}\` is no key a page spells, and \`${spelled}\` is the key that spelling names`
}

export function quotedKeyIn(one: ts.ObjectLiteralExpression): string | null {
  for (const each of one.properties) {
    if (!ts.isPropertyAssignment(each)) continue
    const name = each.name
    if (ts.isStringLiteral(name) && BARE.test(name.text)) {
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
  const fault = keyFaultIn(given.key)
  if (fault !== null) return refusing(fault)
  const record = given.record.trim()
  const read = recordIn(record)
  if (read === null) {
    return refusing(`\`${record}\` parses as no record, so nothing is put in`)
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
