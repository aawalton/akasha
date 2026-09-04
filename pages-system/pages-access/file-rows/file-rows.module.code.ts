import { idOfFilePage, slugOfFilePage } from "@akasha/file-page-identity"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { z } from "zod"
import type { PropertyDefinition } from "../page-type-config/page-type-config.module.code.ts"
import { parsePageSeq } from "../parse-page-seq/parse-page-seq.module.code.ts"
import type { RawPageRow } from "../raw-page-row/raw-page-row.module.code.ts"
import type { QueryRow } from "../types/types.module.code.ts"

export type FilePageRow = Omit<RawPageRow, "seq"> & { readonly seq: number | null }

const LIFTED_COLUMN = {
  id: "id",
  title: "title",
  icon: "icon",
  slug: "slug",
  uniqueKey: "unique_key",
  status: "status",
  completedAt: "completed_at",
  favoritedAt: "favorited_at",
  lastViewedAt: "last_viewed_at",
} as const satisfies Readonly<Record<string, keyof RawPageRow>>

type LiftedKey = keyof typeof LIFTED_COLUMN

export const SETTLED_BY_ROW: ReadonlySet<string> = new Set([
  "userId",
  "pageTypeId",
  "pageTypeSlug",
  "seq",
])

function isLifted(key: string): key is LiftedKey {
  return Object.hasOwn(LIFTED_COLUMN, key)
}

export function camelizeKey(key: string): string {
  const segments = key.split(/[^A-Za-z0-9]+/).filter((s) => s.length > 0)
  const [first, ...rest] = segments
  if (first === undefined) return ""
  const head = first.charAt(0).toLowerCase() + first.slice(1)
  return head + rest.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("")
}

export function kebabizeKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

function textOrNull(value: unknown): string | null {
  if (typeof value === "string") return value === "" ? null : value
  if (value === null || value === undefined) return null
  return String(value)
}

function parseJsonText(value: unknown): unknown {
  if (typeof value !== "string") return value
  try {
    return z.unknown().parse(JSON.parse(value))
  } catch {
    return value
  }
}

const INNER = String.raw`[a-z][a-z0-9-]*(?:\([^()]*\))?`
const BOUND = String.raw`(?:,\s*max\s+[1-9]\d*\s*)?`
const LIST_OF = new RegExp(String.raw`^list\(\s*(${INNER})\s*${BOUND}\)$`)
const MAP_OF = new RegExp(String.raw`^map\(\s*(${INNER})\s*${BOUND}\)$`)
const SELECT_OF = new RegExp(String.raw`^select\(\s*(${INNER})\s*\)$`)

const INNER_TYPE = z.tuple([z.string(), z.string()])

function isList(value: unknown): value is readonly unknown[] {
  return Array.isArray(value)
}

export function coerceByType(value: unknown, type: string): unknown {
  if (value === null || value === undefined) return null
  const stated = type.trim()
  const listed = INNER_TYPE.safeParse(LIST_OF.exec(stated))
  if (listed.success) {
    const items = isList(value) ? value : [value]
    return items.map((one) => coerceByType(one, listed.data[1]))
  }
  const mapped = INNER_TYPE.safeParse(MAP_OF.exec(stated))
  if (mapped.success) {
    const held = parseJsonText(value)
    if (!isRecord(held)) return held
    return Object.fromEntries(
      Object.entries(held).map(([key, one]) => [key, coerceByType(one, mapped.data[1])])
    )
  }
  const chosen = INNER_TYPE.safeParse(SELECT_OF.exec(stated))
  if (chosen.success) return coerceByType(value, chosen.data[1])
  switch (stated) {
    case "number": {
      const n = Number(value)
      return typeof value === "string" && value !== "" && Number.isFinite(n) ? n : value
    }
    case "boolean": {
      if (value === "true") return true
      if (value === "false") return false
      return value
    }
    case "json":
    case "rrule":
    case "progress":
    case "rich-document":
    case "action-button":
      return parseJsonText(value)
    case "multi-select":
    case "multi-relation":
    case "path-select":
      return Array.isArray(value) ? value : [value]
    default:
      return value
  }
}

export type BuildRowsArgs = {
  readonly rows: readonly QueryRow[]
  readonly definitions: readonly PropertyDefinition[]
  readonly pageTypeId: string
  readonly pageTypeSlug: string
}

export function buildRawPageRows({
  rows,
  definitions,
  pageTypeId,
  pageTypeSlug,
}: BuildRowsArgs): readonly FilePageRow[] {
  const typeOf = new Map(definitions.map((d) => [d.id, d.type]))
  return rows.map((row) => {
    const attributes: Record<string, unknown> = {}
    const lifted = new Map<string, string | null>()
    for (const [rawKey, rawValue] of Object.entries(row.values)) {
      const key = camelizeKey(rawKey)
      if (isLifted(key)) {
        lifted.set(LIFTED_COLUMN[key], textOrNull(rawValue))
        continue
      }
      if (SETTLED_BY_ROW.has(key)) continue
      const type = typeOf.get(key)
      attributes[key] = type === undefined ? rawValue : coerceByType(rawValue, type)
    }
    const column = (name: string): string | null => lifted.get(name) ?? null
    return {
      id: idOfFilePage(column("id"), row.at ?? `${pageTypeSlug}:${JSON.stringify(row.values)}`),
      page_type_id: pageTypeId,
      seq: parsePageSeq(row.values.seq ?? null, row.at ?? pageTypeSlug),
      title: column("title"),
      icon: column("icon"),
      attributes,
      page_type_slug: pageTypeSlug,
      unique_key: column("unique_key"),
      status: column("status"),
      completed_at: column("completed_at"),
      slug: slugOfFilePage(column("slug"), row.at ?? null),
      favorited_at: column("favorited_at"),
      last_viewed_at: column("last_viewed_at"),
    }
  })
}
