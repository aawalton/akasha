import {
  folderOf,
  relativeBetween,
} from "akasha/code/path/modules/between/code-path-between.module.code.ts"
import {
  lineAt,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { normalizeAbsolute } from "akasha/page/modules/repo-path/repo-path.module.code.ts"
import ts from "typescript"

const OWN_DIR = ["import.meta.dir", "import.meta.dirname", "__dirname"] as const

const OWN_URL = "import.meta.url"

const MODULE_ENDINGS = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"] as const

const JOINS: ReadonlySet<string> = new Set(["join", "resolve"])

const PATH_TEXT = /[A-Za-z0-9_./~-]/

interface Span {
  readonly start: number
  readonly end: number
}

export interface Patch {
  readonly start: number
  readonly end: number
  readonly text: string
  readonly was: string
}

export type Held = (absolute: string) => boolean

export type Moved = (absolute: string) => string | null

export interface RuntimePaths {
  readonly patches: readonly Patch[]
  readonly read: number
  readonly unread: number
  readonly unreadable: readonly string[]
}

const NO_RUNTIME_PATHS: RuntimePaths = { patches: [], read: 0, unread: 0, unreadable: [] }

export function readsRuntimePaths(relPath: string): boolean {
  return MODULE_ENDINGS.some((one) => relPath.endsWith(one))
}

interface Literal {
  readonly value: string
  readonly span: Span
  readonly quote: string
}

function spanOf(source: ts.SourceFile, node: ts.Node): Span {
  return { start: node.getStart(source), end: node.end }
}

function literalIn(source: ts.SourceFile, node: ts.Node): Literal | null {
  if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) return null
  const start = node.getStart(source) + 1
  const end = node.end - 1
  const value = source.text.slice(start, end)
  if (value.includes("\\")) return null
  return { value, span: { start, end }, quote: source.text[start - 1] ?? '"' }
}

function headOf(source: ts.SourceFile, node: ts.Node | undefined): string {
  if (node === undefined) return ""
  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    return source.text.slice(node.getStart(source) + 1, node.end - 1)
  }
  if (!ts.isTemplateExpression(node)) return ""
  return source.text.slice(node.head.getStart(source) + 1, node.head.end - 2)
}

function pieceAfter(source: ts.SourceFile, span: ts.TemplateSpan): Span {
  const closing = ts.isTemplateTail(span.literal) ? 1 : 2
  return { start: span.literal.getStart(source) + 1, end: span.literal.end - closing }
}

function prefixOf(dir: string, head: string): string {
  const cut = head.lastIndexOf("/")
  return normalizeAbsolute(cut === -1 ? dir : `${dir}/${head.slice(0, cut + 1)}`)
}

function walked(dir: string, segments: readonly string[]): string {
  let at = dir
  for (const one of segments) at = one.startsWith("/") ? one : `${at}/${one}`
  return normalizeAbsolute(at)
}

function joining(node: ts.CallExpression): boolean {
  const callee = node.expression
  if (ts.isIdentifier(callee)) return JOINS.has(callee.text)
  return ts.isPropertyAccessExpression(callee) && JOINS.has(callee.name.text)
}

function urlBuiltOff(source: ts.SourceFile, node: ts.NewExpression): ts.Expression | null {
  if (!ts.isIdentifier(node.expression) || node.expression.text !== "URL") return null
  const [first, second] = node.arguments ?? []
  if (node.arguments?.length !== 2 || first === undefined || second === undefined) return null
  return second.getText(source) === OWN_URL ? first : null
}

function basesIn(source: ts.SourceFile): ReadonlySet<string> {
  const own: ReadonlySet<string> = new Set(OWN_DIR)
  const bases = new Set<string>(OWN_DIR)
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const bound = node.initializer?.getText(source)
      if (bound !== undefined && own.has(bound)) bases.add(node.name.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return bases
}

function redotted(was: string, next: string): string {
  return was.startsWith("./") && !next.startsWith(".") ? `./${next}` : next
}

export function runtimePatches(
  body: string,
  hostBefore: string,
  hostAfter: string,
  moved: Moved,
  held: Held
): RuntimePaths {
  if (!body.includes(OWN_URL) && !OWN_DIR.some((one) => body.includes(one))) return NO_RUNTIME_PATHS
  const source = parsedAs(hostBefore, body)
  const bases = basesIn(source)
  const based = (node: ts.Node): boolean => bases.has(node.getText(source))
  const beneath = folderOf(hostBefore)
  const lands = folderOf(hostAfter)
  const patches: Patch[] = []
  const dark: { readonly span: Span; readonly prefix: string }[] = []
  let read = 0

  const cannot = (span: Span, prefix: string): undefined => {
    dark.push({ span, prefix })
  }

  const retarget = (segments: readonly string[]): string | null => {
    read += 1
    const absolute = walked(beneath, segments)
    const target = moved(absolute)
    if (target === null && (beneath === lands || !held(absolute))) return null
    const next = relativeBetween(lands, target ?? absolute)
    return next === segments.join("/") ? null : next
  }

  const patch = (span: Span, was: string, text: string): undefined => {
    patches.push({ start: span.start, end: span.end, text, was })
  }

  const readUrl = (node: ts.NewExpression): undefined => {
    const first = urlBuiltOff(source, node)
    if (first === null) return
    const literal = literalIn(source, first)
    if (literal === null) {
      cannot(spanOf(source, node), prefixOf(beneath, headOf(source, first)))
      return
    }
    const next = retarget([literal.value])
    if (next !== null) patch(literal.span, literal.value, redotted(literal.value, next))
  }

  const readCall = (node: ts.CallExpression): undefined => {
    const [first, ...rest] = node.arguments
    if (!joining(node) || first === undefined || !based(first)) return
    if (rest.length === 0) {
      read += 1
      return
    }
    const written: Literal[] = []
    for (const one of rest) {
      const literal = literalIn(source, one)
      if (literal === null) break
      written.push(literal)
    }
    if (written.length !== rest.length) {
      const upTo = walked(
        beneath,
        written.map((one) => one.value)
      )
      cannot(spanOf(source, node), prefixOf(upTo, headOf(source, rest[written.length])))
      return
    }
    const next = retarget(written.map((one) => one.value))
    const head = written[0]
    const tail = written.at(-1)
    if (next === null || head === undefined || tail === undefined) return
    if (written.length === 1) {
      patch(head.span, head.value, redotted(head.value, next))
      return
    }
    const span = { start: head.span.start - 1, end: tail.span.end + 1 }
    patch(span, body.slice(span.start, span.end), `${head.quote}${next}${head.quote}`)
  }

  const readTemplate = (node: ts.TemplateExpression): undefined => {
    const whole = spanOf(source, node)
    const spans = node.templateSpans
    for (const [index, span] of spans.entries()) {
      if (!based(span.expression)) continue
      const piece = pieceAfter(source, span)
      const text = body.slice(piece.start, piece.end)
      const last = index + 1 === spans.length
      let cut = 0
      while (cut < text.length && PATH_TEXT.test(text[cut] ?? "")) cut += 1
      if (cut === 0) {
        if (text === "" && last) read += 1
        else cannot(whole, prefixOf(beneath, ""))
        continue
      }
      if (cut === text.length && !last) {
        cannot(whole, prefixOf(beneath, text))
        continue
      }
      if (text[0] !== "/") {
        cannot(whole, prefixOf(beneath, text.slice(0, cut)))
        continue
      }
      const next = retarget([text.slice(1, cut)])
      if (next !== null) {
        patch({ start: piece.start + 1, end: piece.start + cut }, text.slice(1, cut), next)
      }
    }
  }

  const visit = (node: ts.Node): undefined => {
    if (ts.isNewExpression(node)) readUrl(node)
    else if (ts.isCallExpression(node)) readCall(node)
    else if (ts.isTemplateExpression(node)) readTemplate(node)
    ts.forEachChild(node, visit)
  }
  visit(source)

  const bites = (prefix: string): boolean => beneath !== lands || moved(prefix) !== null
  return {
    patches: patches.sort((one, other) => one.start - other.start),
    read,
    unread: dark.length,
    unreadable: dark
      .filter((one) => bites(one.prefix))
      .map((one) => {
        const text = body.slice(one.span.start, one.span.end).replace(/\s+/g, " ").trim()
        return `${lineAt(source, one.span.start)}: \`${text}\``
      }),
  }
}
