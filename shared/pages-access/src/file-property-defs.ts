import { askComposed, askShape, type ComposedQuery, type Declaration, type PageTypeShape } from "@shared/pages-query/ask"
import { type Asked } from "../../pages-query/src/index"
import type { Json } from "../../supabase-database/src/generated/database"
import { isRecord } from "../../utils-narrow/src/is-record"
import { z } from "zod"
import { camelizeKey } from "./file-rows"
import type { PropertyDefinition } from "./page-type-config"

export const PAGE_TYPE = "page-type"
export const OWNER_SLUG = "owner-slug"

export type FileAsk = (query: ComposedQuery) => Promise<Asked>

export const LIVE_ASK: FileAsk = (query) => askComposed(query)

export type Stated = {
  readonly id: string
  readonly ownerSlug: string | null
}

export function textOf(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const value = values[key]
  return typeof value === "string" && value !== "" ? value : null
}

const asked = new Map<string, Promise<PageTypeShape | null>>()

export function forgetAskedShapes(): undefined {
  asked.clear()
}

async function read(pageTypeSlug: string): Promise<PageTypeShape | null> {
  const got = await askShape(pageTypeSlug)
  if (got.ok) return got.shape
  if (got.status === 404) return null
  throw new Error(
    `shapeOf(${pageTypeSlug}): the page query service did not answer, so this reader holds no property definitions to report; an empty list would read as a page type that declares nothing (${got.why})`
  )
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

export async function statedBy(pageTypeSlug: string): Promise<Stated | null> {
  const shape = await shapeAsked(pageTypeSlug)
  return shape === null ? null : { id: shape.pageTypeId, ownerSlug: shape.ownerSlug }
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
  return {
    id: camelizeKey(one.key),
    key: one.key,
    title: one.title,
    type: one.type,
    pageId: one.pageId,
    ...(Object.keys(config).length > 0 ? { config } : {}),
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
