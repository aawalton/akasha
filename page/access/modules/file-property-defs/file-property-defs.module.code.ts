import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import type { PropertyDefinition } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { camelizeKey } from "akasha/page/naming/folding/modules/camelize-key/camelize-key.module.code.ts"
import { shapeFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { z } from "zod"

export type Declaration = {
  readonly key: string
  readonly type: string
  readonly drawnBy: readonly string[]
  readonly memberDrawnBy: readonly (readonly string[])[]
  readonly title: string
  readonly pageId: string
  readonly on: string
  readonly values: unknown
  readonly optionColors: unknown

  readonly targetSlug: string | null
  readonly slugProperty: string | null
  readonly mayBeGone: boolean
  readonly verbId: string | null
}

export type PageTypeShape = {
  readonly pageType: string
  readonly pageTypeId: string
  readonly ownerSlug: string | null
  readonly declarations: readonly Declaration[]
}

const asked = new Map<string, Promise<PageTypeShape | null>>()

async function read(pageTypeSlug: string): Promise<PageTypeShape | null> {
  const got = await shapeFor(pageTypeSlug)
  if ("refused" in got) {
    throw new Error(
      `shapeAsked(${pageTypeSlug}): the pages answered no shape, so this reader holds no property definitions to report; an empty list would read as a page type that declares nothing (${got.refused})`
    )
  }
  return got.shape === null ? null : (got.shape as PageTypeShape)
}

export async function shapeAsked(pageTypeSlug: string): Promise<PageTypeShape | null> {
  const asking = asked.get(pageTypeSlug)
  if (asking !== undefined) return asking
  const started = read(pageTypeSlug)
  asked.set(pageTypeSlug, started)
  started.catch(() => {
    if (asked.get(pageTypeSlug) === started) asked.delete(pageTypeSlug)
  })
  return started
}

type SelectOption = { readonly id: string; readonly label: string; readonly color?: string }

function labelled(id: string, held: unknown): SelectOption {
  if (isRecord(held)) {
    const label = held.label
    if (typeof label === "string" && label !== "") return { id, label }
  }
  return { id, label: titledAs(id) }
}

function mapped(value: string): unknown {
  try {
    return z.unknown().parse(JSON.parse(value))
  } catch {
    return null
  }
}

function optionsFrom(value: unknown): readonly SelectOption[] | null {
  if (Array.isArray(value)) {
    const listed = value
      .filter((one): one is string => typeof one === "string" && one !== "")
      .map((one) => ({ id: one, label: titledAs(one) }))
    return listed.length === 0 ? null : listed
  }
  const held = typeof value === "string" ? mapped(value) : value
  if (!isRecord(held)) return null
  const named = Object.entries(held).map(([id, one]) => labelled(id, one))
  return named.length === 0 ? null : named
}

function coloredBy(value: unknown): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  if (!Array.isArray(value)) return held
  for (const one of value) {
    if (!isRecord(one)) continue
    const { value: named, color } = one
    if (typeof named === "string" && typeof color === "string") held.set(named, color)
  }
  return held
}

function coloredIn(options: readonly SelectOption[], colored: ReadonlyMap<string, string>): Json[] {
  return options.map((one) => {
    const color = colored.get(one.id)
    return color === undefined ? { ...one } : { ...one, color }
  })
}

const DECLARED_BY = "-property"

const RENDERED_PLAIN = "text"

const RENDERED_AS: Readonly<Record<string, string>> = {
  "boolean-property": "boolean",
  "calendar-date-property": "calendar-date",
  "calendar-time-property": "calendar-time",
  "computed-property": RENDERED_PLAIN,
  "email-address-property": RENDERED_PLAIN,
  "file-property": RENDERED_PLAIN,
  "grade-property": "select",
  "instant-property": "instant",
  "markdown-property": "markdown",
  "multi-relation-property": "multi-relation",
  "multi-select-property": "multi-select",
  "number-property": "number",
  "one-of-property": RENDERED_PLAIN,
  "page-property-entry": "json",
  "phone-number-property": RENDERED_PLAIN,
  "process-property": "json",
  "record-property": "json",
  "relation-property": "relation",
  "rich-document-property": "rich-document",
  "rrule-property": "rrule",
  "select-property": "select",
  "text-property": RENDERED_PLAIN,
  "url-property": "url",
  "action-button-property": "action-button",
}

export function renderedType(pageTypeSlug: string): string {
  const named = RENDERED_AS[pageTypeSlug]
  if (named !== undefined) return named
  return pageTypeSlug.endsWith(DECLARED_BY) ? RENDERED_PLAIN : pageTypeSlug
}

function definitionOf(one: Declaration): PropertyDefinition {
  const config: Record<string, Json> = {}
  const options = optionsFrom(one.values)
  if (options !== null) config.options = coloredIn(options, coloredBy(one.optionColors))
  if (one.targetSlug !== null) config.targetPageTypeSlug = one.targetSlug
  if (one.verbId !== null) config.verbId = one.verbId
  const stated = Object.keys(config).length !== 0
  return {
    id: camelizeKey(one.key),
    key: one.key,
    title: one.title,
    type: renderedType(one.type),
    drawnBy: one.drawnBy,
    ...(one.memberDrawnBy.length === 0 ? {} : { memberDrawnBy: one.memberDrawnBy }),
    pageId: one.pageId,
    ...(stated ? { config } : {}),
  }
}

export async function filePropertyDefinitions(
  pageTypeSlug: string
): Promise<readonly PropertyDefinition[]> {
  const shape = await shapeAsked(pageTypeSlug)
  if (shape === null) return []
  const taken = new Set<string>()
  const defs: PropertyDefinition[] = []
  for (const one of shape.declarations) {
    const canonical = camelizeKey(one.key)
    if (taken.has(canonical)) continue
    taken.add(canonical)
    defs.push(definitionOf(one))
  }
  return defs
}
