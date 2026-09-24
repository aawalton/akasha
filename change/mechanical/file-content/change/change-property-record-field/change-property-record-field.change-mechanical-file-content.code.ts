import {
  refusing,
  type Said,
  spliced,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { withField } from "akasha/change/modules/literal-splicing/literal-splicing.module.code.ts"
import {
  assignedIn,
  recordMatchedIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { spelledAs } from "akasha/change/modules/value-spelling/value-spelling.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

export type Named = {
  readonly key: string
  readonly where: string
  readonly is: string
  readonly field: string
}

const TEXT = "text"

const BOOLEAN = "boolean"

const NUMBER = "number"

const NULL = "null"

const SAID_AS: Readonly<Record<string, string>> = {
  [TEXT]: "text",
  [BOOLEAN]: "a boolean",
  [NUMBER]: "a number",
}

function kindOf(held: ts.Expression): string | null {
  if (ts.isStringLiteral(held) || ts.isNoSubstitutionTemplateLiteral(held)) return TEXT
  if (held.kind === ts.SyntaxKind.TrueKeyword || held.kind === ts.SyntaxKind.FalseKeyword) {
    return BOOLEAN
  }
  if (held.kind === ts.SyntaxKind.NullKeyword) return NULL
  if (ts.isNumericLiteral(held)) return NUMBER
  const negative =
    ts.isPrefixUnaryExpression(held) &&
    held.operator === ts.SyntaxKind.MinusToken &&
    ts.isNumericLiteral(held.operand)
  return negative ? NUMBER : null
}

function statedAs(held: ts.Expression, source: ts.SourceFile): string {
  if (ts.isStringLiteral(held) || ts.isNoSubstitutionTemplateLiteral(held)) {
    return JSON.stringify(held.text)
  }
  return held.getText(source)
}

export function fieldRestated(
  path: string,
  text: string,
  named: Named,
  to: string,
  declared: boolean,
  holds?: string
): Said {
  const source = parsedAs(path, text)
  const matched = recordMatchedIn(path, source, named.key, named.where, named.is)
  if ("refused" in matched) return refusing(matched.refused)
  const put = spelledAs(to, holds)
  if (put === null) {
    return refusing(`\`${to}\` is no ${holds}, so \`${named.field}\` is not restated`)
  }
  const one = assignedIn(matched.record, named.field)
  if (one === null) {
    if (!declared) return refusing(`that record states nothing under \`${named.field}\``)
    const field = `${named.field}: ${put}`
    return stating(spliced(path, text, withField(text, source, matched.record, field)))
  }
  const held = one.initializer
  const kind = kindOf(held)
  if (kind === null) {
    return refusing(
      `\`${named.field}\` in that record holds no text, boolean, number or null, so nothing is restated`
    )
  }
  const spelled = holds === BOOLEAN || holds === NUMBER ? holds : TEXT
  if (kind !== NULL && kind !== spelled) {
    return refusing(
      `\`${named.field}\` holds ${SAID_AS[kind]}, and \`${to}\` is spelled as ${SAID_AS[spelled]}, so nothing is restated`
    )
  }
  if (statedAs(held, source) === put) {
    return refusing(`\`${to}\` is what \`${named.field}\` states already`)
  }
  return stating(spliced(path, text, { from: held.getStart(source), to: held.getEnd(), put }))
}

export type Given = Named & {
  readonly at: string
  readonly to: string
  readonly declared: boolean
  readonly holds?: string
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so nothing is restated`)
  return fieldRestated(given.at, text, given, given.to, given.declared, given.holds)
}
