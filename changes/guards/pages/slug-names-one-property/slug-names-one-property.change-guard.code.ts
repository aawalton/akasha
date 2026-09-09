import { pageNamed } from "@akasha/pages/page-file-name"
import { slugOf, textAt } from "@akasha/pages/page-value"
import {
  unreadable,
  writtenIn,
} from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "../../../modules/change-guarding/change-guarding.module.types.ts"

const PAGE_PROPERTY = "page-property"

const SLUG = "slug"

const PAGE_TYPE = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

function heldBesides(
  given: Guarding,
  under: ReadonlySet<string>,
  path: string,
  kind: string,
  slug: string
): string | null {
  for (const other of under) {
    if (other === kind) continue
    for (const one of given.shadow.index.listedAt(other, slug)) {
      if (one.path === path) continue
      return (
        `\`${path}\` takes the slug \`${slug}\`, and \`${one.path}\` holds that slug ` +
        `under \`${other}\`, so one slug would name two properties`
      )
    }
  }
  return null
}

function takenAt(given: Guarding, under: ReadonlySet<string>, path: string): string | null {
  const value = given.shadow.pageOf(path)
  if (value === null) return null
  const slug = textAt(value, SLUG)
  const said = textAt(value, PAGE_TYPE) ?? textAt(value, PAGE_TYPE_SLUG)
  if (slug === null || said === null) return null
  const kind = slugOf(said)
  if (!under.has(kind)) return null
  if (given.before.index.listedAt(kind, slug).length > 0) return null
  return heldBesides(given, under, path, kind, slug)
}

export function slugNamesOneProperty(given: Guarding): string | null {
  try {
    const pageTypes = given.shadow.index.pageTypesIn()
    const under = given.shadow.index.kindsUnder(PAGE_PROPERTY)
    for (const path of writtenIn(given).keys()) {
      if (!pageNamed(path, pageTypes)) continue
      const why = takenAt(given, under, path)
      if (why !== null) return why
    }
    return null
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = slugNamesOneProperty
