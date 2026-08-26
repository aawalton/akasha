import { existsSync, readdirSync } from "node:fs"
import type { PageAt } from "../../page.ts"
import { pageNameOf } from "../../name/name.ts"
import type { Source } from "../entry/entry.ts"
import {
  ID_WORD,
  NAME_WORD,
  type Resolve,
  SEQ_WORD,
  SLUG_WORD,
  addressIn,
  wordOf,
} from "../identity/identity.ts"
import { fileFor, relationsRoot } from "../place/place.ts"
import { pagesNamed, sourcesAt } from "../store/store.ts"

export function sourcesFor(relation: string, to: PageAt): readonly Source[] {
  return sourcesAt(relation, to.stem, to.type)
}

export function relationsHere(): readonly string[] {
  const at = relationsRoot()
  if (!existsSync(at)) return []
  return readdirSync(at, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => one.name)
    .sort()
}

export function pointingAt(to: PageAt): ReadonlyMap<string, readonly Source[]> {
  const found = new Map<string, readonly Source[]>()
  for (const relation of relationsHere()) {
    if (!existsSync(fileFor(relation, to.stem, to.type))) continue
    const sources = sourcesAt(relation, to.stem, to.type)
    if (sources.length > 0) found.set(relation, sources)
  }
  return found
}

function pageOf(source: Source | undefined): PageAt | null {
  if (source === undefined) return null
  const named = pageNameOf(source.key)
  if (named === null) return null
  return { repo: source.repo, key: source.key, stem: named.stem, type: named.type }
}

function theOne(word: string, at: string): PageAt | null {
  const found = pagesNamed(word, at)
  if (found.length !== 1) return null
  return pageOf(found[0])
}

export const pageWith: Resolve = (kind, type, value) => {
  const word = wordOf(kind)
  if (word === null) return null
  if (word === ID_WORD) return theOne(ID_WORD, value)
  const at = addressIn(type, value)
  if (at === null) return null
  if (word === NAME_WORD || word === SEQ_WORD) return theOne(word, at)
  return theOne(SLUG_WORD, at) ?? theOne(NAME_WORD, at)
}
