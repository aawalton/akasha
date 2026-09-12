import { bodyOf, onDisk } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import ts from "typescript"

const COMMANDS_AT = "commands/pages/"

const PAGE_AT = ".command.ts"

const TEST_AT = ".command.test.ts"

const ARGUMENTS = "arguments"

const SAID_AS = "saidAs"

const WORD = "word"

const FLAG_OR_WORD = "flag-or-word"

const TAKEN_FOR = "takenFor"

const TAKING_IN = "takingIn"

const FEWEST = 2

const WHY =
  "a word is taken by the place its argument sits at in `arguments`, so moving one of those" +
  " records, or adding another, changes what a call already written means"

export function testPathOf(path: string): string | null {
  if (!path.startsWith(COMMANDS_AT) || !path.endsWith(PAGE_AT)) return null
  return `${path.slice(0, -PAGE_AT.length)}${TEST_AT}`
}

export function besideAt(root: string, path: string): string | null {
  const at = testPathOf(path)
  if (at === null) return null
  const bytes = onDisk(root)(at)
  return bytes === null ? null : bodyOf({ root, path: at, bytes })
}

function argumentsIn(node: ts.Node): ts.ArrayLiteralExpression | undefined {
  if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === ARGUMENTS) {
    return ts.isArrayLiteralExpression(node.initializer) ? node.initializer : undefined
  }
  return ts.forEachChild(node, argumentsIn)
}

function takenAsAWord(one: ts.ObjectLiteralExpression): boolean {
  for (const each of one.properties) {
    if (!ts.isPropertyAssignment(each) || !ts.isIdentifier(each.name)) continue
    if (each.name.text !== SAID_AS || !ts.isStringLiteral(each.initializer)) continue
    const said = each.initializer.text
    if (said === WORD || said === FLAG_OR_WORD) return true
  }
  return false
}

function wordsIn(held: ts.ArrayLiteralExpression): number {
  let count = 0
  for (const one of held.elements) {
    if (ts.isObjectLiteralExpression(one) && takenAsAWord(one)) count += 1
  }
  return count
}

function fillsFromWords(node: ts.Node): true | undefined {
  if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
    const said = node.expression.text
    if (said === TAKEN_FOR || said === TAKING_IN) return true
  }
  return ts.forEachChild(node, fillsFromWords)
}

export function found(path: string, text: string, beside: string | null): readonly string[] {
  const at = testPathOf(path)
  if (at === null) return []
  const held = argumentsIn(parsedAs(path, text))
  if (held === undefined) return []
  const words = wordsIn(held)
  if (words < FEWEST) return []
  const takes = `\`${path}\` fills ${words} arguments from words`
  if (beside === null) return [`${takes} and \`${at}\` is not there — ${WHY}`]
  if (fillsFromWords(parsedAs(at, beside)) === true) return []
  return [
    `${takes} and \`${at}\` fills none from words, so a test calling \`${TAKEN_FOR}\`` +
      ` with those words is what pins the order — ${WHY}`,
  ]
}
