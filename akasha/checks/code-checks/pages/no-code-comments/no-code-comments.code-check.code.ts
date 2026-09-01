import { lineAt, parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"
import {
  BODIES,
  judgingEach,
  overEachBody,
  styleNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"

export type Found = {
  readonly line: number
  readonly raw: string
}

type Form = {
  readonly handle: string
  readonly pattern: RegExp
}

const FORMS: readonly Form[] = [
  { handle: "expect-error", pattern: /^@ts-expect-error\b/ },
  { handle: "biome suppression", pattern: /^biome-ignore\b/ },
  { handle: "triple-slash reference", pattern: /^\/\s*<reference\b/ },
  { handle: "deprecation", pattern: /^@deprecated\b/ },
]

const PARSED: readonly string[] = [
  "@ts-",
  "biome-",
  "eslint",
  "oxlint",
  "prettier-ignore",
  "v8 ignore",
  "c8 ignore",
  "istanbul ignore",
  "@license",
  "@preserve",
  "<reference",
  "sourceMappingURL",
]

const OPENED = "/*"

const CLOSED = "*/"

const ESCAPE = "\\"

const BREAK = "\n"

const QUOTED = new Set(['"', "'"])

export function commentsIn(path: string, text: string): readonly Found[] {
  const source = parsedAs(path, text)
  const seen = new Set<number>()
  const found: Found[] = []
  const take = (every: readonly ts.CommentRange[] | undefined): undefined => {
    for (const range of every ?? []) {
      if (seen.has(range.pos)) continue
      seen.add(range.pos)
      const line = lineAt(source, range.pos)
      found.push({ line, raw: text.slice(range.pos, range.end) })
    }
  }
  const walk = (node: ts.Node): undefined => {
    const every = node.getChildren(source)
    if (every.length > 0) {
      for (const one of every) walk(one)
      return
    }
    take(ts.getLeadingCommentRanges(text, node.getFullStart()))
    take(ts.getTrailingCommentRanges(text, node.getEnd()))
  }
  walk(source)
  return found.sort((one, two) => one.line - two.line)
}

function linesOf(raw: string): readonly string[] {
  if (raw.startsWith("//")) return [raw.slice(2).trim()]
  return raw
    .replace(/^\/\*+/, "")
    .replace(/\*+\/$/, "")
    .split("\n")
    .map((one) => one.replace(/^\s*\*+\s?/, "").trim())
    .filter((one) => one !== "")
}

function directiveIn(one: Found): string | null {
  const said = linesOf(one.raw)
  const first = said[0]
  return said.length === 1 && first !== undefined ? first : null
}

function isForm(one: Found): boolean {
  const said = directiveIn(one)
  if (said === null) return false
  return FORMS.some((form) => form.pattern.test(said))
}

function looksParsed(one: Found): boolean {
  const said = directiveIn(one)
  if (said === null) return false
  const bare = said.replace(/^[/#]+\s*/, "")
  return PARSED.some((marker) => said.startsWith(marker) || bare.startsWith(marker))
}

export function styleCommentsIn(text: string): readonly Found[] {
  const found: Found[] = []
  const breaksIn = (raw: string): number => raw.split(BREAK).length - 1
  let line = 1
  let at = 0
  let quoted: string | null = null
  while (at < text.length) {
    const one = text[at]
    if (one === undefined) break
    if (quoted === null && text.startsWith(OPENED, at)) {
      const closed = text.indexOf(CLOSED, at + OPENED.length)
      const stop = closed === -1 ? text.length : closed + CLOSED.length
      const raw = text.slice(at, stop)
      found.push({ line, raw })
      line += breaksIn(raw)
      at = stop
      continue
    }
    if (quoted !== null && one === ESCAPE) {
      at += 2
      continue
    }
    if (quoted === null && QUOTED.has(one)) quoted = one
    else if (quoted === one) quoted = null
    if (one === BREAK) line += 1
    at += 1
  }
  return found
}

function refusalsFor(every: readonly Found[]): readonly string[] {
  const said: string[] = []
  for (const one of every) {
    if (isForm(one)) continue
    const what = looksParsed(one) ? "a directive nothing declares" : "prose"
    said.push(`line ${one.line} carries ${what}, which is none of the code comment forms`)
  }
  return said
}

export function found(path: string, text: string): readonly string[] {
  if (styleNamed(path)) return refusalsFor(styleCommentsIn(text))
  return refusalsFor(commentsIn(path, text))
}

export const reasonsIn = overEachBody(found)

export const noCodeComments = judgingEach(BODIES, (given) => found(given.path, given.text))
