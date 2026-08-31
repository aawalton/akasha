import ts from "typescript"
import { lineOf, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import {
  bodyOf,
  everyFileIn,
  overEachFile,
  TEXTS,
  textIn,
  waking,
} from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"

const TS = ".ts"

const FORMAT = ".name-format.code.ts"

const BELONGS = "a name format's shape belongs to its own page, reached by importing it"

export type Spelt = {
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

export function everyShapeIn(
  change: Change,
  shadow: Shadow
): ReadonlyMap<string, readonly string[]> {
  const stated = new Map<string, string[]>()
  for (const path of everyFileIn(change.root, shadow.reading)) {
    if (!path.endsWith(FORMAT)) continue
    const text = textIn(change, path)
    if (text === null) continue
    for (const one of shapesIn(path, text)) {
      const already = stated.get(one.shape)
      if (already === undefined) stated.set(one.shape, [path])
      else if (!already.includes(path)) already.push(path)
    }
  }
  return stated
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

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const every = everyShapeIn(change, shadow)
  return overEachFile(change, (given) => {
    if (!given.path.endsWith(TS)) return []
    return reasonsIn(given.path, bodyOf(given), every)
  })
}

export const noSecondSpellingOfANameFormat = waking(TEXTS, refusalsIn)
