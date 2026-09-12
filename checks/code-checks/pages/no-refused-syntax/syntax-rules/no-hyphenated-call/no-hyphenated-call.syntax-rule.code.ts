import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf, literalPartIn } from "akasha/code/source/code-source.module.code.ts"
import { type Naming, pathOf } from "akasha/commands/modules/walking/command-walking.module.code.ts"
import ts from "typescript"

const CODE_NAMED = /\.code\.tsx?$/

const HYPHENATED = /(?<![\w-])akasha[ \t]+([a-z0-9]+(?:-[a-z0-9]+)+)(?![\w-])/g

const SPACE = " "

const INSTEAD = "write the levels apart, as the command line takes them"

function apartIn(slug: string, namedAt: Naming): string | null {
  const said = pathOf(slug, namedAt)
  return said.includes(SPACE) ? said : null
}

export function noHyphenatedCall(standing: Given): readonly Refusal[] {
  if (!CODE_NAMED.test(standing.path)) return []
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    const text = literalPartIn(node)
    for (const one of text === null ? [] : text.matchAll(HYPHENATED)) {
      const slug = one[1] ?? ""
      const apart = apartIn(slug, standing.namedAt)
      if (apart !== null) {
        found.push({
          line: lineOf(standing.source, node),
          reason: `this literal spells \`akasha ${slug}\` in one word, and the call is \`akasha ${apart}\` — ${INSTEAD}`,
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
