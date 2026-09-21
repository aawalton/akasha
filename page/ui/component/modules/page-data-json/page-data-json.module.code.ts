import {
  asPageDataJSON,
  type PageDataJSON,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"

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
