import type ts from "typescript"
import {
  boundAs,
  declarationsNamed,
  declaredNamed,
  exportsNamed,
  namingOf,
  readingOf,
  referencesOf,
  spelledAs,
  type Typing,
  typingOver,
} from "../../../../code-system/code-typing/code-typing.module.code.ts"
import { counted } from "../../../asking/asking.module.code.ts"
import { were } from "../refactor-landing/refactor-landing.module.code.ts"
import type { Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../type-renaming/type-renaming.module.code.ts"
import { namesStill } from "../type-respelling/type-respelling.module.code.ts"

const LEFT = 12

const NAME = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const TS = ".ts"

export type Tokening = {
  readonly path: string
  readonly was: string
  readonly now: string
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
}

type Stood = { readonly nodes: ReadonlySet<ts.Node>; readonly key: boolean }

type Standing = Stood | { readonly refused: string }

export function tokeningFor(path: string, from: string, to: string): Asked {
  if (!path.endsWith(TS)) return { refused: `\`${path}\` names no TypeScript body` }
  if (!NAME.test(from)) return { refused: `\`${from}\` is no name a body carries` }
  if (!NAME.test(to)) return { refused: `\`${to}\` is no name a body carries` }
  if (from === to) {
    return {
      refused: `\`${from}\` is already the name it would become, so there is nothing to rename`,
    }
  }
  return { tokening: { path, was: from, now: to } }
}

function namedIn(typing: Typing, path: string, name: string): ReadonlySet<ts.Node> {
  return new Set<ts.Node>([
    ...exportsNamed(typing, path, name),
    ...declaredNamed(typing, path, name),
  ])
}

function standingFor(typing: Typing, one: Tokening): Standing {
  const named = namedIn(typing, one.path, one.was)
  const keyed = new Set<ts.Node>(declarationsNamed(typing, one.path, one.was))
  if (named.size > 0 && keyed.size > 0) {
    return {
      refused: `${one.path} carries \`${one.was}\` as a name and as a key, so which one to rename is unsaid`,
    }
  }
  if (named.size > 1) {
    return {
      refused: `${one.path} carries \`${one.was}\` in more than one place, so which one to rename is unsaid`,
    }
  }
  if (named.size > 0) return { nodes: named, key: false }
  if (keyed.size > 0) return { nodes: keyed, key: true }
  return { refused: `${one.path} carries no \`${one.was}\`` }
}

function takenAlready(typing: Typing, one: Tokening): boolean {
  if (namedIn(typing, one.path, one.now).size > 0) return true
  return declarationsNamed(typing, one.path, one.now).length > 0
}

export function bindingFor(
  root: string,
  over: Over,
  one: Tokening,
  textOf: (path: string) => string | null
): Made {
  const typing = typingOver(root, over.typed, readingOf(root, textOf))
  const stood = standingFor(typing, one)
  if ("refused" in stood) return { refused: stood.refused }
  if (takenAlready(typing, one)) return { refused: `${one.path} already carries \`${one.now}\`` }
  const places = stood.key
    ? namingOf(typing, root, stood.nodes)
    : referencesOf(typing, root, stood.nodes)
  const held = new Map<string, (readonly [Spot, string])[]>()
  for (const found of places) {
    const said = stood.key ? spelledAs(found, one.was, one.now) : boundAs(found, one.was, one.now)
    const at = held.get(found.path) ?? []
    at.push([{ start: found.start, end: found.end }, said])
    held.set(found.path, at)
  }
  const changes = new Map<string, string>()
  for (const [path, spots] of held) {
    const text = textOf(path)
    if (text === null) {
      return { refused: `${path} names \`${one.was}\` and its body could not be read` }
    }
    changes.set(path, splicedIn(text, spots))
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
      `and ${one.path} carries it`,
    `${counted(paths.length, "file")} ${were(paths.length, dry)} respelled`,
    ...(dry ? paths.map((path) => `  ${path}`) : []),
    left.length === 0
      ? "nothing else still names it"
      : `${counted(left.length, "place")} still naming it stand unchanged`,
    ...left.slice(0, LEFT),
    ...(left.length > LEFT ? [`  and ${left.length - LEFT} more`] : []),
  ]
}
