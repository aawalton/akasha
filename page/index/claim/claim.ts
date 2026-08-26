import { pageNameOf } from "../../name/name.ts"
import type { PageAt } from "../../page.ts"
import { stringAt } from "../../text/text.ts"
import type { Held } from "../identity/identity.ts"

export const EXTENSION = "extension"

export const ENDING = "ending"

export const HEADING = "heading"

export const PATH = "path"

export const CLAIM_WORDS: readonly string[] = [EXTENSION, ENDING, HEADING, PATH]

const STATED: Readonly<Record<string, string>> = {
  [EXTENSION]: "extension",
  [ENDING]: "ending",
  [HEADING]: "heading",
}

const TYPE_KEY = "type"

const KEY_KEY = "key"

const FILE_TYPE = "file"

const INSTRUCTIONS = "instructions"

const MARK = ":"

const REPO_MARK = /^([a-z][a-z0-9-]*):(\S)/

export type Claimed = Readonly<Record<string, readonly string[]>>

export type Claims = {
  readonly keys: readonly string[]
  readonly words: Readonly<Record<string, Claimed>>
}

export type Claim = {
  readonly word: string
  readonly at: string
}

export function noClaims(): Claims {
  const words: Record<string, Claimed> = {}
  for (const word of CLAIM_WORDS) words[word] = {}
  return { keys: [], words }
}

export function fileKeysOf(pages: Iterable<Held>): readonly string[] {
  const found = new Set<string>()
  for (const one of pages) {
    if (stringAt(one.fm, TYPE_KEY) !== FILE_TYPE) continue
    const key = stringAt(one.fm, KEY_KEY)
    if (key !== null) found.add(key)
  }
  return [...found].sort()
}

export function claimedAt(stated: string): string {
  const marked = REPO_MARK.exec(stated)
  if (marked === null) return `${INSTRUCTIONS}${MARK}${stated}`
  const repo = marked[1] as string
  return `${repo}${MARK}${stated.slice(repo.length + 1)}`
}

export function claimsOf(one: Held, keys: readonly string[]): readonly Claim[] {
  const found: Claim[] = []
  for (const word of [EXTENSION, ENDING, HEADING]) {
    const key = STATED[word]
    if (key === undefined) continue
    const value = stringAt(one.fm, key)
    if (value !== null) found.push({ word, at: value })
  }
  for (const key of keys) {
    const stated = stringAt(one.fm, key)
    if (stated !== null) found.push({ word: PATH, at: claimedAt(stated) })
  }
  return found
}

export function saidOf(one: { readonly repo: string; readonly key: string }): string {
  return `${one.repo}${MARK}${one.key}`
}

function keyOf(said: string): string {
  const cut = said.indexOf(MARK)
  return cut === -1 ? said : said.slice(cut + 1)
}

export function pageOfSaid(said: string): PageAt | null {
  const cut = said.indexOf(MARK)
  if (cut <= 0) return null
  const key = said.slice(cut + 1)
  const named = pageNameOf(key)
  if (named === null) return null
  return { repo: said.slice(0, cut), key, stem: named.stem, type: named.type }
}

export function claimantIn(claims: Claims, word: string, at: string): PageAt | null {
  const under = claims.words[word]
  if (under === undefined) return null
  const held = under[at]
  if (held === undefined || held.length === 0) return null
  let best = held[0] as string
  for (const one of held) {
    if (keyOf(one) > keyOf(best)) best = one
  }
  return pageOfSaid(best)
}

export function claimedUnder(claims: Claims, word: string): readonly string[] {
  return Object.keys(claims.words[word] ?? {}).sort()
}

export function claimsOver(pages: Iterable<Held>): Claims {
  const held = [...pages]
  const keys = fileKeysOf(held)
  const words: Record<string, Record<string, string[]>> = {}
  for (const word of CLAIM_WORDS) words[word] = {}
  for (const one of held) {
    for (const claim of claimsOf(one, keys)) {
      const under = words[claim.word]
      if (under === undefined) continue
      const standing = under[claim.at] ?? []
      standing.push(saidOf(one))
      under[claim.at] = standing
    }
  }
  const made: Record<string, Claimed> = {}
  for (const [word, under] of Object.entries(words)) {
    const settled: Record<string, readonly string[]> = {}
    for (const [at, standing] of Object.entries(under)) settled[at] = [...new Set(standing)].sort()
    made[word] = settled
  }
  return { keys, words: made }
}

export function claimsWithin(claims: Claims, within: ReadonlySet<string>): Claims {
  const words: Record<string, Claimed> = {}
  for (const word of CLAIM_WORDS) {
    const under = claims.words[word] ?? {}
    const settled: Record<string, readonly string[]> = {}
    for (const [at, held] of Object.entries(under)) {
      const kept = held.filter((one) => within.has(one.slice(0, one.indexOf(MARK))))
      if (kept.length > 0) settled[at] = kept
    }
    words[word] = settled
  }
  return { keys: claims.keys, words }
}

export function claimsWith(
  claims: Claims,
  said: string,
  made: readonly Claim[]
): Claims {
  const words: Record<string, Record<string, readonly string[]>> = {}
  for (const word of CLAIM_WORDS) {
    const under = claims.words[word] ?? {}
    const settled: Record<string, readonly string[]> = {}
    for (const [at, standing] of Object.entries(under)) {
      const without = standing.filter((one) => one !== said)
      if (without.length > 0) settled[at] = without
    }
    words[word] = settled
  }
  for (const claim of made) {
    const under = words[claim.word]
    if (under === undefined) continue
    under[claim.at] = [...new Set([...(under[claim.at] ?? []), said])].sort()
  }
  return { keys: claims.keys, words }
}
