import {
  boundAs,
  exportsNamed,
  readingOf,
  referencesOf,
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

export function bindingFor(
  root: string,
  paths: readonly string[],
  one: Tokening,
  textOf: (path: string) => string | null
): Made {
  const typing = typingOver(root, paths, readingOf(root, textOf))
  const declared = new Set(exportsNamed(typing, one.path, one.was))
  if (declared.size === 0) return { refused: `${one.path} exports no \`${one.was}\`` }
  if (exportsNamed(typing, one.path, one.now).length > 0) {
    return { refused: `${one.path} already exports \`${one.now}\`` }
  }
  const held = new Map<string, (readonly [Spot, string])[]>()
  for (const found of referencesOf(typing, root, declared)) {
    const at = held.get(found.path) ?? []
    at.push([{ start: found.start, end: found.end }, boundAs(found, one.was, one.now)])
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
  for (const path of paths) {
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
      `and ${one.path} exports it`,
    `${counted(paths.length, "file")} ${were(paths.length, dry)} respelled`,
    ...(dry ? paths.map((path) => `  ${path}`) : []),
    left.length === 0
      ? "nothing else still names it"
      : `${counted(left.length, "place")} still naming it stand unchanged`,
    ...left.slice(0, LEFT),
    ...(left.length > LEFT ? [`  and ${left.length - LEFT} more`] : []),
  ]
}
