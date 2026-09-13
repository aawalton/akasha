import { dirname, join } from "node:path"
import {
  type Selector,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  lineOf,
  parsedAs,
} from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"
import ts from "typescript"

const CHANGE = "change"

const CODE = "code"

const TS = "ts"

const REACH = "reach"

const WHICH = 1

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

function plainIn(node: ts.Expression): ts.Expression {
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return plainIn(node.expression)
  if (ts.isParenthesizedExpression(node)) return plainIn(node.expression)
  return node
}

function constStated(node: ts.VariableDeclaration): boolean {
  const list = node.parent
  return ts.isVariableDeclarationList(list) && (list.flags & ts.NodeFlags.Const) !== 0
}

function constsIn(source: ts.SourceFile): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const walk = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && constStated(node)) {
      const held = node.initializer
      const said = held === undefined ? null : plainIn(held)
      if (said !== null && ts.isStringLiteralLike(said)) found.set(node.name.text, said.text)
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

function addressOf(
  given: ts.Expression | undefined,
  held: ReadonlyMap<string, string>
): string | null {
  if (given === undefined) return null
  const said = plainIn(given)
  if (ts.isStringLiteralLike(said)) return said.text
  return ts.isIdentifier(said) ? (held.get(said.text) ?? null) : null
}

function namedIn(path: string, text: string): readonly Named[] {
  if (!text.includes(REACH)) return []
  const source = parsedAs(path, text)
  const held = constsIn(source)
  const found: Named[] = []
  const walk = (node: ts.Node): undefined => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === REACH
    ) {
      found.push({ address: addressOf(node.arguments[WHICH], held), line: lineOf(source, node) })
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
    `the address handed to \`reach\` on line ${line} is built out of something other than written` +
    " letters, so which change it reaches cannot be read"
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
  for (const named of namedIn(beside.at, beside.text)) {
    if (named.address === null) {
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
