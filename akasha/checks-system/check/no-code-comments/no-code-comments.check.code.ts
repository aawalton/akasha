import ts from "typescript"
import { lineAt, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import { judgingEachFile, overEachText } from "../../checking/checking.module.code.ts"

type Found = {
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

function found(path: string, text: string): readonly string[] {
  const said: string[] = []
  for (const one of commentsIn(path, text)) {
    if (isForm(one)) continue
    const what = looksParsed(one) ? "a directive nothing declares" : "prose"
    said.push(`line ${one.line} carries ${what}, which is none of the code comment forms`)
  }
  return said
}

export const reasonsIn = overEachText(found)

export const noCodeComments = judgingEachFile(reasonsIn)
