import {
  takenIn as closedIn,
  type Taken,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { extended } from "akasha/graph/predicate/pages/extended/extended.graph-predicate.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { answeringOver } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import {
  listedAt,
  readingIn,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  recordsIn,
  slugAt,
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { camelizeKey } from "akasha/page/naming/folding/modules/camelize-key/camelize-key.module.code.ts"
import {
  carriedFor,
  type Named,
  pagesOfType,
} from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { titleColoredBy } from "akasha/page/type/properties/title-colored-by.relation-property.ts"

const PAGE_TYPE = "page-type"

const TARGET_PAGE_TYPE = "targetPageType"

const MEMBERS = "members"

const PARTED_BY = "/"

const VALUES = "values"

const OPTION_COLORS = "optionColors"

const VERB_ID = "verbId"

const DECLARED = "properties"

const SAID = "pageProperty"

const ASKED_BY_NAME = "askedByName"

const TITLE_COLORED_BY = camelizeKey(titleColoredBy.propertySlug)

export type Declared = {
  readonly key: string
  readonly type: string
  readonly drawnBy: readonly string[]
  readonly memberDrawnBy: readonly (readonly string[])[]
  readonly fields: readonly Declared[]
  readonly title: string
  readonly pageId: string
  readonly on: string
  readonly values: unknown
  readonly optionColors: unknown

  readonly targetSlug: string | null
  readonly slugProperty: string | null
  readonly mayBeGone: boolean
  readonly verbId: string | null
  readonly colorsTitle: boolean
  readonly askedByName?: boolean
}

export type Shape = {
  readonly pageType: string
  readonly pageTypeId: string
  readonly ownerSlug: string | null
  readonly declarations: readonly Declared[]
}

export type Shaped = { readonly shape: Shape | null } | { readonly refused: string }

export type Climbing = (pageTypeSlug: string) => readonly Value[]

type Stating = Pick<Carried, "propertySlug" | "pageTypeSlug" | "required">

function nearestFirst(taken: Taken): readonly string[] {
  const held = [...taken.reached].reverse()
  return held.sort((one, two) => (taken.stepsTo.get(one) ?? 0) - (taken.stepsTo.get(two) ?? 0))
}

export function climbing(given: string | Reading): Climbing {
  const reading = readingIn(given)
  const index = answeringOver(reading, (path) => valueByPath(reading, path))
  const asked = { index, bodyAt: (path: string) => reading.read(path) }
  return (pageTypeSlug) => {
    const listed = listedAt(reading, PAGE_TYPE, pageTypeSlug)[0]
    if (listed === undefined) return []
    const found: Value[] = []
    for (const path of nearestFirst(closedIn(extended, [listed.path], asked))) {
      const one = index.valueAt(path)
      if (one !== null) found.push(one)
    }
    return found
  }
}

function drawnFor(climb: Climbing, pageTypeSlug: string): readonly string[] {
  if (pageTypeSlug === "") return []
  const found: string[] = []
  for (const one of climb(pageTypeSlug)) {
    const slug = textAt(one, "slug")
    if (slug !== null && !found.includes(slug)) found.push(slug)
  }
  return found.length === 0 ? [pageTypeSlug] : found
}

function memberTypesIn(page: Value | undefined): readonly string[] {
  if (page === undefined) return []
  const held = page[MEMBERS]
  if (!Array.isArray(held)) return []
  const found: string[] = []
  for (const one of held) {
    if (typeof one !== "string") continue
    const at = one.indexOf(PARTED_BY)
    if (at > 0) found.push(one.slice(0, at))
  }
  return found
}

function statedBy(climbed: readonly Value[], key: string): unknown {
  for (const one of climbed) {
    const held = one[key]
    if (held !== undefined && held !== null) return held
  }
  return null
}

function declaredOf(
  one: Stating,
  page: Value | undefined,
  on: string,
  drawnBy: readonly string[],
  memberDrawnBy: readonly (readonly string[])[],
  climbed: readonly Value[],
  fields: readonly Declared[] = [],
  colorsTitle = false
): Declared {
  return {
    key: one.propertySlug,
    type: one.pageTypeSlug,
    drawnBy,
    memberDrawnBy,
    fields,
    title: titledAs(one.propertySlug),
    pageId: page === undefined ? "" : (textAt(page, "id") ?? ""),
    on,
    values: page === undefined ? null : (page[VALUES] ?? statedBy(climbed, VALUES)),
    optionColors:
      page === undefined ? null : (page[OPTION_COLORS] ?? statedBy(climbed, OPTION_COLORS)),

    targetSlug: page === undefined ? null : slugAt(page, TARGET_PAGE_TYPE),
    slugProperty: one.propertySlug,
    mayBeGone: !one.required,
    verbId: page === undefined ? null : textAt(page, VERB_ID),
    colorsTitle,
    ...(page?.[ASKED_BY_NAME] === true ? { askedByName: true } : {}),
  }
}

function fieldsIn(
  root: string,
  named: Named,
  climb: Climbing,
  page: Value | undefined,
  on: string
): readonly Declared[] {
  if (page === undefined) return []
  const held = page[DECLARED]
  if (!Array.isArray(held)) return []
  const found: Declared[] = []
  for (const entry of recordsIn(held)) {
    const said = textAt(entry, SAID)
    if (said === null) continue
    const at = said.indexOf(PARTED_BY)
    if (at <= 0) continue
    const pageTypeSlug = said.slice(0, at)
    const field = pagesOfType(root, named, pageTypeSlug).get(said.slice(at + 1))
    if (field === undefined) continue
    const propertySlug = textAt(field, "propertySlug")
    if (propertySlug === null) continue
    found.push(
      declaredOf(
        { propertySlug, pageTypeSlug, required: entry["required"] === true },
        field,
        on,
        drawnFor(climb, pageTypeSlug),
        memberTypesIn(field).map((one) => drawnFor(climb, one)),
        climb(pageTypeSlug)
      )
    )
  }
  return found
}

export function ownerFor(climb: Climbing, pageTypeSlug: string): string | null {
  for (const one of climb(pageTypeSlug)) {
    const owner = textAt(one, "owner")
    if (owner !== null && owner !== "") return slugOf(owner)
  }
  return null
}

export function titleColorFor(climb: Climbing, pageTypeSlug: string): string | null {
  for (const one of climb(pageTypeSlug)) {
    const named = textAt(one, TITLE_COLORED_BY)
    if (named !== null && named !== "") return named
  }
  return null
}

export function shaping(root: string, pageTypeSlug: string): Shaped {
  if (listedAt(root, PAGE_TYPE, pageTypeSlug).length === 0) return { shape: null }
  try {
    const named: Named = new Map()
    const climb = climbing(root)
    const own = pagesOfType(root, named, PAGE_TYPE).get(pageTypeSlug)
    const colored = titleColorFor(climb, pageTypeSlug)
    const declarations = carriedFor(root, pageTypeSlug).map((one) => {
      const page = pagesOfType(root, named, one.pageTypeSlug).get(one.pagePropertySlug)
      return declaredOf(
        one,
        page,
        pageTypeSlug,
        drawnFor(climb, one.pageTypeSlug),
        memberTypesIn(page).map((slug) => drawnFor(climb, slug)),
        climb(one.pageTypeSlug),
        fieldsIn(root, named, climb, page, pageTypeSlug),
        colored === `${one.pageTypeSlug}${PARTED_BY}${one.pagePropertySlug}`
      )
    })
    return {
      shape: {
        pageType: pageTypeSlug,
        pageTypeId: own === undefined ? "" : (textAt(own, "id") ?? ""),
        ownerSlug: ownerFor(climb, pageTypeSlug),
        declarations,
      },
    }
  } catch (thrown) {
    return { refused: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}
