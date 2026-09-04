import { shapeFor } from "@akasha/pages-system-service/calling"
import { isRecord } from "@akasha/utils-narrow/is-record"
import type { Json } from "@akasha/utils-narrow/json-value"
import { z } from "zod"
import { camelizeKey } from "../file-rows/file-rows.module.code.ts"
import type { PropertyDefinition } from "../page-type-config/page-type-config.module.code.ts"

export const PAGE_TYPE = "page-type"

export type Declaration = {
  readonly key: string
  readonly type: string
  readonly title: string
  readonly pageId: string
  readonly on: string
  readonly values: unknown
  readonly targetSlug: string | null
  readonly slugProperty: string | null
  readonly mayBeGone: boolean
}

export type PageTypeShape = {
  readonly pageType: string
  readonly pageTypeId: string
  readonly ownerSlug: string | null
  readonly declarations: readonly Declaration[]
}

const asked = new Map<string, Promise<PageTypeShape | null>>()

export function forgetAskedShapes(): undefined {
  asked.clear()
}

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

type SelectOption = { readonly id: string; readonly label: string }

function labelled(id: string, held: unknown): SelectOption {
  if (isRecord(held)) {
    const label = held.label
    if (typeof label === "string" && label !== "") return { id, label }
  }
  return { id, label: id }
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
      .map((one) => ({ id: one, label: one }))
    return listed.length === 0 ? null : listed
  }
  const held = typeof value === "string" ? mapped(value) : value
  if (!isRecord(held)) return null
  const named = Object.entries(held).map(([id, one]) => labelled(id, one))
  return named.length === 0 ? null : named
}

function definitionOf(one: Declaration): PropertyDefinition {
  const config: Record<string, Json> = {}
  const options = optionsFrom(one.values)
  if (options !== null) config.options = options.map((each) => ({ ...each }))
  const stated = Object.keys(config).length !== 0
  return {
    id: camelizeKey(one.key),
    key: one.key,
    title: one.title,
    type: one.type,
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

export async function fileRelationDeclarations(
  pageTypeSlug: string
): Promise<readonly Declaration[] | null> {
  const shape = await shapeAsked(pageTypeSlug).catch(() => null)
  return shape === null ? null : shape.declarations
}
