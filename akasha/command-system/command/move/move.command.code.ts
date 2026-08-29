import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { dirname, isAbsolute, join, relative, resolve } from "node:path"
import ts from "typescript"
import { judgingIn } from "../../../checks-system/checking.module.code.ts"
import { everyPage, indexIn } from "../../../data-system/index/index-reading.module.code.ts"
import type { Answer, Given } from "../../calling.module.code.ts"
import type { Change } from "../../landing.module.code.ts"
import { landing } from "../../landing.module.code.ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const TS = ".ts"

const FROM = "--from"

const TO = "--to"

const MESSAGE = "--message"

const RELATIVE = /^\.\.?\//

const BESIDE = /^(code|test)\.[a-z0-9]+$/

const NOT_ESTABLISHED =
  "nothing was repointed in the files that import what moved — the index carries no edge from a " +
  "file to the files importing it, so this move did not establish them"

export type Pair = {
  readonly from: string
  readonly to: string
}

export type Read =
  | { readonly pairs: readonly Pair[]; readonly message: string | null }
  | { readonly refused: string }

export function pairsIn(argv: readonly string[]): Read {
  const pairs: Pair[] = []
  let pending: string | null = null
  let message: string | null = null
  let at = 0
  while (at < argv.length) {
    const token = argv[at]
    if (token === undefined) break
    if (token !== FROM && token !== TO && token !== MESSAGE) {
      return {
        refused: `\`${token}\` is not a flag this takes — a move names its sides as \`${FROM} <path> ${TO} <path>\``,
      }
    }
    const value = argv[at + 1]
    if (value === undefined || (value.startsWith("-") && token !== MESSAGE)) {
      return { refused: `${token} needs a value, and the line ends or names another flag` }
    }
    at = at + 2
    if (token === MESSAGE) {
      message = value
      continue
    }
    if (token === FROM) {
      if (pending !== null) {
        return { refused: `${FROM} ${pending} has no ${TO} — each pair names both sides` }
      }
      pending = value
      continue
    }
    if (pending === null) {
      return { refused: `${TO} ${value} has no ${FROM} — each pair names both sides` }
    }
    pairs.push({ from: pending, to: value })
    pending = null
  }
  if (pending !== null) {
    return { refused: `${FROM} ${pending} has no ${TO} — each pair names both sides` }
  }
  return { pairs, message }
}

export function underAkasha(root: string, from: string, named: string): string | null {
  const full = isAbsolute(named) ? named : resolve(from, named)
  const path = relative(root, full)
  if (path === "" || path.startsWith("..") || isAbsolute(path)) return null
  if (path !== AKASHA && !path.startsWith(INSIDE)) return null
  return path
}

function dirOf(path: string): string {
  const at = path.lastIndexOf("/")
  return at === -1 ? "" : path.slice(0, at)
}

function nameOf(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1)
}

export function besideOf(root: string, path: string): readonly string[] {
  if (!path.endsWith(TS)) return []
  const stem = nameOf(path).slice(0, -TS.length)
  const dir = dirOf(path)
  const full = join(root, dir)
  if (!existsSync(full)) return []
  const found: string[] = []
  for (const name of readdirSync(full)) {
    if (!name.startsWith(`${stem}.`)) continue
    if (!BESIDE.test(name.slice(stem.length + 1))) continue
    found.push(dir === "" ? name : `${dir}/${name}`)
  }
  return found.sort()
}

export function namingOf(root: string, path: string): readonly string[] {
  const held = everyPage(root).find((one) => one.path === path)
  if (held === undefined) return []
  const dir = join(indexIn(root), "relation", "page", "id", held.id)
  if (!existsSync(dir)) return []
  const found = new Set<string>()
  for (const property of readdirSync(dir)) {
    const at = join(dir, property)
    if (!statSync(at).isDirectory()) continue
    for (const name of readdirSync(at)) {
      for (const line of readFileSync(join(at, name), "utf8").split("\n")) {
        if (line === "") continue
        const said = JSON.parse(line) as { readonly path?: unknown }
        if (typeof said.path === "string") found.add(`${said.path} (${property})`)
      }
    }
  }
  return [...found].sort()
}

type Held = {
  readonly start: number
  readonly end: number
  readonly text: string
}

export function specifiersIn(path: string, text: string): readonly Held[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: Held[] = []
  const took = (node: ts.Node | undefined): void => {
    if (node === undefined || !ts.isStringLiteral(node)) return
    found.push({ start: node.getStart(source), end: node.getEnd(), text: node.text })
  }
  const walked = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) took(node.moduleSpecifier)
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require"))
    ) {
      took(node.arguments[0])
    }
    if (ts.isExternalModuleReference(node)) took(node.expression)
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      took(node.argument.literal)
    }
    ts.forEachChild(node, walked)
  }
  ts.forEachChild(source, walked)
  return [...found].sort((one, two) => one.start - two.start)
}

function landedAt(path: string, specifier: string): string | null {
  if (!RELATIVE.test(specifier)) return null
  return join(dirname(path), specifier)
}

function specifierFor(dir: string, target: string): string {
  const said = relative(dir, target)
  return said.startsWith(".") ? said : `./${said}`
}

export function repointed(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string {
  const dir = dirname(now)
  let out = ""
  let at = 0
  for (const one of specifiersIn(now, text)) {
    const landed = landedAt(was, one.text)
    if (landed === null) continue
    const next = specifierFor(dir, moved.get(landed) ?? landed)
    if (next === one.text) continue
    out = `${out}${text.slice(at, one.start)}${JSON.stringify(next)}`
    at = one.end
  }
  return `${out}${text.slice(at)}`
}

function answering(report: readonly string[], refusals: readonly string[], code: number): Answer {
  return { report, refusals, code }
}

type Sided = {
  readonly from: string
  readonly to: string
  readonly named: boolean
}

function sidedIn(
  root: string,
  given: Given,
  pairs: readonly Pair[]
): { readonly sides: readonly Sided[] } | { readonly refusals: readonly string[] } {
  const refusals: string[] = []
  const sides: Sided[] = []
  const seen = new Set<string>()
  const taken = new Set<string>()
  for (const one of pairs) {
    const from = underAkasha(root, given.from, one.from)
    const to = underAkasha(root, given.from, one.to)
    if (from === null || to === null) {
      const outside = from === null ? one.from : one.to
      refusals.push(
        `\`${outside}\` stands outside the \`${AKASHA}\` folder, and this carries nothing in or out of it`
      )
      continue
    }
    if (from === to) {
      refusals.push(`${from} is named as both sides of a pair, so this pair asks for no move at all`)
      continue
    }
    if (!existsSync(join(root, from))) {
      refusals.push(`${from} is not there, so there is no body to carry`)
      continue
    }
    if (!statSync(join(root, from)).isFile()) {
      refusals.push(`${from} is not a file — a move carries bodies, and a directory holds none`)
      continue
    }
    if (existsSync(join(root, to))) {
      refusals.push(`${to} already stands, and a move writes over nothing`)
      continue
    }
    if (nameOf(from) !== nameOf(to)) {
      const naming = namingOf(root, from)
      const among =
        naming.length === 0
          ? "the index shows no page naming it"
          : `these name it — ${naming.join(", ")}`
      refusals.push(
        `${from} would arrive called \`${nameOf(to)}\` — a move carries a body as it stands, and a ` +
          `page states its own slug and is named by that slug, so renaming is not a move (${among})`
      )
      continue
    }
    if (seen.has(from)) {
      refusals.push(`${from} is named as the source of more than one pair`)
      continue
    }
    if (taken.has(to)) {
      refusals.push(`${to} is named as the destination of more than one pair`)
      continue
    }
    seen.add(from)
    taken.add(to)
    sides.push({ from, to, named: true })
    for (const held of besideOf(root, from)) {
      if (seen.has(held)) continue
      seen.add(held)
      const there = `${dirOf(to)}/${nameOf(held)}`
      if (existsSync(join(root, there))) {
        refusals.push(`${there} already stands, and the sidecar ${held} goes with what you named`)
        continue
      }
      taken.add(there)
      sides.push({ from: held, to: there, named: false })
    }
  }
  if (refusals.length > 0) return { refusals }
  return { sides }
}

export function move(argv: readonly string[], given: Given): Answer {
  const read = pairsIn(argv)
  if ("refused" in read) return answering([], [read.refused], 1)
  if (read.pairs.length === 0) {
    return answering([], [`name at least one pair to move, as \`${FROM} <path> ${TO} <path>\``], 1)
  }
  const root = resolve(given.root)
  const sided = sidedIn(root, given, read.pairs)
  if ("refusals" in sided) return answering([], sided.refusals, 1)
  const moved = new Map<string, string>(sided.sides.map((one) => [one.from, one.to]))
  const changes: Change[] = []
  for (const one of sided.sides) {
    const bytes = readFileSync(join(root, one.from))
    if (!one.from.endsWith(TS)) {
      changes.push({ path: one.to, body: bytes })
      changes.push({ path: one.from, body: null })
      continue
    }
    let text: string
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
    } catch {
      return answering(
        [],
        [`${one.from} is named \`${TS}\` and its bytes are not utf-8, so its specifiers cannot be read`],
        2
      )
    }
    changes.push({ path: one.to, body: new TextEncoder().encode(repointed(one.from, one.to, text, moved)) })
    changes.push({ path: one.from, body: null })
  }
  const message =
    read.message ?? `move ${sided.sides.map((one) => `${one.from} to ${one.to}`).join(", ")}`
  const said = landing(root, changes, message, judgingIn(root, "patch"), given.writer)
  if ("refusals" in said) return answering([], said.refusals, 3)
  const beside = sided.sides.filter((one) => !one.named)
  const report = sided.sides
    .filter((one) => one.named)
    .map((one) => `${one.from} moved to ${one.to}`)
  if (beside.length > 0) {
    report.push(
      `these stood beside what you named and went with it — ${beside
        .map((one) => `${one.from} to ${one.to}`)
        .join(", ")}`
    )
  }
  report.push(NOT_ESTABLISHED)
  if (said.commit !== null) report.push(`committed as ${said.commit}`)
  return answering(report, [], 0)
}
