import { normalizeAbsolute } from "../repo/path/path.ts"
import { dirOf, relativeBetween } from "./between.ts"
import type { Held } from "./held.ts"
import type { Patch } from "./mention.ts"
import { argumentsOf, type Span, type Tokens, tokensOf } from "./source-tokens.ts"

/**
 * A RELATIVE RUNTIME PATH names a file by where it stands relative to THE FILE THE STRING IS
 * WRITTEN IN, and it is neither an import specifier nor a path from the repo root:
 * `new URL("./x.json", import.meta.url)` is one. Nothing else a rename runs can see it. The
 * specifier survey reads `import` and `from` and this is neither. The mention survey matches the
 * repo-root spelling, which such a string never writes. So a move that took no account of these
 * carried a file away and left every one of them naming a path that is not there, under a report
 * saying every check passed.
 *
 * WHAT MAKES ONE READABLE is a BASE — an expression naming this file's own directory — with a
 * string literal hanging off it in the same expression. The base is `import.meta.dir`,
 * `import.meta.dirname`, `__dirname`, a name bound to one of those in the same file, or
 * `import.meta.url` standing as the second argument to `new URL`. The literal reaches it three
 * ways, and these are the three the repo writes: as the first argument to `new URL`, as the
 * arguments after the base to `join` or `resolve`, and as the static tail of a template the base
 * opens.
 *
 * A BASE THIS CANNOT READ A PATH OFF is counted and named rather than passed over. It builds some
 * path under the deepest directory it does spell out, and where the call moves a file standing
 * DIRECTLY in that directory, or moves the file the expression is written in, the move is
 * REFUSED: those are the two ways such a path goes stale, and guessing which path it builds is
 * how a body gets carried off from under working code. One whose directory this call does not
 * touch is counted and left alone, a move answering for what it moves rather than for every
 * unknown standing anywhere in the tree.
 *
 * A DIRECTORY VALUE THAT MERELY ESCAPES — bound to a name, handed to a function, wrapped in
 * `dirname` — is not counted against the move. A directory names no file on its own, and every
 * file one later names is written either as a path from the repo root, which the mention survey
 * reads, or as a literal at a site this reads. What is left over is a directory carried through a
 * name and then joined with a computed one, which no reader resolves, and which the outcome says
 * outright rather than counting as looked at.
 */

const OWN_DIR = ["import.meta.dir", "import.meta.dirname", "__dirname"] as const

const OWN_URL = "import.meta.url"

const MODULE_ENDINGS = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"] as const

const NEW_URL = /\bnew\s+URL\s*\(/g

const CALL = /([A-Za-z_$][\w$.]*)\s*\(/g

const JOINS = /(?:^|\.)(?:join|resolve)$/

const ALIAS = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*(?::[^=;\n]*)?=\s*(import\.meta\.dir(?:name)?|__dirname)\b/g

// What may stand in a path written into the static tail of a template. A tail runs on past the
// path it opens with — `` `${import.meta.dir}/run.sh --flag` `` — and the path is what precedes
// the first character no path carries.
const PATH_TEXT = /[A-Za-z0-9_./~-]/

const SPACE = /\s/

export interface RuntimePaths {
  readonly patches: readonly Patch[]
  /** How many relative runtime paths were read and resolved, changed or not. */
  readonly read: number
  /** How many bases stood here that no path could be read off, whether or not they bear on this. */
  readonly unread: number
  /** Those of them this call moves a file out from under, as `line: \`text\``. */
  readonly unreadable: readonly string[]
}

export const NO_RUNTIME_PATHS: RuntimePaths = { patches: [], read: 0, unread: 0, unreadable: [] }

export function readsRuntimePaths(relPath: string): boolean {
  return MODULE_ENDINGS.some((one) => relPath.endsWith(one))
}

interface Literal {
  readonly value: string
  readonly span: Span
  readonly quote: string
}

function trimmedSpan(body: string, span: Span): Span {
  let start = span.start
  let end = span.end
  while (start < end && SPACE.test(body[start] ?? "")) start += 1
  while (end > start && SPACE.test(body[end - 1] ?? "")) end -= 1
  return { start, end }
}

/** The literal standing alone in `span`, or null where anything else does. */
function literalIn(body: string, tokens: Tokens, span: Span): Literal | null {
  const at = trimmedSpan(body, span)
  const quoted = tokens.strings.get(at.start)
  if (quoted !== undefined && quoted.end === at.end && quoted.value !== null) {
    return {
      value: quoted.value,
      span: { start: at.start + 1, end: at.end - 1 },
      quote: body[at.start] ?? '"',
    }
  }
  const template = tokens.templates.get(at.start)
  if (template === undefined || template.end !== at.end || template.exprs.length > 0) return null
  const only = template.quasis[0]
  if (only === undefined) return null
  const text = body.slice(only.start, only.end)
  return text.includes("\\") ? null : { value: text, span: only, quote: "`" }
}

/** The leading run of static text of a template standing alone in `span`, empty for anything else. */
function headOf(body: string, tokens: Tokens, span: Span): string {
  const at = trimmedSpan(body, span)
  const template = tokens.templates.get(at.start)
  if (template === undefined || template.end !== at.end) return ""
  const first = template.quasis[0]
  return first === undefined ? "" : body.slice(first.start, first.end)
}

/** The deepest directory a partly-written path still spells out. */
function prefixOf(dir: string, head: string): string {
  const cut = head.lastIndexOf("/")
  return normalizeAbsolute(cut === -1 ? dir : `${dir}/${head.slice(0, cut + 1)}`)
}

/** Where a run of path segments lands, taking a segment that opens with `/` as starting over. */
function walked(dir: string, segments: readonly string[]): string {
  let at = dir
  for (const one of segments) at = one.startsWith("/") ? one : `${at}/${one}`
  return normalizeAbsolute(at)
}

export function runtimePatches(
  body: string,
  hostBefore: string,
  hostAfter: string,
  moved: ReadonlyMap<string, string>,
  held: Held
): RuntimePaths {
  if (!body.includes(OWN_URL) && !OWN_DIR.some((one) => body.includes(one))) return NO_RUNTIME_PATHS
  const tokens = tokensOf(body)
  const bases = new Set<string>(OWN_DIR)
  for (const match of tokens.masked.matchAll(ALIAS)) {
    const name = match[1]
    if (name !== undefined) bases.add(name)
  }
  const beneath = dirOf(hostBefore)
  const lands = dirOf(hostAfter)
  const patches: Patch[] = []
  const dark: { readonly span: Span; readonly prefix: string }[] = []
  let read = 0

  const lineOf = (index: number): number => body.slice(0, index).split("\n").length

  const cannot = (span: Span, prefix: string): void => {
    dark.push({ span, prefix })
  }

  /** Where a run of segments now lands, or null where nothing about it changes. */
  const retarget = (segments: readonly string[]): string | null => {
    read += 1
    const absolute = walked(beneath, segments)
    const target = moved.get(absolute)
    if (target === undefined && (beneath === lands || !held(absolute))) return null
    const next = relativeBetween(lands, target ?? absolute)
    return next === segments.join("/") ? null : next
  }

  const patch = (span: Span, was: string, text: string): void => {
    patches.push({ start: span.start, end: span.end, text, was })
  }

  // `new URL("./x.json", import.meta.url)`
  for (const match of tokens.masked.matchAll(NEW_URL)) {
    const open = (match.index ?? 0) + match[0].length - 1
    const args = argumentsOf(tokens.masked, open)
    const first = args?.[0]
    const second = args?.[1]
    if (args === null || args.length !== 2 || first === undefined || second === undefined) continue
    if (tokens.masked.slice(second.start, second.end).trim() !== OWN_URL) continue
    const literal = literalIn(body, tokens, first)
    if (literal === null) {
      const span = { start: match.index ?? 0, end: second.end + 1 }
      cannot(span, prefixOf(beneath, headOf(body, tokens, first)))
      continue
    }
    const next = retarget([literal.value])
    if (next === null) continue
    patch(literal.span, literal.value, literal.value.startsWith("./") && !next.startsWith(".") ? `./${next}` : next)
  }

  // `join(import.meta.dir, "x.json")` and `resolve(__dirname, "..", "x.json")`
  for (const match of tokens.masked.matchAll(CALL)) {
    const callee = match[1] ?? ""
    if (!JOINS.test(callee)) continue
    const open = (match.index ?? 0) + match[0].length - 1
    const args = argumentsOf(tokens.masked, open)
    const first = args?.[0]
    if (args === null || first === undefined) continue
    if (!bases.has(tokens.masked.slice(first.start, first.end).trim())) continue
    const rest = args.slice(1)
    if (rest.length === 0) {
      read += 1
      continue
    }
    const literals = rest.map((one) => literalIn(body, tokens, one))
    const written: Literal[] = []
    for (const one of literals) {
      if (one === null) break
      written.push(one)
    }
    if (written.length !== literals.length) {
      const span = { start: match.index ?? 0, end: (rest.at(-1)?.end ?? open) + 1 }
      const upTo = walked(beneath, written.map((one) => one.value))
      const next = rest[written.length]
      cannot(span, prefixOf(upTo, next === undefined ? "" : headOf(body, tokens, next)))
      continue
    }
    const next = retarget(written.map((one) => one.value))
    if (next === null) continue
    const head = written[0]
    const tail = written.at(-1)
    if (head === undefined || tail === undefined) continue
    if (written.length === 1) {
      patch(head.span, head.value, head.value.startsWith("./") && !next.startsWith(".") ? `./${next}` : next)
      continue
    }
    // More than one segment cannot be repointed piece by piece without saying which piece the
    // change belongs to, so the whole run becomes the one literal it always stood for.
    const span = { start: head.span.start - 1, end: tail.span.end + 1 }
    patch(span, body.slice(span.start, span.end), `${head.quote}${next}${head.quote}`)
  }

  // `` `${import.meta.dir}/x.json` ``
  for (const template of tokens.templates.values()) {
    for (const [index, expr] of template.exprs.entries()) {
      if (!bases.has(tokens.masked.slice(expr.start, expr.end).trim())) continue
      const quasi = template.quasis[index + 1]
      if (quasi === undefined) continue
      const text = body.slice(quasi.start, quasi.end)
      let cut = 0
      while (cut < text.length && PATH_TEXT.test(text[cut] ?? "")) cut += 1
      if (cut === 0) {
        // The base opens a path that carries straight on into the next `${}`, or is glued to text
        // no path starts with. Either way what it builds is not there to read.
        if (text === "" && index + 1 === template.exprs.length) read += 1
        else cannot(template, prefixOf(beneath, text.slice(0, cut)))
        continue
      }
      if (cut === text.length && index + 1 < template.exprs.length) {
        cannot(template, prefixOf(beneath, text))
        continue
      }
      if (text[0] !== "/") {
        cannot(template, prefixOf(beneath, text.slice(0, cut)))
        continue
      }
      const next = retarget([text.slice(1, cut)])
      if (next === null) continue
      patch({ start: quasi.start + 1, end: quasi.start + cut }, text.slice(1, cut), next)
    }
  }

  // A base no path could be read off bears on THIS call where the call moves a file standing
  // DIRECTLY in the deepest directory that base spells out, or moves the file it stands in.
  // Anywhere else it names nothing this touches, and refusing over it would stop every move in
  // the tree for an unknown that was never about the move.
  const holding = new Set([...moved.keys()].map((one) => dirOf(one)))
  const bites = (prefix: string): boolean => beneath !== lands || holding.has(prefix)
  return {
    patches,
    read,
    unread: dark.length,
    unreadable: dark
      .filter((one) => bites(one.prefix))
      .map((one) => {
        const text = body.slice(one.span.start, one.span.end).replace(/\s+/g, " ").trim()
        return `${lineOf(one.span.start)}: \`${text}\``
      }),
  }
}
