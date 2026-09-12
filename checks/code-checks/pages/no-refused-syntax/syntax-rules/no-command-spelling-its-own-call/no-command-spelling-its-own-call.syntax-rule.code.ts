import type {
  Given,
  Marking,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf, literalPartIn } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

const COMMANDS_AT = "commands/pages/"

export const mark: Marking = (_text, path) => path.startsWith(COMMANDS_AT)

const JUDGED = /(?:\.code\.tsx?|\.command\.ts)$/

const DIRECTIVES = "directives"

const PARTED = /[\s-]/

const BETWEEN = "[\\s-]+"

const INSTEAD = "read the call off the call the command is handed instead"

export function calledIn(path: string): string | null {
  if (!path.startsWith(COMMANDS_AT)) return null
  const parts = path.slice(COMMANDS_AT.length).split("/")
  const named = parts[parts.length - 1]
  if (named === undefined || !JUDGED.test(named)) return null
  const folders = parts.slice(0, -1)
  if (folders.length === 0) return null
  return folders.join(" ")
}

function spellingOf(called: string): RegExp {
  const words = called.split(PARTED).join(BETWEEN)
  return new RegExp(`(?<![\\w-])akasha${BETWEEN}${words}(?![\\w-])`)
}

export function directivesIn(node: ts.Node): boolean {
  if (!ts.isPropertyAssignment(node)) return false
  return ts.isIdentifier(node.name) && node.name.text === DIRECTIVES
}

export function noCommandSpellingItsOwnCall(standing: Given): readonly Refusal[] {
  const called = calledIn(standing.path)
  if (called === null) return []
  const spelling = spellingOf(called)
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (directivesIn(node)) return
    const text = literalPartIn(node)
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
