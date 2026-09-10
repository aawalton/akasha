import { valuesByPath } from "@akasha/indexes"
import { statesVersionSeven } from "akasha/id-minting/uuid-version-7/uuid-version-7.module.code.ts"
import { lowerUuid } from "akasha/pages/name-formats/pages/lower-uuid/lower-uuid.name-format.code.ts"
import {
  textIn,
  textsAt,
  type Value,
} from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import { RELATIONSHIP, type Row, saidEachFor } from "../session-rows/session-rows.module.code.ts"

export type RelationshipPage = {
  readonly id: string
  readonly title: string
  readonly aliases: readonly string[]
}

export type RelationshipsReading =
  | { readonly read: "relationships"; readonly ids: readonly string[] }
  | { readonly read: "refused"; readonly refusals: readonly string[] }

const RELATIONSHIP_TYPE = "relationship"

export function termOf(said: string): string {
  return said
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

export function matchedIn(title: string, pages: readonly RelationshipPage[]): readonly string[] {
  const said = termOf(title)
  if (said === "") return []
  const byTerm = new Map<string, Set<string>>()
  for (const one of pages) {
    for (const alias of one.aliases) {
      const term = termOf(alias)
      if (term === "") continue
      const held = byTerm.get(term) ?? new Set<string>()
      held.add(one.id)
      byTerm.set(term, held)
    }
  }
  const found: string[] = []
  for (const [term, ids] of byTerm) {
    if (ids.size !== 1) continue
    if (!said.includes(term)) continue
    for (const id of ids) if (!found.includes(id)) found.push(id)
  }
  return found.sort()
}

export function tokensIn(occurrences: readonly string[]): readonly string[] {
  const held: string[] = []
  for (const one of occurrences) {
    for (const part of one.split(",")) {
      const trimmed = part.trim()
      if (trimmed !== "") held.push(trimmed)
    }
  }
  return held
}

export function aliasesIn(value: Value): readonly string[] {
  return textsAt(value, "relationshipAliases") ?? []
}

export function relationshipsIn(root: string): readonly RelationshipPage[] {
  const held: RelationshipPage[] = []
  for (const value of valuesByPath(root, RELATIONSHIP_TYPE).values()) {
    const id = textIn(value, "id")
    const title = textIn(value, "title")
    if (id === null || title === null) continue
    held.push({ id, title, aliases: aliasesIn(value) })
  }
  return held
}

export function idsForTokens(
  tokens: readonly string[],
  pages: readonly RelationshipPage[]
): RelationshipsReading {
  const byTitle = new Map<string, string[]>()
  for (const one of pages) {
    const key = one.title.toLowerCase()
    const held = byTitle.get(key)
    if (held === undefined) byTitle.set(key, [one.id])
    else held.push(one.id)
  }
  const refusals: string[] = []
  const seen = new Set<string>()
  const ids: string[] = []
  for (const token of tokens) {
    let id: string | null = null
    const said = token.toLowerCase()
    if (lowerUuid(said)) {
      if (statesVersionSeven(said)) id = said
      else refusals.push(`${token} is no uuid version 7, so no relationship carries it`)
    } else {
      const found = byTitle.get(said) ?? []
      if (found.length === 0) refusals.push(`no relationship is titled ${token}`)
      else if (found.length > 1) {
        refusals.push(
          `${token} titles ${String(found.length)} relationships, so name one by its id`
        )
      } else id = found[0] ?? null
    }
    if (id === null || seen.has(id)) continue
    seen.add(id)
    ids.push(id)
  }
  if (refusals.length > 0) return { read: "refused", refusals }
  return { read: "relationships", ids }
}

export function relationshipsFor(
  argv: readonly string[],
  pages: readonly RelationshipPage[]
): RelationshipsReading | null {
  const occurrences = saidEachFor(argv, RELATIONSHIP)
  if (occurrences.length === 0) return null
  return idsForTokens(tokensIn(occurrences), pages)
}

export function carriedIn(row: Row): readonly string[] {
  const held = row.relationships
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function taggedFor(
  stated: readonly string[] | null,
  title: string,
  carried: readonly string[],
  pages: readonly RelationshipPage[]
): readonly string[] {
  const held = [...(stated ?? carried)]
  for (const id of matchedIn(title, pages)) if (!held.includes(id)) held.push(id)
  return held
}

export function taggingOf(tags: readonly string[]): { relationships?: readonly string[] } {
  return tags.length === 0 ? {} : { relationships: tags }
}
