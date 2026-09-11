import { wordsOf } from "akasha/agents/hooks/shell-calls/shell-calls.module.code.ts"
import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code-system/code-source/code-source.module.code.ts"
import ts from "typescript"

export type Word = string | null

type Reading = {
  readonly unset: boolean
  readonly neutral: boolean
  readonly command: string | null
}

const ENV = /(?:^|\/)env$/

const BASH = /(?:^|\/)bash$/

const SCRIPT = /\.(?:sh|bash)$/

const ASSIGNED = /^[A-Za-z_][A-Za-z0-9_]*=/

const NEUTRAL = "BASH_ENV"

const UNSETTING: ReadonlySet<string> = new Set(["-u", "--unset"])

const VALUED: ReadonlySet<string> = new Set([
  "-u",
  "--unset",
  "-C",
  "--chdir",
  "-S",
  "--split-string",
])

const SANCTIONED = "env -u VAR BASH_ENV= bash -c '...'"

const UNDONE =
  "BASH_ENV still names the startup file every non-interactive bash reads before its first " +
  "command, and that file hands the shell back the names this call took away"

export function saidIn(node: ts.Node): readonly Word[] {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    return wordsOf(node.text)
  if (ts.isArrayLiteralExpression(node)) return node.elements.flatMap((one) => saidIn(one))
  if (ts.isTemplateExpression(node)) {
    return [
      ...wordsOf(node.head.text),
      ...node.templateSpans.flatMap((one) => [null, ...wordsOf(one.literal.text)]),
    ]
  }
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    return [...saidIn(node.left), ...saidIn(node.right)]
  }
  return [null]
}

function readingOf(said: readonly Word[], at: number): Reading {
  let unset = false
  let neutral = false
  let awaiting: string | null = null
  for (const word of said.slice(at + 1)) {
    if (awaiting !== null) {
      if (UNSETTING.has(awaiting) && word === NEUTRAL) neutral = true
      awaiting = null
      continue
    }
    if (word === null) return { unset, neutral, command: null }
    if (VALUED.has(word)) {
      if (UNSETTING.has(word)) unset = true
      awaiting = word
      continue
    }
    if (word.startsWith("--unset=") || word.startsWith("-u")) {
      unset = true
      if (word.slice(word.indexOf("=") + 1) === NEUTRAL || word.slice(2) === NEUTRAL) neutral = true
      continue
    }
    if (word.startsWith("-")) continue
    if (ASSIGNED.test(word)) {
      if (word.startsWith(`${NEUTRAL}=`)) neutral = true
      continue
    }
    return { unset, neutral, command: word }
  }
  return { unset, neutral, command: null }
}

function reasonAt(said: readonly Word[], at: number): string | null {
  const reading = readingOf(said, at)
  if (!reading.unset || reading.neutral) return null
  const command = reading.command
  if (command === null) return null
  if (BASH.test(command)) {
    return `this call takes names out of the environment and hands \`${command}\` what is left — ${UNDONE}, so write \`${SANCTIONED}\``
  }
  if (SCRIPT.test(command)) {
    return `this call takes names out of the environment and runs \`${command}\`, which a bash reads — ${UNDONE}, so write \`BASH_ENV=\` into the same call`
  }
  return null
}

function reasonFor(said: readonly Word[]): string | null {
  for (let at = 0; at < said.length; at++) {
    const word = said[at]
    if (word === undefined || word === null || !ENV.test(word)) continue
    const reason = reasonAt(said, at)
    if (reason !== null) return reason
  }
  return null
}

function saidBy(node: ts.Node): readonly Word[] | null {
  if (ts.isCallExpression(node)) return node.arguments.flatMap((one) => saidIn(one))
  if (
    ts.isArrayLiteralExpression(node) ||
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateExpression(node) ||
    (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)
  ) {
    return saidIn(node)
  }
  return null
}

export function noScrubBashEnvUndoes(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    const said = saidBy(node)
    const reason = said === null ? null : reasonFor(said)
    if (reason !== null) {
      found.push({ line: lineOf(standing.source, node), reason })
      return
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
