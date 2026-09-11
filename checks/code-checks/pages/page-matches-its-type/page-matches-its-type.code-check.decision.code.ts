import { entryReasonsIn } from "akasha/checks/code-checks/pages/page-matches-its-type/modules/entry-reasons/entry-reasons.module.code.ts"
import { reasonsIn } from "akasha/checks/code-checks/pages/page-matches-its-type/modules/page-reasons/page-reasons.module.code.ts"
import type { Body } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import { bodyOf, textIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { waitingProperties } from "akasha/pages/indexes/generated-properties/generated-properties.module.code.ts"
import { matchingIn } from "akasha/pages/name-formats/modules/format-reaching/format-reaching.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { loadedFrom } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "page-type"

const NOTHING: ReadonlySet<string> = new Set()

export const DECLARES_NO_PAGE =
  "is named as a page and its body declares no page, so what it carries could not be judged"

export const STATES_NO_PAGE_TYPE =
  "states no `page-type-slug`, and what a page carries is read from the page type it states"

export function unloadable(why: string | null): string {
  if (why === null) return DECLARES_NO_PAGE
  return `is named as a page and its body would not load, so what it carries could not be judged — ${why}`
}

function pagesHeldOver(shadow: Shadow): Shadow {
  const held = new Map<string, Value | null>()
  const pageAt = (pageTypeSlug: string, slug: string): Value | null => {
    const at = `${pageTypeSlug}/${slug}`
    const found = held.get(at)
    if (found !== undefined) return found
    const made = shadow.index.pageAt(pageTypeSlug, slug)
    held.set(at, made)
    return made
  }
  return { ...shadow, index: { ...shadow.index, pageAt } }
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const over = pagesHeldOver(shadow)
  const pageTypes = over.index.pageTypesIn()
  let generated: ReadonlySet<string> | null = null
  const generatedNow = (): ReadonlySet<string> => {
    if (generated !== null) return generated
    generated = waitingProperties(over)
    return generated
  }
  const held = new Map<string, readonly Carried[]>()
  const carriedBy = (pageTypeSlug: string): readonly Carried[] => {
    const found = held.get(pageTypeSlug)
    if (found !== undefined) return found
    const said = over.index.propertiesIfNamed(pageTypeSlug) ?? []
    held.set(pageTypeSlug, said)
    return said
  }
  const formatting = matchingIn(change.root, over.index, over.codeAt)
  const judged: Judged[] = []
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const bytes = change.after(path)
    if (bytes === null) continue
    const given: Body = { root: change.root, path, bytes }
    const loaded = loadedFrom(bodyOf(given))
    const value = loaded.value
    if (value === null) {
      judged.push({ path, reason: unloadable(loaded.failed) })
      continue
    }
    const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
    if (pageTypeSlug === null) {
      judged.push({ path, reason: STATES_NO_PAGE_TYPE })
      continue
    }
    const declared = carriedBy(pageTypeSlug)
    if (declared.length === 0) continue
    const named = `${PAGE_TYPE}/${pageTypeSlug}`
    const excused = change.before(path) !== null ? NOTHING : generatedNow()
    for (const reason of reasonsIn(value, declared, over, named, formatting, excused)) {
      judged.push({ path, reason })
    }
    const beside = (at: string): string | null => textIn(change, at)
    for (const reason of entryReasonsIn(value, declared, over, path, beside, formatting)) {
      judged.push({ path, reason })
    }
  }
  return judged
}
