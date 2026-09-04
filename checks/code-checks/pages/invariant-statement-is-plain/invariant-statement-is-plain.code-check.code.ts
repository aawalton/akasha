import { join } from "node:path"
import { lineOf, parsedAs } from "@akasha/code-system/code-source"
import type { Answering } from "@akasha/indexes/answering"
import { scanned } from "@akasha/plain-language"
import { makeSentence } from "@akasha/plain-language/dependency-graph"
import { loadParser } from "@akasha/plain-language/onnx-parsing"
import type { ShapePredicate } from "@akasha/plain-language/shape-predicate"
import { shapesIn } from "@akasha/plain-language/shapes"
import ts from "typescript"
import type { Body } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  judgingEachAsync,
  overEachText,
  overEachTextAsync,
  TEXTS,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const KIND = "invariantKind"

const STATEMENT = "statement"

const WHY = /\b(because|since)\b/

const JOIN = /[,;:—]/

const TWO = /[a-z`)"]\.\s+[A-Z`]/

const TRAILING = /[\s,;:—]+$/

const LEADING = /^[\s,;:—.]+/

const PAGE_ENDING = ".ts"

const CODE_ENDING = ".code.ts"

export type Stated = {
  readonly line: number
  readonly text: string
}

export type Shape = "why" | "join" | "two"

export type Split = {
  readonly line: number
  readonly shape: Shape
  readonly mark: string
  readonly first: string
  readonly second: string
}

type Refused = {
  readonly slug: string
  readonly reason: string | null
  readonly run: ShapePredicate
}

function joinedIn(node: ts.Expression): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isParenthesizedExpression(node)) return joinedIn(node.expression)
  if (!ts.isBinaryExpression(node)) return null
  if (node.operatorToken.kind !== ts.SyntaxKind.PlusToken) return null
  const head = joinedIn(node.left)
  const tail = joinedIn(node.right)
  if (head === null || tail === null) return null
  return head + tail
}

function statementIn(node: ts.ObjectLiteralExpression): ts.Expression | null {
  let kinded = false
  let held: ts.Expression | null = null
  for (const one of node.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const name = one.name
    const said = ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null
    if (said === KIND) kinded = true
    if (said === STATEMENT) held = one.initializer
  }
  return kinded ? held : null
}

export function statementsIn(path: string, text: string): readonly Stated[] {
  const source = parsedAs(path, text)
  const found: Stated[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isObjectLiteralExpression(node)) {
      const held = statementIn(node)
      if (held !== null) {
        const said = joinedIn(held)
        if (said !== null) found.push({ line: lineOf(source, held), text: said })
      }
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export function splitAt(one: Stated): Split | null {
  const said = scanned(one.text)
  const why = WHY.exec(said)
  const join = JOIN.exec(said)
  const two = TWO.exec(said)
  const every: readonly (readonly [number, Shape, string])[] = [
    why === null ? null : ([why.index, "why", why[0]] as const),
    join === null ? null : ([join.index, "join", join[0]] as const),
    two === null ? null : ([two.index + 1, "two", "."] as const),
  ].filter((held) => held !== null)
  let best: readonly [number, Shape, string] | null = null
  for (const held of every) if (best === null || held[0] < best[0]) best = held
  if (best === null) return null
  const [at, shape, mark] = best
  return {
    line: one.line,
    shape,
    mark,
    first: one.text.slice(0, at).replace(TRAILING, ""),
    second: one.text.slice(at).replace(LEADING, ""),
  }
}

function sayingOf(split: Split): string {
  if (split.shape === "why") {
    return (
      `line ${split.line} states why at \`${split.mark}\` — an invariant states what is true and never why\n` +
      `  ${split.second}\n` +
      "  cut what only explains. Split out a fact held in there and keep it."
    )
  }
  const head =
    split.shape === "two"
      ? `line ${split.line} holds two sentences — an invariant states one thing`
      : `line ${split.line} joins a second fact at \`${split.mark}\` — an invariant states one thing`
  return (
    `${head}\n` +
    `  ${split.second}\n` +
    "  cut what only explains or follows from the first. Split out what does not."
  )
}

function exportedAs(slug: string): string {
  return slug.replace(/-(.)/g, (_whole, one: string) => one.toUpperCase())
}

const REFUSED = new WeakMap<Answering, Promise<readonly Refused[]>>()

async function refusedFrom(root: string, index: Answering): Promise<readonly Refused[]> {
  const found: Refused[] = []
  for (const shape of shapesIn(index)) {
    if (shape.allowed !== false) continue
    const at = join(root, `${shape.path.slice(0, -PAGE_ENDING.length)}${CODE_ENDING}`)
    const held = (await import(at)) as Record<string, unknown>
    const run = held[exportedAs(shape.slug)]
    if (typeof run !== "function") continue
    found.push({ slug: shape.slug, reason: shape.reason, run: run as ShapePredicate })
  }
  return found
}

function refusedIn(root: string, index: Answering): Promise<readonly Refused[]> {
  const held = REFUSED.get(index)
  if (held !== undefined) return held
  const made = refusedFrom(root, index)
  REFUSED.set(index, made)
  return made
}

let PARSER: ReturnType<typeof loadParser> | null = null

function parserHeld(): ReturnType<typeof loadParser> {
  PARSER ??= loadParser()
  return PARSER
}

async function shapedOf(one: Stated, refused: readonly Refused[]): Promise<string | null> {
  if (refused.length === 0) return null
  const parser = await parserHeld()
  const parsed = await parser.parse(one.text)
  const first = parsed[0]
  if (first === undefined) return null
  const sentence = makeSentence(first)
  for (const shape of refused) {
    if (shape.run(sentence).length === 0) continue
    return (
      `line ${one.line} is written in \`${shape.slug}\`, a shape akasha refuses\n` +
      `  ${shape.reason ?? ""}\n` +
      `  ${one.text}\n` +
      "  say the same fact in the plainest words that keep it."
    )
  }
  return null
}

function marked(path: string, text: string): readonly string[] {
  const said: string[] = []
  for (const one of statementsIn(path, text)) {
    const split = splitAt(one)
    if (split !== null) said.push(sayingOf(split))
  }
  return said
}

async function found(
  root: string,
  path: string,
  text: string,
  index: Answering
): Promise<readonly string[]> {
  const every = statementsIn(path, text)
  if (every.length === 0) return []
  const said: string[] = []
  let refused: readonly Refused[] | null = null
  for (const one of every) {
    const split = splitAt(one)
    if (split !== null) {
      said.push(sayingOf(split))
      continue
    }
    refused ??= await refusedIn(root, index)
    const shaped = await shapedOf(one, refused)
    if (shaped !== null) said.push(shaped)
  }
  return said
}

export const reasonsIn = overEachText(marked)

export function reasonsShaped(
  root: string,
  index: Answering
): (given: Body) => Promise<readonly string[]> {
  return overEachTextAsync((path, text) => found(root, path, text, index))
}

export const invariantStatementIsPlain = judgingEachAsync(TEXTS, (given, shadow) =>
  found(given.root, given.path, given.text, shadow.index)
)
