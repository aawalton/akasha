import type { Shape } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  numberAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Carried } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

const SECTION = "schema"

const HOLDS = "jsonl"

const NAMES = "/"

export type Carrying = {
  readonly key: string
  readonly propertySlug: string
  readonly pagePropertySlug: string
  readonly pageTypeSlug: string
  readonly declaredBy: string
  readonly required: boolean
  readonly many: boolean
  readonly unique: string | null
  readonly uniquePropertySlug: string | null
  readonly maxCount: number | null
  readonly maxLength: number | null
  readonly fixed: string | null
  readonly uncommitted: boolean
  readonly secret: boolean
  readonly targetPageTypeSlug: string | null
  readonly fileName: string | null
  readonly folderName: string | null
}

export function schemaAt(pageTypePath: string): string | null {
  return besideAt(pageTypePath, SECTION, HOLDS)
}

export function carryingOf(one: Carried, shape: Shape | undefined): Carrying {
  return {
    key: one.key,
    propertySlug: one.propertySlug,
    pagePropertySlug: one.pagePropertySlug,
    pageTypeSlug: one.pageTypeSlug,
    declaredBy: one.declaredBy,
    required: one.required,
    many: one.many,
    unique: one.unique,
    uniquePropertySlug: one.uniquePropertySlug ?? null,
    maxCount: one.maxCount,
    maxLength: one.maxLength,
    fixed: one.fixed ?? null,
    uncommitted: one.uncommitted,
    secret: one.secret,
    targetPageTypeSlug: shape?.targetPageTypeSlug ?? null,
    fileName: shape?.fileName ?? null,
    folderName: shape?.folderName ?? null,
  }
}

export function carriedOf(one: Carrying): Carried {
  return {
    ...one,
    uniquePropertySlug: one.uniquePropertySlug ?? undefined,
    fixed: one.fixed ?? undefined,
  }
}

export function carryingIn(line: string): Carrying | null {
  let said: unknown
  try {
    said = JSON.parse(line)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object" || Array.isArray(said)) return null
  const held = said as Value
  const key = textAt(held, "key")
  const propertySlug = textAt(held, "propertySlug")
  const pagePropertySlug = textAt(held, "pagePropertySlug")
  const pageTypeSlug = textAt(held, "pageTypeSlug")
  const declaredBy = textAt(held, "declaredBy")
  if (key === null || propertySlug === null || pagePropertySlug === null) return null
  if (pageTypeSlug === null || declaredBy === null) return null
  return {
    key,
    propertySlug,
    pagePropertySlug,
    pageTypeSlug,
    declaredBy,
    required: held.required === true,
    many: held.many === true,
    unique: textAt(held, "unique"),
    uniquePropertySlug: textAt(held, "uniquePropertySlug"),
    maxCount: numberAt(held, "maxCount"),
    maxLength: numberAt(held, "maxLength"),
    fixed: textAt(held, "fixed"),
    uncommitted: held.uncommitted === true,
    secret: held.secret === true,
    targetPageTypeSlug: textAt(held, "targetPageTypeSlug"),
    fileName: textAt(held, "fileName"),
    folderName: textAt(held, "folderName"),
  }
}

export function carryingEach(lines: Iterable<string>): readonly Carrying[] {
  const found: Carrying[] = []
  for (const line of lines) {
    const one = carryingIn(line)
    if (one !== null) found.push(one)
  }
  return found
}

export function bodyOf(carried: readonly Carried[], shapes: ReadonlyMap<string, Shape>): string {
  const lines = carried.map((one) =>
    JSON.stringify(
      carryingOf(one, shapes.get(`${one.pageTypeSlug}${NAMES}${one.pagePropertySlug}`))
    )
  )
  if (lines.length === 0) return ""
  return `${lines.sort().join("\n")}\n`
}
