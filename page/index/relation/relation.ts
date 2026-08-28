import { attachmentFileOf } from "../../attachment-file.ts"
import { listField } from "../../frontmatter.ts"
import { NONE, stringAt } from "../../text/text.ts"
import { BY_FILE, type Held, type Resolve, kindOf } from "../identity/identity.ts"
import { LINK_RELATION } from "../link/link.ts"
import { pageTargetOf } from "../place/place.ts"
import { pageTypeOf } from "../../../pages-system/page-type/page-type.ts"

const DEFINITION = "page-property-definition"

const ATTACHMENT = "attachment"

const PAGE_TYPE = "page-type"

const TYPE = "type"

const KEY = "key"

const DEFINED_ON = "defined-on-slug"

const TARGET = "target-slug"

const EXTENDS = "extends-slug"

const ADDRESS_JOIN = "/"

const REPO_MARK = /^([a-z][a-z0-9-]*):(\S)/

export type Relation = {
  readonly key: string
  readonly kind: string | null
  readonly target: string | null
  readonly attachment: string | null
}

export type Holds = (repo: string, key: string) => boolean

export type Reached = {
  readonly relation: string
  readonly target: string
}

export function fileTargetOf(stated: string, here: string): string {
  const marked = REPO_MARK.exec(stated)
  if (marked === null) return `${here}${ADDRESS_JOIN}${stated}`
  const repo = marked[1] as string
  return `${repo}${ADDRESS_JOIN}${stated.slice(repo.length + 1)}`
}

function tailOf(stated: string | null): string | null {
  if (stated === null || stated === NONE) return null
  const cut = stated.lastIndexOf(ADDRESS_JOIN)
  return cut < 0 ? stated : stated.slice(cut + 1)
}

function declaredOver(pages: readonly Held[]): Map<string, Relation[]> {
  const made = new Map<string, Relation[]>()
  for (const at of pages) {
    if (at.type !== DEFINITION) continue
    const kind = kindOf(stringAt(at.fm, TYPE) ?? "")
    const attachment = stringAt(at.fm, ATTACHMENT)
    if (kind === null && attachment === null) continue
    const on = tailOf(stringAt(at.fm, DEFINED_ON))
    const key = stringAt(at.fm, KEY)
    if (on === null || key === null) continue
    const held = made.get(on) ?? []
    held.push({ key, kind, target: tailOf(stringAt(at.fm, TARGET)), attachment })
    made.set(on, held)
  }
  return made
}

function aboveOver(pages: readonly Held[]): Map<string, string | null> {
  const made = new Map<string, string | null>()
  for (const at of pages) {
    if (at.type !== PAGE_TYPE) continue
    made.set(at.stem, tailOf(stringAt(at.fm, EXTENDS)))
  }
  return made
}

export function relationsOver(pages: readonly Held[]): ReadonlyMap<string, readonly Relation[]> {
  const declared = declaredOver(pages)
  const above = aboveOver(pages)
  const made = new Map<string, readonly Relation[]>()
  for (const type of above.keys()) {
    const held: Relation[] = []
    const taken = new Set<string>()
    const seen = new Set<string>()
    let walking: string | null = type
    while (walking !== null && !seen.has(walking)) {
      seen.add(walking)
      for (const one of declared.get(walking) ?? []) {
        if (taken.has(one.key)) continue
        taken.add(one.key)
        held.push(one)
      }
      walking = above.get(walking) ?? null
    }
    made.set(type, held)
  }
  return made
}

function targetOf(
  relation: Relation,
  value: string,
  resolve: Resolve,
  here: string
): string | null {
  if (relation.kind === null) return null
  if (relation.kind === BY_FILE) return fileTargetOf(value, here)
  const to = resolve(relation.kind, relation.target, value)
  return to === null ? null : pageTargetOf(to.stem, to.type)
}

export function reachedFrom(
  at: Held,
  relations: ReadonlyMap<string, readonly Relation[]>,
  resolve: Resolve,
  holds: Holds
): readonly Reached[] {
  const type = pageTypeOf(at.key)
  const found: Reached[] = []
  const seen = new Set<string>()
  for (const relation of type === null ? [] : (relations.get(type) ?? [])) {
    if (relation.attachment !== null) {
      const key = attachmentFileOf(at.key, relation.key, relation.attachment)
      if (!holds(at.repo, key)) continue
      const target = fileTargetOf(`${at.repo}:${key}`, at.repo)
      const said = `${relation.key} ${target}`
      if (seen.has(said)) continue
      seen.add(said)
      found.push({ relation: relation.key, target })
      continue
    }
    for (const value of listField(at.fm, relation.key)) {
      if (value === "" || value === NONE) continue
      const target = targetOf(relation, value, resolve, at.repo)
      if (target === null) continue
      const said = `${relation.key} ${target}`
      if (seen.has(said)) continue
      seen.add(said)
      found.push({ relation: relation.key, target })
    }
  }
  for (const target of at.links) {
    const said = `${LINK_RELATION} ${target}`
    if (seen.has(said)) continue
    seen.add(said)
    found.push({ relation: LINK_RELATION, target })
  }
  return found
}
