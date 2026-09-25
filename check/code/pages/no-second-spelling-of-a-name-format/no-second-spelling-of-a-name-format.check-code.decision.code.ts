import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  overEveryIn,
  textIn,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  lineOf,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import ts from "typescript"

const NAME_FORMAT = "name-format"

const CODE = "code"

const HELD = "ts"

const FORMAT = `.${NAME_FORMAT}.${CODE}.${HELD}`

const BELONGS = "a name format's shape belongs to its own page, reached by importing it"

type Spelt = {
  readonly shape: string
  readonly line: number
}

function shapeOf(written: string): string | null {
  const closing = written.lastIndexOf("/")
  return closing < 1 ? null : written.slice(1, closing)
}

export function shapesIn(at: string, text: string): readonly Spelt[] {
  const source = parsedAs(at, text)
  const found: Spelt[] = []
  const held = (node: ts.Node): undefined => {
    if (ts.isRegularExpressionLiteral(node)) {
      const shape = shapeOf(node.text)
      if (shape !== null) found.push({ shape, line: lineOf(source, node) })
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

const MATCHING = "matching"

function handedToMatching(node: ts.Node): ts.RegularExpressionLiteral | null {
  if (!ts.isCallExpression(node)) return null
  if (!ts.isIdentifier(node.expression) || node.expression.text !== MATCHING) return null
  const first = node.arguments[0]
  return first !== undefined && ts.isRegularExpressionLiteral(first) ? first : null
}

export function statedIn(at: string, text: string): readonly Spelt[] {
  const source = parsedAs(at, text)
  const found: Spelt[] = []
  const held = (node: ts.Node): undefined => {
    const handed = handedToMatching(node)
    const shape = handed === null ? null : shapeOf(handed.text)
    if (handed !== null && shape !== null) found.push({ shape, line: lineOf(source, handed) })
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

function formatsOver(paths: readonly string[], paged: Paged): readonly string[] {
  const found = new Set<string>()
  for (const one of paged.index.everyOfType(NAME_FORMAT)) {
    const at = besideAt(one.path, CODE, HELD)
    if (at !== null) found.add(at)
  }
  for (const path of paths) {
    if (path.endsWith(FORMAT)) found.add(path)
  }
  return [...found].sort()
}

export function everyShapeOver(
  paths: readonly string[],
  read: (path: string) => string | null,
  paged: Paged
): ReadonlyMap<string, readonly string[]> {
  const stated = new Map<string, string[]>()
  for (const path of formatsOver(paths, paged)) {
    const text = read(path)
    if (text === null) continue
    for (const one of statedIn(path, text)) {
      const already = stated.get(one.shape)
      if (already === undefined) stated.set(one.shape, [path])
      else if (!already.includes(path)) already.push(path)
    }
  }
  return stated
}

export function everyShapeIn(
  change: Change,
  shadow: Shadow
): ReadonlyMap<string, readonly string[]> {
  return everyShapeOver(change.changed, (path) => textIn(change, path), shadow)
}

export function reasonsIn(
  path: string,
  text: string,
  every: ReadonlyMap<string, readonly string[]>
): readonly string[] {
  const said: string[] = []
  for (const one of shapesIn(path, text)) {
    const stated = every.get(one.shape) ?? []
    if (stated.includes(path)) continue
    const first = stated[0]
    if (first === undefined) continue
    said.push(`line ${one.line} spells \`${one.shape}\`, the shape ${first} states — ${BELONGS}`)
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const every = everyShapeIn(change, shadow)
  return overEveryIn(change, textNamed, (path, text) => reasonsIn(path, text, every))
}
