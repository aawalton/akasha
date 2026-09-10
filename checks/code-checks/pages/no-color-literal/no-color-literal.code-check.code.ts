import { dirname } from "node:path"
import { besideAt } from "@akasha/pages/page-file-name"
import { textAt } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import { assertNever } from "@akasha/utils/narrow/assert-never"
import {
  BODIES,
  type Body,
  judgingEach,
  overEachBody,
  PAGES,
  styleNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"

export type Grant = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly values: readonly [string, ...(readonly string[])]
  readonly reason: string
}

export type Passing = {
  readonly palette: string
  readonly home: string
  readonly granted: ReadonlyMap<string, ReadonlySet<string>>
}

const DOMAIN = "domain"

const PALETTE = "design"

const CODE_CHECK = "code-check"

const OWN = "no-color-literal"

const CODE = "code"

export const GRANTS: readonly Grant[] = [
  {
    pageTypeSlug: "module",
    slug: "location-map",
    values: ["#e6e4df"],
    reason:
      "Alan grant 2026-07-02: the MapLibre background matching the ground the external OSM tiles draw, which is no color of ours to re-shade.",
  },
]

export function normalized(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

const GENERATED = "generated"

function codeAt(shadow: Shadow, pageTypeSlug: string, slug: string): string {
  const named = shadow.index.listedAt(pageTypeSlug, slug)[0]
  if (named === undefined) {
    throw new Error(`the index files no \`${pageTypeSlug}/${slug}\`, so its code is unreachable`)
  }
  const value = shadow.index.pageByPath(named.path)
  const held = value === null ? null : textAt(value, CODE)
  const beside = held === null ? null : besideAt(named.path, CODE, held)
  if (beside === null) throw new Error(`${named.path} states no code file beside it`)
  return beside
}

export function passingIn(shadow: Shadow): Passing {
  const design = shadow.index.listedAt(DOMAIN, PALETTE)[0]
  if (design === undefined) {
    throw new Error(`the index files no \`${DOMAIN}/${PALETTE}\`, so the palette's home is unknown`)
  }
  return {
    palette: `${dirname(design.path)}/`,
    home: `${dirname(codeAt(shadow, CODE_CHECK, OWN))}/`,
    granted: new Map(
      GRANTS.map((one) => [
        codeAt(shadow, one.pageTypeSlug, one.slug),
        new Set(one.values.map(normalized)),
      ])
    ),
  }
}

export function judgedAt(passing: Passing, path: string): boolean {
  if (path.startsWith(passing.palette)) return false
  if (path.startsWith(passing.home)) return false
  const base = path.slice(path.lastIndexOf("/") + 1)
  if (base.includes(".test.") || base.includes(".generated.")) return false
  return !path.split("/").includes(GENERATED)
}

const BEARING: readonly string[] = [
  "color",
  "background",
  "background-color",
  "background-image",
  "border",
  "border-top",
  "border-right",
  "border-bottom",
  "border-left",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "outline",
  "outline-color",
  "box-shadow",
  "text-shadow",
  "text-decoration-color",
  "column-rule",
  "column-rule-color",
  "caret-color",
  "accent-color",
  "fill",
  "stroke",
]

const SPELLINGS: readonly string[] = [
  ...BEARING,
  ...BEARING.map((one) => one.replace(/-([a-z])/g, (_m, letter: string) => letter.toUpperCase())),
]

const BEARING_DECLARATION_RE = new RegExp(`(?:^|[;{,\\s"'\`])(?:${SPELLINGS.join("|")})\\s*:`, "i")

const BEARING_NAMES: ReadonlySet<string> = new Set(SPELLINGS.map((one) => one.toLowerCase()))

function isBearing(name: string): boolean {
  return BEARING_NAMES.has(name.toLowerCase())
}

function propertyBefore(source: string, quoteAt: number): string | undefined {
  const isSpace = (spot: number): boolean => /\s/.test(source.charAt(spot))
  let at = quoteAt - 1
  while (at >= 0 && isSpace(at)) at -= 1
  if (source.charAt(at) !== ":") return undefined
  at -= 1
  while (at >= 0 && isSpace(at)) at -= 1
  if (source.charAt(at) === '"' || source.charAt(at) === "'") at -= 1
  const end = at + 1
  while (at >= 0 && /[\w-]/.test(source.charAt(at))) at -= 1
  return end > at + 1 ? source.slice(at + 1, end) : undefined
}

export type Written = {
  readonly line: number
  readonly value: string
}

const HEX_RE = /#[0-9a-fA-F]+/g

const COLOR_FN_RE = /\b(?:oklch|rgba?|hsla?)\(/g

const HEX_LENGTHS = new Set([3, 4, 6, 8])

type Token = {
  readonly value: string
  readonly offset: number
  readonly achromatic: boolean
  readonly translucent: boolean
  readonly tokenDerived: boolean
}

function hexRead(value: string): Pick<Token, "achromatic" | "translucent"> {
  const digits = value.slice(1)
  const size = digits.length === 3 || digits.length === 4 ? 1 : 2
  const channel = (at: number): number =>
    Number.parseInt(size === 1 ? digits.charAt(at).repeat(2) : digits.slice(at * 2, at * 2 + 2), 16)
  const [r, g, b] = [channel(0), channel(1), channel(2)]
  const hasAlpha = digits.length === 4 || digits.length === 8
  const alpha = hasAlpha ? channel(3) : 255
  return { achromatic: r === g && g === b, translucent: alpha < 255 }
}

function partsOf(body: string): readonly string[] {
  return body
    .replace(/[_,/]/g, " ")
    .split(/\s+/)
    .filter((one) => one.length > 0)
}

function fnRead(name: string, body: string): Pick<Token, "achromatic" | "translucent"> {
  const parts = partsOf(body)
  const num = (one: string | undefined): number =>
    one === undefined ? Number.NaN : Number.parseFloat(one)
  const alphaOf = (one: string | undefined): number => {
    if (one === undefined) return 1
    const said = num(one)
    return one.includes("%") ? said / 100 : said
  }
  if (name.startsWith("rgb")) {
    const [r, g, b] = [num(parts[0]), num(parts[1]), num(parts[2])]
    return { achromatic: r === g && g === b, translucent: alphaOf(parts[3]) < 1 }
  }
  return { achromatic: num(parts[1]) === 0, translucent: alphaOf(parts[3]) < 1 }
}

function tokensIn(text: string): readonly Token[] {
  const seen: Token[] = []
  for (const match of text.matchAll(HEX_RE)) {
    const value = match[0]
    if (!HEX_LENGTHS.has(value.length - 1)) continue
    const before = match.index === 0 ? "" : text.charAt(match.index - 1)
    const after = text.charAt(match.index + value.length)
    if (/[\w#-]/.test(before)) continue
    if (/[\w#]/.test(after)) continue
    seen.push({ value, offset: match.index, ...hexRead(value), tokenDerived: false })
  }
  for (const match of text.matchAll(COLOR_FN_RE)) {
    const name = match[0].slice(0, -1)
    const openAt = match.index + match[0].length - 1
    let depth = 0
    let closeAt = -1
    for (let at = openAt; at < text.length; at += 1) {
      if (text[at] === "(") depth += 1
      else if (text[at] === ")") {
        depth -= 1
        if (depth === 0) {
          closeAt = at
          break
        }
      }
    }
    if (closeAt === -1) continue
    const body = text.slice(openAt + 1, closeAt)
    const value = text.slice(match.index, closeAt + 1)
    const tokenDerived = /^\s*from\s+var\(/.test(body)
    seen.push({
      value,
      offset: match.index,
      ...(tokenDerived ? { achromatic: false, translucent: false } : fnRead(name, body)),
      tokenDerived,
    })
  }
  return seen.sort((one, two) => one.offset - two.offset)
}

function lineAt(source: string, offset: number): number {
  let line = 1
  for (let at = 0; at < offset; at += 1) if (source[at] === "\n") line += 1
  return line
}

function letThrough(token: Token, valueText: string): boolean {
  if (token.tokenDerived) return true
  if (!token.achromatic) return false
  if (token.translucent) return true
  const rest = valueText.replace(token.value, " ").replace(/[\s,]+/g, "")
  return rest.length > 0
}

function blanked(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, (one) => one.replace(/[^\n]/g, " "))
}

const DECLARATION_RE = /(--[\w-]+|[a-zA-Z-]+)\s*:\s*([^;{}]+)/g

export function inStyles(source: string): readonly Written[] {
  const stripped = blanked(source)
  const said: Written[] = []
  for (const decl of stripped.matchAll(DECLARATION_RE)) {
    const value = decl[2] ?? ""
    const valueOffset = decl.index + decl[0].length - value.length
    for (const token of tokensIn(value)) {
      if (letThrough(token, value)) continue
      said.push({ line: lineAt(stripped, valueOffset + token.offset), value: token.value })
    }
  }
  return said
}

type Quoted = {
  readonly content: string
  readonly offset: number
}

function quotedIn(source: string): readonly Quoted[] {
  const out: Quoted[] = []
  type State = "code" | "line" | "block" | "single" | "double" | "template"
  let state: State = "code"
  let start = 0
  let at = 0
  const nesting: number[] = []
  const bump = (by: number): undefined => {
    const last = nesting.length - 1
    nesting[last] = (nesting[last] ?? 0) + by
  }
  while (at < source.length) {
    const one = source.charAt(at)
    const next = source.charAt(at + 1)
    switch (state) {
      case "code":
        if (one === "/" && next === "/") {
          state = "line"
          at += 2
        } else if (one === "/" && next === "*") {
          state = "block"
          at += 2
        } else if (one === "'") {
          state = "single"
          start = at + 1
          at += 1
        } else if (one === '"') {
          state = "double"
          start = at + 1
          at += 1
        } else if (one === "`") {
          state = "template"
          start = at + 1
          at += 1
        } else if (one === "}" && nesting.length > 0 && nesting.at(-1) === 0) {
          nesting.pop()
          state = "template"
          start = at + 1
          at += 1
        } else {
          if (nesting.length > 0) {
            if (one === "{") bump(1)
            else if (one === "}") bump(-1)
          }
          at += 1
        }
        break
      case "line":
        if (one === "\n") state = "code"
        at += 1
        break
      case "block":
        if (one === "*" && next === "/") {
          state = "code"
          at += 2
        } else at += 1
        break
      case "single":
      case "double": {
        const quote = state === "single" ? "'" : '"'
        if (one === "\\") at += 2
        else if (one === quote || one === "\n") {
          out.push({ content: source.slice(start, at), offset: start })
          state = "code"
          at += 1
        } else at += 1
        break
      }
      case "template":
        if (one === "\\") at += 2
        else if (one === "`") {
          out.push({ content: source.slice(start, at), offset: start })
          state = "code"
          at += 1
        } else if (one === "$" && next === "{") {
          out.push({ content: source.slice(start, at), offset: start })
          nesting.push(0)
          state = "code"
          at += 2
        } else at += 1
        break
      default:
        return assertNever(state)
    }
  }
  return out
}

const BRACKETED_RE = /\[([^\]]*)\]/g

export function inCode(source: string): readonly Written[] {
  const said: Written[] = []
  for (const one of quotedIn(source)) {
    const trimmed = one.content.trim()
    if (trimmed.startsWith("var(")) continue
    const base = lineAt(source, one.offset)

    const property = propertyBefore(source, one.offset - 1)
    if (property !== undefined && isBearing(property)) {
      for (const token of tokensIn(one.content)) {
        if (letThrough(token, one.content)) continue
        said.push({ line: base + lineAt(one.content, token.offset) - 1, value: token.value })
      }
      continue
    }

    const declared = BEARING_DECLARATION_RE.test(one.content)
      ? inStyles(one.content).map((held) => ({ line: base + held.line - 1, value: held.value }))
      : []
    said.push(...declared)

    const already = (line: number, value: string): boolean =>
      declared.some((held) => held.line === line && held.value === value)

    const tokens = tokensIn(one.content)
    const first = tokens[0]
    if (first === undefined) continue
    if (tokens.length === 1 && first.value === trimmed) {
      if (first.tokenDerived || (first.achromatic && first.translucent)) continue
      if (!already(base, first.value)) said.push({ line: base, value: first.value })
      continue
    }
    for (const bracket of one.content.matchAll(BRACKETED_RE)) {
      const body = bracket[1] ?? ""
      for (const token of tokensIn(body)) {
        if (letThrough(token, body.replace(/_/g, " "))) continue
        const line = lineAt(source, one.offset + bracket.index + 1 + token.offset)
        if (already(line, token.value)) continue
        said.push({ line, value: token.value })
      }
    }
  }
  return said
}

function saidOf(one: Written): string {
  return `line ${one.line} writes the color ${one.value} out rather than taking it from a design token`
}

export function found(passing: Passing, path: string, text: string): readonly string[] {
  if (!judgedAt(passing, path)) return []
  const seen = styleNamed(path) ? inStyles(text) : inCode(text)
  const granted = passing.granted.get(path)
  const kept =
    granted === undefined ? seen : seen.filter((one) => !granted.has(normalized(one.value)))
  return kept.map(saidOf)
}

export function reasonsOver(passing: Passing): (given: Body) => readonly string[] {
  return overEachBody((path, text) => found(passing, path, text))
}

const PASSING = new WeakMap<Shadow, Passing>()

function passingFor(shadow: Shadow): Passing {
  const held = PASSING.get(shadow)
  if (held !== undefined) return held
  const made = passingIn(shadow)
  PASSING.set(shadow, made)
  return made
}

export const noColorLiteral = judgingEach(BODIES, (given, shadow) =>
  PAGES.isInput(given.path, shadow) ? [] : found(passingFor(shadow), given.path, given.text)
)
