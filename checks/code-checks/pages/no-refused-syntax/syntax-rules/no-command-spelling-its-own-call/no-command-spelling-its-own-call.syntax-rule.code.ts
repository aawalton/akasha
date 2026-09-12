import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf, literalIn } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

const COMMANDS_AT = "commands/pages/"

const CODE_NAMED = /\.code\.tsx?$/

const PARTED = /[\s-]/

const BETWEEN = "[\\s-]+"

const INSTEAD = "read the call off the call the command is handed instead"

export function calledIn(path: string): string | null {
  if (!path.startsWith(COMMANDS_AT)) return null
  const parts = path.slice(COMMANDS_AT.length).split("/")
  const named = parts[parts.length - 1]
  if (named === undefined || !CODE_NAMED.test(named)) return null
  const folders = parts.slice(0, -1)
  if (folders.length === 0) return null
  return folders.join(" ")
}

export function spellingOf(called: string): RegExp {
  const words = called.split(PARTED).join(BETWEEN)
  return new RegExp(`(?<![\\w-])akasha${BETWEEN}${words}(?![\\w-])`)
}

function textIn(node: ts.Node): string | null {
  const plain = literalIn(node)
  if (plain !== null) return plain
  if (ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return node.text
  return null
}

export function noCommandSpellingItsOwnCall(standing: Given): readonly Refusal[] {
  const called = calledIn(standing.path)
  if (called === null) return []
  const spelling = spellingOf(called)
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    const text = textIn(node)
    if (text !== null && spelling.test(text)) {
      found.push({
        line: lineOf(standing.source, node),
        reason: `this literal spells \`akasha ${called}\`, which is this command's own call — ${INSTEAD}`,
      })
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
