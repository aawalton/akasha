import {
  boundAs,
  declarationsNamed,
  declaredNamed,
  declaredOn,
  exportsNamed,
  keyingsIn,
  type Naming,
  namingOf,
  reachedFrom,
  readingOf,
  referencesOf,
  spelledAs,
  type Typing,
  typed,
  typingOver,
} from "@akasha/code-system/code-typing"
import type ts from "typescript"
import { counted } from "../../../command-system/asking/asking.module.code.ts"
import { were } from "../landing/refactor-landing.module.code.ts"
import type { Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../type-renaming/type-renaming.module.code.ts"
import { nameRespelled, namesStill } from "../type-respelling/type-respelling.module.code.ts"

export const LINE = "--line"

const LEFT = 12

const NAME = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const COUNT = /^[1-9][0-9]*$/

export type Tokening = {
  readonly path: string
  readonly was: string
  readonly now: string
  readonly line?: number
}

export type Asked = { readonly tokening: Tokening } | { readonly refused: string }

export type Still = {
  readonly path: string
  readonly lines: readonly number[]
}

export type Binding = {
  readonly changes: ReadonlyMap<string, string>
  readonly still: readonly Still[]
}

export type Made = { readonly binding: Binding } | { readonly refused: string }

export type Over = {
  readonly typed: readonly string[]
  readonly every: readonly string[]
  readonly inStrings?: boolean
}

type Target = { readonly nodes: ReadonlySet<ts.Node>; readonly key: boolean }

type Picked = Target | { readonly refused: string }

export function tokeningFor(path: string, from: string, to: string, line?: string): Asked {
  if (!typed(path)) return { refused: `\`${path}\` names no TypeScript body` }
  if (!NAME.test(from)) return { refused: `\`${from}\` is no name a body carries` }
  if (!NAME.test(to)) return { refused: `\`${to}\` is no name a body carries` }
  if (from === to) {
    return {
      refused: `\`${from}\` is already the name it would become, so there is nothing to rename`,
    }
  }
  if (line !== undefined && !COUNT.test(line)) {
    return { refused: `${LINE} takes the line a declaration starts on, and \`${line}\` is none` }
  }
  const at = line === undefined ? undefined : Number(line)
  return { tokening: { path, was: from, now: to, line: at } }
}

function namedIn(typing: Typing, path: string, name: string): ReadonlySet<ts.Node> {
  return new Set<ts.Node>([
    ...exportsNamed(typing, path, name),
    ...declaredNamed(typing, path, name),
  ])
}

function pickingIn(typing: Typing, one: Tokening, found: ReadonlySet<ts.Node>): string {
  const lines = new Set<number>()
  for (const node of found) {
    const line = declaredOn(typing, one.path, node)
    if (line !== null) lines.add(line)
  }
  const said = [...lines].sort((here, there) => here - there).join(" or ")
  return `say ${LINE} with ${said}`
}

function onLine(typing: Typing, one: Tokening, found: ReadonlySet<ts.Node>, key: boolean): Picked {
  const at = new Set<ts.Node>()
  for (const node of found) {
    if (declaredOn(typing, one.path, node) === one.line) at.add(node)
  }
  if (at.size > 0) return { nodes: at, key }
  return {
    refused:
      `${one.path} declares no \`${one.was}\` on line ${one.line} — ` +
      pickingIn(typing, one, found),
  }
}

function oneOf(typing: Typing, one: Tokening, found: ReadonlySet<ts.Node>, key: boolean): Picked {
  if (one.line !== undefined) return onLine(typing, one, found, key)
  if (key || found.size < 2) return { nodes: found, key }
  return {
    refused:
      `${one.path} carries \`${one.was}\` in more than one place, so which one to rename is ` +
      `unsaid — ${pickingIn(typing, one, found)}`,
  }
}

function reaching(found: readonly ts.Node[], held: ReadonlySet<ts.Node>): boolean {
  for (const one of found) {
    if (held.has(one)) return true
  }
  return false
}

function weldedTo(
  typing: Typing,
  one: Tokening,
  named: ReadonlySet<ts.Node>,
  keyed: ReadonlySet<ts.Node>
): boolean {
  let welds = false
  for (const keying of keyingsIn(typing, one.path, one.was)) {
    if (keying.declares) continue
    if (!keying.shorthand) {
      if (!reaching(keying.keys, keyed)) return false
      continue
    }
    if (keying.names.length === 0) return false
    for (const at of keying.names) if (!named.has(at)) return false
    welds = true
  }
  return welds
}

function bothOf(
  typing: Typing,
  one: Tokening,
  named: ReadonlySet<ts.Node>,
  keyed: ReadonlySet<ts.Node>
): Picked {
  if (!weldedTo(typing, one, named, keyed)) {
    return {
      refused: `${one.path} carries \`${one.was}\` as a name and as a key, so which one to rename is unsaid`,
    }
  }
  const every = new Set<ts.Node>([...named, ...keyed])
  if (one.line === undefined) return { nodes: every, key: false }
  const at = onLine(typing, one, every, false)
  return "refused" in at ? at : { nodes: every, key: false }
}

function targetFor(typing: Typing, one: Tokening): Picked {
  const named = namedIn(typing, one.path, one.was)
  const keyed = new Set<ts.Node>(declarationsNamed(typing, one.path, one.was))
  if (named.size > 0 && keyed.size > 0) return bothOf(typing, one, named, keyed)
  if (named.size > 0) return oneOf(typing, one, named, false)
  if (keyed.size > 0) return oneOf(typing, one, keyed, true)
  return { refused: `${one.path} carries no \`${one.was}\`` }
}

function carriesAlready(typing: Typing, path: string, name: string): boolean {
  if (namedIn(typing, path, name).size > 0) return true
  return declarationsNamed(typing, path, name).length > 0
}

function reachesInto(
  typing: Typing,
  at: ts.Node,
  name: string,
  held: ReadonlySet<ts.Node>
): boolean {
  for (const one of reachedFrom(typing, at, name)) {
    if (held.has(one)) return true
  }
  return false
}

function ownReaching(typing: Typing, path: string, at: ts.Node, name: string): boolean {
  const source = typing.sourceAt(path)
  if (source === null) return false
  for (const held of reachedFrom(typing, at, name)) {
    if (held.getSourceFile() === source) return true
  }
  return false
}

function carriedAround(typing: Typing, one: Tokening, target: Target): boolean {
  if (declarationsNamed(typing, one.path, one.now).length > 0) return true
  if (target.key) return namedIn(typing, one.path, one.now).size > 0
  for (const at of target.nodes) {
    if (ownReaching(typing, one.path, at, one.now)) return true
  }
  for (const held of namedIn(typing, one.path, one.now)) {
    if (reachesInto(typing, held, one.was, target.nodes)) return true
  }
  return false
}

function weldedIn(typing: Typing, one: Tokening): boolean {
  if (namedIn(typing, one.path, one.was).size === 0) return false
  return declarationsNamed(typing, one.path, one.was).length > 0
}

function placesFor(
  typing: Typing,
  root: string,
  target: Target,
  welded: boolean
): readonly Naming[] {
  if (welded) {
    return [...namingOf(typing, root, target.nodes), ...referencesOf(typing, root, target.nodes)]
  }
  if (target.key) return namingOf(typing, root, target.nodes)
  return referencesOf(typing, root, target.nodes)
}

function saidFor(found: Naming, one: Tokening, welded: boolean, key: boolean): string {
  if (welded) return found.quoted ? JSON.stringify(one.now) : one.now
  return key ? spelledAs(found, one.was, one.now) : boundAs(found, one.was, one.now)
}

export function bindingFor(
  root: string,
  over: Over,
  one: Tokening,
  textOf: (path: string) => string | null
): Made {
  const typing = typingOver(root, over.typed, readingOf(root, textOf))
  const target = targetFor(typing, one)
  if ("refused" in target) return { refused: target.refused }
  if (carriedAround(typing, one, target)) {
    return { refused: `${one.path} already carries \`${one.now}\`` }
  }
  const welded = weldedIn(typing, one)
  const held = new Map<string, (readonly [Spot, string])[]>()
  const seen = new Set<string>()
  for (const found of placesFor(typing, root, target, welded)) {
    const spot = `${found.path}:${found.start}`
    if (seen.has(spot)) continue
    seen.add(spot)
    const said = saidFor(found, one, welded, target.key)
    const at = held.get(found.path) ?? []
    at.push([{ start: found.start, end: found.end }, said])
    held.set(found.path, at)
  }
  for (const path of [...held.keys()].sort()) {
    if (path !== one.path && carriesAlready(typing, path, one.now)) {
      return { refused: `${path} names \`${one.was}\` and already carries \`${one.now}\`` }
    }
  }
  const changes = new Map<string, string>()
  for (const [path, spots] of held) {
    const text = textOf(path)
    if (text === null) {
      return { refused: `${path} names \`${one.was}\` and its body could not be read` }
    }
    changes.set(path, splicedIn(text, spots))
  }
  if (over.inStrings === true) {
    for (const path of over.every) {
      const text = changes.get(path) ?? textOf(path)
      if (text === null) continue
      const next = nameRespelled(path, text, one.was, one.now)
      if (next !== null) changes.set(path, next)
    }
  }
  const still: Still[] = []
  for (const path of over.every) {
    const text = changes.get(path) ?? textOf(path)
    if (text === null) continue
    const lines = namesStill(text, one.was)
    if (lines.length > 0) still.push({ path, lines })
  }
  return {
    binding: {
      changes,
      still: still.sort((here, there) => (here.path < there.path ? -1 : 1)),
    },
  }
}

export function tokenSaying(one: Tokening, made: Binding, dry: boolean): readonly string[] {
  const paths = [...made.changes.keys()].sort()
  const left = made.still.flatMap((held) => held.lines.map((line) => `  ${held.path}:${line}`))
  return [
    `\`${one.was}\` ${dry ? "would be renamed" : "was renamed"} to \`${one.now}\`, ` +
      `and ${one.path} carries it${one.line === undefined ? "" : ` on line ${one.line}`}`,
    `${counted(paths.length, "file")} ${were(paths.length, dry)} respelled`,
    ...(dry ? paths.map((path) => `  ${path}`) : []),
    left.length === 0
      ? "nothing else still names it"
      : `${counted(left.length, "place")} still naming it stand unchanged`,
    ...left.slice(0, LEFT),
    ...(left.length > LEFT ? [`  and ${left.length - LEFT} more`] : []),
  ]
}
