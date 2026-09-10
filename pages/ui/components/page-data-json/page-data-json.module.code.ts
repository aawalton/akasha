import { isRecord } from "@akasha/utils/narrow/is-record"
import {
  asPageDataJSON,
  type PageDataJSON,
} from "akasha/pages/core/page-data/page-data.module.code.ts"
import type { AggregateInput } from "akasha/pages/core/property-types/aggregate/aggregate.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/pages/core/schema/pages/pages.module.code.ts"

export function toPageDataJSON(properties: Record<string, unknown> | undefined): PageDataJSON {
  if (properties == null || typeof properties !== "object" || Array.isArray(properties)) {
    return asPageDataJSON({})
  }
  return asPageDataJSON(properties)
}

type PageDataRecord = Record<string, ReadonlyJSONValue>

function asPageDataRecord(value: Record<string, unknown>): PageDataRecord {
  return value as PageDataRecord
}

export function toPageDataRecord(properties: Record<string, unknown> | undefined): PageDataRecord {
  if (properties == null || typeof properties !== "object" || Array.isArray(properties)) {
    return asPageDataRecord({})
  }
  return asPageDataRecord(properties)
}

export function pageRowToPageDataJSON(value: PageDataRecord): PageDataJSON {
  return asPageDataJSON(value)
}

function extractPageTypeId(v: unknown): string {
  if (typeof v === "string") return v
  if (isRecord(v) && typeof v.id === "string") return v.id
  return ""
}

export function toAggregateInputs(
  pages: readonly { _id: string; properties: Record<string, unknown> }[]
): readonly AggregateInput[] {
  return pages.map((p) => ({
    id: p._id,
    data: toPageDataJSON({
      ...p.properties,
      pageTypeId: extractPageTypeId(p.properties.pageTypeId),
    }),
  }))
}
