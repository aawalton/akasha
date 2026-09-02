import type { Naming, Typing } from "@akasha/code-system/code-typing"
import {
  compiled,
  declarationsNamed,
  namingOf,
  readingOf,
  spelledAs,
  typingOver,
} from "@akasha/code-system/code-typing"
import { everyPath, listedAt, schemaOf } from "@akasha/indexes"
import { pageTypesIn } from "@akasha/indexes/entries"
import { carryingOf, declaringOf } from "@akasha/indexes/property-carrying"
import type { Reading } from "@akasha/indexes/shape"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { pageNamed } from "@akasha/pages-system/page-file-name"
import type ts from "typescript"
import { kebabOff, restated, splicedIn } from "../type-renaming/type-renaming.module.code.ts"

const KEY = "propertySlug"

export type Keying = {
  readonly id: string
  readonly path: string
  readonly named: string
  readonly was: string
  readonly now: string
  readonly wasKey: string
  readonly nowKey: string
}

export type Asked = { readonly keying: Keying } | { readonly refused: string }

export type Respelling = {
  readonly changes: ReadonlyMap<string, string>
  readonly declarers: readonly string[]
  readonly pages: readonly string[]
}

export type Made = { readonly respelling: Respelling } | { readonly refused: string }

export function keyingFor(given: string | Reading, from: string, to: string): Asked {
  const why = kebabOff(to, "the key it becomes")
  if (why !== null) return { refused: why }
  const filed = schemaOf(given, from)
  if ("refused" in filed) return { refused: filed.refused }
  const { pageTypeSlug, slug, propertySlug } = filed.schema
  if (slug === null || propertySlug === null) {
    return { refused: `\`${from}\` reaches no page property stating a key` }
  }
  if (propertySlug === to) {
    return {
      refused: `\`${from}\` already carries the key \`${to}\`, so there is nothing to rename`,
    }
  }
  const listed = listedAt(given, pageTypeSlug, slug)[0]
  if (listed === undefined) {
    return { refused: `no page property stands at \`${pageTypeSlug}/${slug}\`` }
  }
  return {
    keying: {
      id: listed.id,
      path: listed.path,
      named: `${pageTypeSlug}/${slug}`,
      was: propertySlug,
      now: to,
      wasKey: exportedAs(propertySlug),
      nowKey: exportedAs(to),
    },
  }
}

function declaredIn(
  typing: Typing,
  given: string | Reading,
  one: Keying
): { readonly nodes: ReadonlySet<ts.Node>; readonly paths: readonly string[] } {
  const nodes = new Set<ts.Node>()
  const paths: string[] = []
  for (const held of declaringOf(given, one.id)) {
    const found = declarationsNamed(typing, held.path, one.wasKey)
    if (found.length === 0) continue
    paths.push(held.path)
    for (const node of found) nodes.add(node)
  }
  return { nodes, paths: paths.sort() }
}

function strayIn(
  naming: readonly Naming[],
  one: Keying,
  carrying: ReadonlySet<string>,
  declarers: ReadonlySet<string>,
  pageTypes: ReadonlySet<string>
): string | null {
  for (const held of naming) {
    if (held.path === one.path || declarers.has(held.path)) continue
    if (!pageNamed(held.path, pageTypes) || carrying.has(held.path)) continue
    return (
      `${held.path} states the key \`${one.wasKey}\`, and the index does not name it among ` +
      `the pages carrying \`${one.named}\` — the rename is not judged against a settled index`
    )
  }
  return null
}

function respelledIn(text: string, naming: readonly Naming[], one: Keying): string {
  return splicedIn(
    text,
    naming.map(
      (held) =>
        [{ start: held.start, end: held.end }, spelledAs(held, one.wasKey, one.nowKey)] as const
    )
  )
}

export function respellingFor(
  root: string,
  given: Reading,
  one: Keying,
  textOf: (path: string) => string | null
): Made {
  const roots = everyPath(given).filter(compiled)
  const typing = typingOver(root, roots, readingOf(root, textOf))
  const declared = declaredIn(typing, given, one)
  if (declared.nodes.size === 0) {
    return { refused: `no type declares \`${one.named}\` at the key \`${one.wasKey}\`` }
  }
  const carried = carryingOf(given, one.named)
  if ("refused" in carried) return { refused: carried.refused }
  const carrying = new Set(carried.carrying.map((held) => held.path))
  const naming = namingOf(typing, root, declared.nodes)
  const declarers = new Set(declared.paths)
  const pageTypes = pageTypesIn(given)
  const stray = strayIn(naming, one, carrying, declarers, pageTypes)
  if (stray !== null) return { refused: stray }
  const held = new Map<string, Naming[]>()
  for (const found of naming) {
    const at = held.get(found.path) ?? []
    at.push(found)
    held.set(found.path, at)
  }
  const changes = new Map<string, string>()
  for (const [path, found] of held) {
    const text = textOf(path)
    if (text === null) return { refused: `${path} states the key and its body could not be read` }
    changes.set(path, respelledIn(text, found, one))
  }
  const own = changes.get(one.path) ?? textOf(one.path)
  if (own === null) {
    return { refused: `${one.path} carries the key and its body could not be read` }
  }
  const stated = restated(one.path, own, new Map([[KEY, one.now]]))
  if (stated === null) {
    return { refused: `${one.path} states no \`${KEY}\`, so the key it carries is unnamed` }
  }
  changes.set(one.path, stated)
  return {
    respelling: {
      changes,
      declarers: declared.paths,
      pages: [...held.keys()].filter((path) => carrying.has(path)).sort(),
    },
  }
}
