import { assertNever } from "@akasha/utils-narrow/assert-never"
import {
  GRANTED_VALUES_BY_PATH,
  normalizeLiteral,
  RULE_HOME_PATH,
} from "../color-literal-grants/color-literal-grants.module.code.ts"
import {
  COLOR_BEARING_DECLARATION_RE,
  isColorBearingProperty,
  propertyBefore,
} from "../css-color-properties/css-color-properties.module.code.ts"

export interface ColorLiteralViolation {
  readonly file: string
  readonly line: number
  readonly value: string
}

const EXEMPT_SEGMENTS: ReadonlySet<string> = new Set([
  "node_modules",
  ".git",
  "dist",
  ".next",
  ".turbo",
  ".cache",
  "build",
  "coverage",
  "generated",
  "__fixtures__",
  "addon",
  "addons",
  "tstl",
])

const DESIGN_HOME_PREFIXES = ["shared/design-", "akasha/design/"]

// A shell's www/ holds what a build put there — a staged SPA bundle for one shell, a
// copied boot page for the other — and neither is authored. Matched under ios-apps
// rather than at one shell's old path, so it keeps holding as shells move in.
const NATIVE_SHELL_BUILT_ARTIFACT_RE = /^akasha\/code-system\/ios-app\/ios-apps\/[^/]+\/www\//

export function shouldScanColorFile(repoRelPath: string): boolean {
  if (DESIGN_HOME_PREFIXES.some((prefix) => repoRelPath.startsWith(prefix))) return false
  if (NATIVE_SHELL_BUILT_ARTIFACT_RE.test(repoRelPath)) return false
  if (repoRelPath === RULE_HOME_PATH) return false
  if (!/\.(css|tsx?)$/.test(repoRelPath)) return false
  const base = repoRelPath.slice(repoRelPath.lastIndexOf("/") + 1)
  if (base.includes(".test.") || base.includes(".generated.")) return false
  return !repoRelPath.split("/").some((segment) => EXEMPT_SEGMENTS.has(segment))
}

const HEX_RE = /#[0-9a-fA-F]+/g
const COLOR_FN_RE = /\b(?:oklch|rgba?|hsla?)\(/g
const VALID_HEX_LENGTHS = new Set([3, 4, 6, 8])

interface ColorToken {
  readonly value: string
  readonly offset: number
  readonly achromatic: boolean
  readonly translucent: boolean
  readonly tokenDerived: boolean
}

function parseHexToken(value: string): Pick<ColorToken, "achromatic" | "translucent"> {
  const digits = value.slice(1)
  const size = digits.length === 3 || digits.length === 4 ? 1 : 2
  const channel = (i: number): number =>
    Number.parseInt(size === 1 ? digits.charAt(i).repeat(2) : digits.slice(i * 2, i * 2 + 2), 16)
  const [r, g, b] = [channel(0), channel(1), channel(2)]
  const hasAlpha = digits.length === 4 || digits.length === 8
  const alpha = hasAlpha ? channel(3) : 255
  return { achromatic: r === g && g === b, translucent: alpha < 255 }
}

function fnComponents(body: string): readonly string[] {
  return body
    .replace(/[_,/]/g, " ")
    .split(/\s+/)
    .filter((part) => part.length > 0)
}

function parseFnToken(name: string, body: string): Pick<ColorToken, "achromatic" | "translucent"> {
  const parts = fnComponents(body)
  const num = (part: string | undefined): number =>
    part === undefined ? Number.NaN : Number.parseFloat(part)
  const alphaOf = (part: string | undefined): number => {
    if (part === undefined) return 1
    const n = num(part)
    return part.includes("%") ? n / 100 : n
  }
  if (name === "oklch") {
    return { achromatic: num(parts[1]) === 0, translucent: alphaOf(parts[3]) < 1 }
  }
  if (name.startsWith("rgb")) {
    const [r, g, b] = [num(parts[0]), num(parts[1]), num(parts[2])]
    return { achromatic: r === g && g === b, translucent: alphaOf(parts[3]) < 1 }
  }
  return { achromatic: num(parts[1]) === 0, translucent: alphaOf(parts[3]) < 1 }
}

function extractColorTokens(text: string): readonly ColorToken[] {
  const tokens: ColorToken[] = []
  HEX_RE.lastIndex = 0
  for (const match of text.matchAll(HEX_RE)) {
    const value = match[0]
    const digits = value.length - 1
    if (!VALID_HEX_LENGTHS.has(digits)) continue
    const before = match.index === 0 ? "" : text.charAt(match.index - 1)
    const after = text.charAt(match.index + value.length)
    if (/[\w#-]/.test(before)) continue
    if (/[\w#]/.test(after)) continue
    tokens.push({ value, offset: match.index, ...parseHexToken(value), tokenDerived: false })
  }
  for (const match of text.matchAll(COLOR_FN_RE)) {
    const name = match[0].slice(0, -1)
    const openAt = match.index + match[0].length - 1
    let depth = 0
    let closeAt = -1
    for (let i = openAt; i < text.length; i++) {
      if (text[i] === "(") depth += 1
      else if (text[i] === ")") {
        depth -= 1
        if (depth === 0) {
          closeAt = i
          break
        }
      }
    }
    if (closeAt === -1) continue
    const body = text.slice(openAt + 1, closeAt)
    const value = text.slice(match.index, closeAt + 1)
    const tokenDerived = /^\s*from\s+var\(/.test(body)
    tokens.push({
      value,
      offset: match.index,
      ...(tokenDerived ? { achromatic: false, translucent: false } : parseFnToken(name, body)),
      tokenDerived,
    })
  }
  return tokens.sort((a, b) => a.offset - b.offset)
}

function lineAt(source: string, offset: number): number {
  let line = 1
  for (let i = 0; i < offset; i++) if (source[i] === "\n") line += 1
  return line
}

function isAllowedInValue(token: ColorToken, valueText: string): boolean {
  if (token.tokenDerived) return true
  if (!token.achromatic) return false
  if (token.translucent) return true
  const remainder = valueText.replace(token.value, " ").replace(/[\s,]+/g, "")
  return remainder.length > 0
}

function blankCssComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
}

const CSS_DECLARATION_RE = /(--[\w-]+|[a-zA-Z-]+)\s*:\s*([^;{}]+)/g

export function scanCssForColorLiterals(
  file: string,
  source: string
): readonly ColorLiteralViolation[] {
  const stripped = blankCssComments(source)
  const violations: ColorLiteralViolation[] = []
  for (const decl of stripped.matchAll(CSS_DECLARATION_RE)) {
    const value = decl[2] ?? ""
    const valueOffset = decl.index + decl[0].length - value.length
    for (const token of extractColorTokens(value)) {
      if (isAllowedInValue(token, value)) continue
      violations.push({
        file,
        line: lineAt(stripped, valueOffset + token.offset),
        value: token.value,
      })
    }
  }
  return violations
}

interface ExtractedString {
  readonly content: string
  readonly offset: number
}

function extractStrings(source: string): readonly ExtractedString[] {
  const out: ExtractedString[] = []
  type State = "code" | "line" | "block" | "single" | "double" | "template"
  let state: State = "code"
  let start = 0
  let i = 0
  const templateStack: number[] = []
  const bumpTemplateDepth = (delta: number): undefined => {
    const last = templateStack.length - 1
    templateStack[last] = (templateStack[last] ?? 0) + delta
  }
  while (i < source.length) {
    const ch = source.charAt(i)
    const next = source.charAt(i + 1)
    switch (state) {
      case "code":
        if (ch === "/" && next === "/") {
          state = "line"
          i += 2
        } else if (ch === "/" && next === "*") {
          state = "block"
          i += 2
        } else if (ch === "'") {
          state = "single"
          start = i + 1
          i += 1
        } else if (ch === '"') {
          state = "double"
          start = i + 1
          i += 1
        } else if (ch === "`") {
          state = "template"
          start = i + 1
          i += 1
        } else if (ch === "}" && templateStack.length > 0 && templateStack.at(-1) === 0) {
          templateStack.pop()
          state = "template"
          start = i + 1
          i += 1
        } else {
          if (templateStack.length > 0) {
            if (ch === "{") bumpTemplateDepth(1)
            else if (ch === "}") bumpTemplateDepth(-1)
          }
          i += 1
        }
        break
      case "line":
        if (ch === "\n") state = "code"
        i += 1
        break
      case "block":
        if (ch === "*" && next === "/") {
          state = "code"
          i += 2
        } else i += 1
        break
      case "single":
      case "double": {
        const quote = state === "single" ? "'" : '"'
        if (ch === "\\") i += 2
        else if (ch === quote || ch === "\n") {
          out.push({ content: source.slice(start, i), offset: start })
          state = "code"
          i += 1
        } else i += 1
        break
      }
      case "template":
        if (ch === "\\") i += 2
        else if (ch === "`") {
          out.push({ content: source.slice(start, i), offset: start })
          state = "code"
          i += 1
        } else if (ch === "$" && next === "{") {
          out.push({ content: source.slice(start, i), offset: start })
          templateStack.push(0)
          state = "code"
          i += 2
        } else i += 1
        break
      default:
        return assertNever(state)
    }
  }
  return out
}

const ARBITRARY_VALUE_RE = /\[([^\]]*)\]/g

export function scanTsForColorLiterals(
  file: string,
  source: string
): readonly ColorLiteralViolation[] {
  const violations: ColorLiteralViolation[] = []
  for (const str of extractStrings(source)) {
    const trimmed = str.content.trim()
    if (trimmed.startsWith("var(")) continue
    const base = lineAt(source, str.offset)

    const property = propertyBefore(source, str.offset - 1)
    if (property !== undefined && isColorBearingProperty(property)) {
      for (const token of extractColorTokens(str.content)) {
        if (isAllowedInValue(token, str.content)) continue
        violations.push({
          file,
          line: base + lineAt(str.content, token.offset) - 1,
          value: token.value,
        })
      }
      continue
    }

    const declared = COLOR_BEARING_DECLARATION_RE.test(str.content)
      ? scanCssForColorLiterals(file, str.content).map((v) => ({
          file,
          line: base + v.line - 1,
          value: v.value,
        }))
      : []
    violations.push(...declared)

    const alreadyDeclared = (line: number, value: string): boolean =>
      declared.some((v) => v.line === line && v.value === value)

    const tokens = extractColorTokens(str.content)
    const first = tokens[0]
    if (first === undefined) continue
    if (tokens.length === 1 && first.value === trimmed) {
      if (first.tokenDerived || (first.achromatic && first.translucent)) continue
      if (!alreadyDeclared(base, first.value)) {
        violations.push({ file, line: base, value: first.value })
      }
      continue
    }
    for (const bracket of str.content.matchAll(ARBITRARY_VALUE_RE)) {
      const body = bracket[1] ?? ""
      for (const token of extractColorTokens(body)) {
        if (isAllowedInValue(token, body.replace(/_/g, " "))) continue
        const line = lineAt(source, str.offset + bracket.index + 1 + token.offset)
        if (alreadyDeclared(line, token.value)) continue
        violations.push({ file, line, value: token.value })
      }
    }
  }
  return violations
}

export function scanFileForColorLiterals(
  file: string,
  source: string
): readonly ColorLiteralViolation[] {
  const found = file.endsWith(".css")
    ? scanCssForColorLiterals(file, source)
    : scanTsForColorLiterals(file, source)
  const granted = GRANTED_VALUES_BY_PATH.get(file)
  if (granted === undefined) return found
  return found.filter((violation) => !granted.has(normalizeLiteral(violation.value)))
}
