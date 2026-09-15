import { dirname, join } from "node:path"
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
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
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

const kindsFor = heldPerShadow((shadow: Shadow) => shadow.index.kindsUnder(CHANGE))

function pageOfChange(path: string, shadow: Shadow): string | null {
  const said = partedIn(path)
  if (said === null || !kindsFor(shadow).has(said.pageType)) return null
  if (said.sections.length === 0) return said.held === TS ? path : null
  if (said.sections.length !== 1 || said.sections[0] !== CODE) return null
  return join(dirname(path), `${said.slug}.${said.pageType}.${TS}`)
}

function reachingIn(change: Change, shadow: Shadow): readonly Reaching[] {
  const seen = new Set<string>()
  const found: Reaching[] = []
  for (const path of change.changed) {
    const page = pageOfChange(path, shadow)
    if (page === null || seen.has(page)) continue
    seen.add(page)
    if (change.after(page) === null) continue
    const value = shadow.pageOf(page)
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

function besideOf(change: Change, path: string, value: Value): Beside | null {
  const held = textAt(value, CODE)
  if (held === null) return null
  const at = besideAt(path, CODE, held)
  if (at === null) return null
  const text = textIn(change, at)
  return text === null ? null : { at, text }
}

function actingIn(value: Value, path: string): Acting | null {
  const target = slugAt(value, TARGET)
  if (target === null) return null
  return { slug: textAt(value, SLUG) ?? path, target }
}

function reachedBy(address: string, shadow: Shadow): Acting | null {
  const at = address.indexOf(PARTED_BY)
  if (at < 0) return null
  const one = shadow.index.listedAt(address.slice(0, at), address.slice(at + 1))[0]
  if (one === undefined) return null
  const value = shadow.pageOf(one.path)
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

function reasonsFor(change: Change, shadow: Shadow, one: Reaching): readonly string[] {
  const beside = besideOf(change, one.path, one.value)
  if (beside === null) return []
  const here = actingIn(one.value, one.path)
  const said: string[] = []
  const seen = new Set<string>()
  const lines = new Set<number>()
  for (const named of addressesIn(beside.at, beside.text, kindsFor(shadow))) {
    if (named.address === null) {
      if (lines.has(named.line)) continue
      lines.add(named.line)
      said.push(unread(named.line))
      continue
    }
    if (here === null || seen.has(named.address)) continue
    seen.add(named.address)
    const there = reachedBy(named.address, shadow)
    if (there === null || there.target === here.target) continue
    said.push(across(named.address, here, there))
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const said: Judged[] = []
  for (const one of reachingIn(change, shadow)) {
    for (const reason of reasonsFor(change, shadow, one)) said.push({ path: one.path, reason })
  }
  return said
}

export const CHANGES: Selector<Reaching> = {
  named: "change pages and the code beside them",
  isInput: (path, shadow) => pageOfChange(path, shadow) !== null,
  from: reachingIn,
}
