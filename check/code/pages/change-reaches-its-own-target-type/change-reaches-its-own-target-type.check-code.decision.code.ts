import { dirname, join } from "node:path"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  type Selector,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  lineOf,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const CHANGE = "change"

const CODE = "code"

const TS = "ts"

const TARGET = "changeTargetType"

const SLUG = "slug"

const PARTED_BY = "/"

const SAID = "a change reaches only a change acting on the same target type"

type Reaching = {
  readonly path: string
  readonly value: Value
}

type Acting = {
  readonly slug: string
  readonly target: string
}

type Named = {
  readonly address: string | null
  readonly line: number
}

type Beside = {
  readonly at: string
  readonly text: string
}

type Reader = (path: string) => string | null

const KINDS = new WeakMap<Paged, ReadonlySet<string>>()

function kindsFor(paged: Paged): ReadonlySet<string> {
  const found = KINDS.get(paged)
  if (found !== undefined) return found
  const made = paged.index.kindsUnder(CHANGE)
  KINDS.set(paged, made)
  return made
}

function pageOfChange(path: string, paged: Paged): string | null {
  const said = partedIn(path)
  if (said === null || !kindsFor(paged).has(said.pageType)) return null
  if (said.sections.length === 0) return said.held === TS ? path : null
  if (said.sections.length !== 1 || said.sections[0] !== CODE) return null
  return join(dirname(path), `${said.slug}.${said.pageType}.${TS}`)
}

function reachingIn(paths: readonly string[], read: Reader, paged: Paged): readonly Reaching[] {
  const seen = new Set<string>()
  const found: Reaching[] = []
  for (const path of paths) {
    const page = pageOfChange(path, paged)
    if (page === null || seen.has(page)) continue
    seen.add(page)
    if (read(page) === null) continue
    const value = paged.pageOf(page)
    if (value !== null) found.push({ path: page, value })
  }
  return found
}

function addressLike(said: string, kinds: ReadonlySet<string>): boolean {
  const at = said.indexOf(PARTED_BY)
  if (at < 1 || at === said.length - 1) return false
  return kinds.has(said.slice(0, at))
}

function couldBeAddress(parts: readonly string[], kinds: ReadonlySet<string>): boolean {
  for (const part of parts) {
    const sections = part.split(PARTED_BY)
    for (const [at, one] of sections.entries()) {
      if (at + 1 < sections.length && kinds.has(one)) return true
    }
  }
  return false
}

function writtenIn(node: ts.Node): readonly string[] | null {
  if (ts.isTemplateExpression(node)) {
    return [node.head.text, ...node.templateSpans.map((one) => one.literal.text)]
  }
  if (!ts.isBinaryExpression(node) || node.operatorToken.kind !== ts.SyntaxKind.PlusToken) {
    return null
  }
  const found: string[] = []
  for (const one of [node.left, node.right]) {
    if (ts.isStringLiteralLike(one)) found.push(one.text)
  }
  return found.length === 0 ? null : found
}

function addressesIn(path: string, text: string, kinds: ReadonlySet<string>): readonly Named[] {
  const source = parsedAs(path, text)
  const found: Named[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isStringLiteralLike(node) && addressLike(node.text, kinds)) {
      found.push({ address: node.text, line: lineOf(source, node) })
    }
    const written = writtenIn(node)
    if (written !== null && couldBeAddress(written, kinds)) {
      found.push({ address: null, line: lineOf(source, node) })
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

function besideOf(read: Reader, path: string, value: Value): Beside | null {
  const held = textAt(value, CODE)
  if (held === null) return null
  const at = besideAt(path, CODE, held)
  if (at === null) return null
  const text = read(at)
  return text === null ? null : { at, text }
}

function actingIn(value: Value, path: string): Acting | null {
  const target = slugAt(value, TARGET)
  if (target === null) return null
  return { slug: textAt(value, SLUG) ?? path, target }
}

function reachedBy(address: string, paged: Paged): Acting | null {
  const at = address.indexOf(PARTED_BY)
  if (at < 0) return null
  const one = paged.index.listedAt(address.slice(0, at), address.slice(at + 1))[0]
  if (one === undefined) return null
  const value = paged.pageOf(one.path)
  return value === null ? null : actingIn(value, one.path)
}

function unread(line: number): string {
  return (
    `the address on line ${line} is put together as the body runs rather than written out, so` +
    " which change it reaches cannot be read"
  )
}

function across(address: string, here: Acting, there: Acting): string {
  return (
    `\`${address}\` reaches \`${there.slug}\`, which acts on \`${there.target}\`, where` +
    ` \`${here.slug}\` acts on \`${here.target}\`, and ${SAID}`
  )
}

function reasonsFor(read: Reader, paged: Paged, one: Reaching): readonly string[] {
  const beside = besideOf(read, one.path, one.value)
  if (beside === null) return []
  const here = actingIn(one.value, one.path)
  const said: string[] = []
  const seen = new Set<string>()
  const lines = new Set<number>()
  for (const named of addressesIn(beside.at, beside.text, kindsFor(paged))) {
    if (named.address === null) {
      if (lines.has(named.line)) continue
      lines.add(named.line)
      said.push(unread(named.line))
      continue
    }
    if (here === null || seen.has(named.address)) continue
    seen.add(named.address)
    const there = reachedBy(named.address, paged)
    if (there === null || there.target === here.target) continue
    said.push(across(named.address, here, there))
  }
  return said
}

export function judgedOver(
  paths: readonly string[],
  read: Reader,
  paged: Paged
): readonly Judged[] {
  const said: Judged[] = []
  for (const one of reachingIn(paths, read, paged)) {
    for (const reason of reasonsFor(read, paged, one)) said.push({ path: one.path, reason })
  }
  return said
}

function readingOf(change: Change): Reader {
  return (at) => textIn(change, at)
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  return judgedOver(change.changed, readingOf(change), shadow)
}

export const CHANGES: Selector<Reaching> = {
  named: "change pages and the code beside them",
  isInput: (path, shadow) => pageOfChange(path, shadow) !== null,
  from: (change, shadow) => reachingIn(change.changed, readingOf(change), shadow),
}
