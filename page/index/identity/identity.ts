import { linkTargetsFrom } from "../link/link.ts"
import type { Frontmatter } from "../../frontmatter.ts"
import type { PageAt, Roots } from "../../page.ts"
import { pagesIn } from "../../tracked/tracked.ts"
import { blockOf, NONE, stringAt, textAt } from "../../text/text.ts"

export const BY_ID = "relation-id"

export const BY_SLUG = "relation-slug"

export const BY_NAME = "relation-name"

export const BY_SEQ = "relation-seq"

export const BY_ADDRESS = "relation-address"

export const BY_FILE = "file"

export const ID_WORD = "id"

export const SLUG_WORD = "slug"

export const NAME_WORD = "name"

export const SEQ_WORD = "seq"

export const EXTENSION_WORD = "extension"

export const ENDING_WORD = "ending"

export const HEADING_WORD = "heading"


const KINDS: readonly string[] = [BY_ADDRESS, BY_SLUG, BY_NAME, BY_SEQ, BY_ID, BY_FILE]

const WORD_OF: Readonly<Record<string, string>> = {
  [BY_ID]: ID_WORD,
  [BY_SLUG]: SLUG_WORD,
  [BY_NAME]: NAME_WORD,
  [BY_SEQ]: SEQ_WORD,
  [BY_ADDRESS]: SLUG_WORD,
}

const ADDRESS_JOIN = "/"

const ID = "id"

const SLUG = "slug"

const SEQ = "seq"

const EXTENSION = "extension"

const ENDING = "ending"

const HEADING = "heading"

export function kindOf(stated: string): string | null {
  for (const one of KINDS) {
    if (stated.includes(one)) return one
  }
  return null
}

export function wordOf(kind: string): string | null {
  return WORD_OF[kind] ?? null
}

export type Held = PageAt & {
  readonly fm: Frontmatter
  readonly links: readonly string[]
}

export type Stated = PageAt & {
  readonly id: string | null
  readonly slug: string | null
  readonly seq: string | null
  readonly extension: string | null
  readonly ending: string | null
  readonly heading: string | null
}

export type Handle = {
  readonly word: string
  readonly at: string
}

export type Resolve = (kind: string, type: string | null, value: string) => PageAt | null

export type Identity = {
  readonly pages: readonly Held[]
  readonly at: Resolve
}

function stands(value: string | null): value is string {
  return value !== null && value !== "" && value !== NONE
}

export function addressIn(type: string | null, value: string): string | null {
  let named = type
  let tail = value
  const cut = value.indexOf(ADDRESS_JOIN)
  if (cut > 0 && !value.slice(cut + 1).includes(ADDRESS_JOIN)) {
    named = value.slice(0, cut)
    tail = value.slice(cut + 1)
  }
  if (named === null) return null
  return `${named}${ADDRESS_JOIN}${tail}`
}

export function handlesOf(one: Stated): readonly Handle[] {
  const found: Handle[] = []
  if (stands(one.id)) found.push({ word: ID_WORD, at: one.id })
  found.push({ word: SLUG_WORD, at: `${one.type}${ADDRESS_JOIN}${one.slug ?? one.stem}` })
  found.push({ word: NAME_WORD, at: `${one.type}${ADDRESS_JOIN}${one.stem}` })
  if (stands(one.seq)) found.push({ word: SEQ_WORD, at: `${one.type}${ADDRESS_JOIN}${one.seq}` })
  if (stands(one.extension)) found.push({ word: EXTENSION_WORD, at: one.extension })
  if (stands(one.ending)) found.push({ word: ENDING_WORD, at: one.ending })
  if (stands(one.heading)) found.push({ word: HEADING_WORD, at: one.heading })
  return found
}

function oneOf(found: readonly PageAt[] | undefined): PageAt | null {
  if (found === undefined || found.length !== 1) return null
  return found[0] ?? null
}

export function heldAt(
  repo: string,
  root: string,
  key: string,
  stem: string,
  type: string
): Held | null {
  const text = textAt(root, key)
  if (text === null) return null
  const { fm, why } = blockOf(text)
  if (why !== null) return null
  return { repo, key, stem, type, fm, links: linkTargetsFrom(repo, key, text) }
}

export function statedOf(at: PageAt & { readonly fm: Frontmatter }): Stated {
  return {
    repo: at.repo,
    key: at.key,
    stem: at.stem,
    type: at.type,
    id: stringAt(at.fm, ID),
    slug: stringAt(at.fm, SLUG),
    seq: stringAt(at.fm, SEQ),
    extension: stringAt(at.fm, EXTENSION),
    ending: stringAt(at.fm, ENDING),
    heading: stringAt(at.fm, HEADING),
  }
}

export function resolveOver(stated: Iterable<Stated>): Resolve {
  const under = new Map<string, PageAt[]>()
  for (const one of stated) {
    const at: PageAt = { repo: one.repo, key: one.key, stem: one.stem, type: one.type }
    for (const handle of handlesOf(one)) {
      const where = `${handle.word}${ADDRESS_JOIN}${handle.at}`
      const found = under.get(where)
      if (found === undefined) under.set(where, [at])
      else found.push(at)
    }
  }
  const held = (word: string, at: string): PageAt | null =>
    oneOf(under.get(`${word}${ADDRESS_JOIN}${at}`))
  return (kind, type, value) => {
    const word = wordOf(kind)
    if (word === null) return null
    if (word === ID_WORD) return held(ID_WORD, value)
    const at = addressIn(type, value)
    if (at === null) return null
    if (word === NAME_WORD || word === SEQ_WORD) return held(word, at)
    return held(SLUG_WORD, at) ?? held(NAME_WORD, at)
  }
}

export function identityOver(roots: Roots): Identity {
  const pages: Held[] = []
  for (const [repo, root] of Object.entries(roots)) {
    if (root === undefined) continue
    for (const page of pagesIn(root)) {
      const at = heldAt(repo, root, page.key, page.stem, page.type)
      if (at === null) continue
      pages.push(at)
    }
  }
  return { pages, at: resolveOver(pages.map(statedOf)) }
}
