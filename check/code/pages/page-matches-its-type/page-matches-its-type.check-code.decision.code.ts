import { entryReasonsIn } from "akasha/check/code/pages/page-matches-its-type/modules/entry-reasons/entry-reasons.module.code.ts"
import { reasonsIn } from "akasha/check/code/pages/page-matches-its-type/modules/page-reasons/page-reasons.module.code.ts"
import type { Commit, Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  pageOfRow,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { waitingProperties } from "akasha/page/index/modules/generated-properties/generated-properties.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Formatting,
  matchingIn,
} from "akasha/page/name-format/modules/format-reaching/format-reaching.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const PAGE_TYPE = "page-type"

const NOTHING: ReadonlySet<string> = new Set()

export const STATES_NO_PAGE_TYPE =
  "states no `page-type-slug`, and what a page carries is read from the page type it states"

function pagesHeldOver(index: Answering): Answering {
  const held = new Map<string, Value | null>()
  const pageAt = (pageTypeSlug: string, slug: string): Value | null => {
    const at = `${pageTypeSlug}/${slug}`
    const found = held.get(at)
    if (found !== undefined) return found
    const made = index.pageAt(pageTypeSlug, slug)
    held.set(at, made)
    return made
  }
  return { ...index, pageAt }
}

function carryingIn(index: Answering): (pageTypeSlug: string) => readonly Carried[] {
  const held = new Map<string, readonly Carried[]>()
  return (pageTypeSlug) => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const said = index.propertiesIfNamed(pageTypeSlug) ?? []
    held.set(pageTypeSlug, said)
    return said
  }
}

type Judging = {
  readonly over: Paged
  readonly carriedBy: (pageTypeSlug: string) => readonly Carried[]
  readonly formatting: Formatting
  readonly beside: (at: string) => string | null
}

function reasonsAt(
  judging: Judging,
  path: string,
  text: string,
  excused: ReadonlySet<string>
): readonly string[] {
  const { over, carriedBy, formatting, beside } = judging
  const value = valueIn(text)
  if (value === null) return []
  const pageTypeSlug = slugAt(value, "type") ?? slugAt(value, "pageTypeSlug")
  if (pageTypeSlug === null) return [STATES_NO_PAGE_TYPE]
  const declared = carriedBy(pageTypeSlug)
  if (declared.length === 0) return []
  const named = `${PAGE_TYPE}/${pageTypeSlug}`
  return [
    ...reasonsIn(value, declared, over, named, formatting, excused),
    ...entryReasonsIn(value, declared, over, path, beside, formatting),
  ]
}

export function refusalsIn(commit: Commit): readonly Judged[] {
  const over: Paged = { ...commit, index: pagesHeldOver(commit.index) }
  const pageTypes = over.index.pageTypesIn()
  const judging: Judging = {
    over,
    carriedBy: carryingIn(over.index),
    formatting: matchingIn(commit.root, over.index),
    beside: commit.read,
  }
  const judged: Judged[] = []
  for (const path of commit.paths) {
    if (!pageNamed(path, pageTypes)) continue
    const text = commit.read(path)
    if (text === null) continue
    for (const reason of reasonsAt(judging, path, text, NOTHING)) judged.push({ path, reason })
  }
  return judged
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const over: Shadow = { ...shadow, index: pagesHeldOver(shadow.index) }
  const pageTypes = over.index.pageTypesIn()
  let generated: ReadonlySet<string> | null = null
  const generatedNow = (): ReadonlySet<string> => {
    if (generated !== null) return generated
    generated = waitingProperties(over)
    return generated
  }
  const judging: Judging = {
    over,
    carriedBy: carryingIn(over.index),
    formatting: matchingIn(change.root, over.index, over.codeAt),
    beside: (at) => textIn(change, at),
  }
  const judged: Judged[] = []
  const walked = new Set<string>()
  for (const one of change.changed) {
    const path = pageNamed(one, pageTypes) ? one : pageOfRow(one, over)
    if (path === null || walked.has(path)) continue
    walked.add(path)
    const text = textIn(change, path)
    if (text === null) continue
    const excused = change.before(path) !== null ? NOTHING : generatedNow()
    for (const reason of reasonsAt(judging, path, text, excused)) judged.push({ path, reason })
  }
  return judged
}
