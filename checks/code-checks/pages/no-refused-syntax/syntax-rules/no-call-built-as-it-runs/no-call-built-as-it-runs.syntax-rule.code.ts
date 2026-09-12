import { boundIn } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-akasha-command-from-code/no-akasha-command-from-code.syntax-rule.code.ts"
import {
  directivesIn,
  noCommandSpellingItsOwnCall,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-command-spelling-its-own-call/no-command-spelling-its-own-call.syntax-rule.code.ts"
import { noHyphenatedCall } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-hyphenated-call/no-hyphenated-call.syntax-rule.code.ts"
import type {
  Given,
  Judging,
  Marking,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf, parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import type { Naming } from "akasha/commands/modules/walking/command-walking.module.code.ts"
import ts from "typescript"

const SOMETHING = "something"

const UNDER = "-"

const SPELLED_OUT: readonly Judging[] = [noHyphenatedCall, noCommandSpellingItsOwnCall]

const TEMPLATE = "`"

export const mark: Marking = (text) => text.includes(TEMPLATE)

function wordFor(node: ts.Expression, bound: ReadonlyMap<string, string>): string {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isIdentifier(node)) return bound.get(node.text) ?? SOMETHING
  return SOMETHING
}

function builtBy(node: ts.TemplateExpression, bound: ReadonlyMap<string, string>): string {
  let said = node.head.text
  for (const span of node.templateSpans) {
    said = said + wordFor(span.expression, bound) + span.literal.text
  }
  return said
}

export function alsoNaming(namedAt: Naming): Naming {
  const tail = `${UNDER}${SOMETHING}`
  return (slug) => {
    const said = namedAt(slug)
    if (said !== null) return said
    if (!slug.endsWith(tail)) return null
    const before = slug.slice(0, slug.length - tail.length)
    return before !== "" && namedAt(before) !== null ? SOMETHING : null
  }
}

function spelledOut(standing: Given, said: string): Given {
  const text = `const said = ${JSON.stringify(said)}\n`
  return {
    path: standing.path,
    source: parsedAs(standing.path, text),
    readers: standing.readers,
    namedAt: alsoNaming(standing.namedAt),
    typedAt: standing.typedAt,
  }
}

export function noCallBuiltAsItRuns(standing: Given): readonly Refusal[] {
  const bound = boundIn(standing.source)
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (directivesIn(node)) return
    if (ts.isTemplateExpression(node)) {
      const spelled = spelledOut(standing, builtBy(node, bound))
      for (const judge of SPELLED_OUT) {
        for (const one of judge(spelled)) {
          found.push({
            line: lineOf(standing.source, node),
            reason: `this template builds its call as the code runs, and ${one.reason}`,
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
