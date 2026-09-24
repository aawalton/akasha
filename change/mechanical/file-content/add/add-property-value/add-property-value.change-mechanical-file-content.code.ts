import {
  refusing,
  type Said,
  spliced,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  withField,
  withProperty,
  withValue,
} from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  afterFaultIn,
  assignedIn,
  keyFaultIn,
  keyOf,
  literalIn,
  recordMatchedIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { spelledAs } from "akasha/change/modules/value-spelling/value-spelling.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

const PLACED = "is written already, and `after` places a key rather than a value"

export type AddPropertyValueAsked = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly after?: string
  readonly single?: boolean
  readonly holds?: string
  readonly where?: string
  readonly is?: string
  readonly field?: string
}

type InRecord = {
  readonly at: string
  readonly key: string
  readonly value: string
  readonly where: string
  readonly is: string
  readonly field: string
}

function putInRecord(text: string, source: ts.SourceFile, given: InRecord, said: string): Said {
  const matched = recordMatchedIn(given.at, source, given.key, given.where, given.is)
  if ("refused" in matched) return refusing(matched.refused)
  const one = assignedIn(matched.record, given.field)
  if (one === null) {
    const put = `${given.field}: [${said}]`
    return stating(spliced(given.at, text, withField(text, source, matched.record, put)))
  }
  const holding = one.initializer
  if (!ts.isArrayLiteralExpression(holding)) {
    return refusing(`\`${given.field}\` in that record holds no list`)
  }
  const already = holding.elements.some((each) =>
    ts.isStringLiteral(each) ? each.text === given.value : each.getText(source) === said
  )
  if (already) return refusing(`\`${given.field}\` in that record holds \`${given.value}\` already`)
  return stating(spliced(given.at, text, withValue(source, holding, said)))
}

export function addPropertyValue(world: World, given: AddPropertyValueAsked): Said {
  const fault =
    keyFaultIn(given.key) ?? (given.field === undefined ? null : keyFaultIn(given.field))
  if (fault !== null) return refusing(fault)
  const said = spelledAs(given.value, given.holds)
  if (said === null) {
    return refusing(`\`${given.value}\` is no ${given.holds}, so nothing is put in`)
  }
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const { where, is, field } = given
  if (where !== undefined && is !== undefined && field !== undefined) {
    return putInRecord(text, source, { ...given, where, is, field }, said)
  }
  if (where !== undefined || is !== undefined || field !== undefined) {
    return refusing("`where`, `is` and `field` are stated together or not at all")
  }
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${given.at}\` exports no object`)
  const one = owner.properties.find(
    (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
  )
  if (one === undefined || !ts.isPropertyAssignment(one)) {
    const placed = afterFaultIn(owner, given.after)
    if (placed !== null) return refusing(placed)
    const put = given.single === true ? `${given.key}: ${said}` : `${given.key}: [${said}]`
    return stating(spliced(given.at, text, withProperty(text, source, owner, put, given.after)))
  }
  if (given.after !== undefined) return refusing(`\`${given.key}\` ${PLACED}`)
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
