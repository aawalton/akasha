import {
  type FileChange,
  refusing,
  type Said,
  spliced,
  stating,
  telling,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { statedIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

export type Asked = {
  readonly pageType: string
  readonly key: string
  readonly atMost?: number | null
}

export type Unquoted = {
  readonly path: string
  readonly text: string
}

const QUOTE = '"'

export function unquotedOf(held: unknown): string | null {
  if (typeof held !== "string" || held.length < 2) return null
  if (!held.startsWith(QUOTE) || !held.endsWith(QUOTE)) return null
  try {
    const inner: unknown = JSON.parse(held)
    return typeof inner === "string" ? inner : null
  } catch {
    return null
  }
}

export function quotedIn(world: World, given: Asked): readonly Unquoted[] | string {
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return `\`${given.pageType}\` names no page type`
  }
  const found: Unquoted[] = []
  const atMost = given.atMost ?? null
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (atMost !== null && found.length >= atMost) return found
      const text = unquotedOf(value[given.key])
      if (text === null) continue
      found.push({ path, text })
    }
  }
  return found
}

export function editsFor(world: World, key: string, one: Unquoted): readonly FileChange[] | string {
  const text = world.textOf(one.path)
  if (text === null) return `\`${one.path}\` could not be read`
  const source = parsedAs(one.path, text)
  const held = statedIn(source).get(key)
  if (held === undefined) return `\`${one.path}\` states no text under \`${key}\``
  return spliced(one.path, text, {
    from: held.getStart(source),
    to: held.getEnd(),
    put: JSON.stringify(one.text),
  })
}

export function unquoteTextOnEveryPage(world: World, given: Asked): Said {
  const held = quotedIn(world, given)
  if (typeof held === "string") return refusing(held)
  if (held.length === 0) {
    return telling(stating([]), [
      `no \`${given.pageType}\` holds quoted text under \`${given.key}\``,
    ])
  }
  const edits: FileChange[] = []
  for (const one of held) {
    const made = editsFor(world, given.key, one)
    if (typeof made === "string") return refusing(made)
    edits.push(...made)
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Said {
  return unquoteTextOnEveryPage(world, given)
}
