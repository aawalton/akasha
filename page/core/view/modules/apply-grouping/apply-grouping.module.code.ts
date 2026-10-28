import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import type { GroupGranularity } from "akasha/page/core/schema/modules/view-data/view-data.module.code.ts"
import {
  effectiveGroupable,
  GROUP_NONE_KEY,
  type GroupOption,
  getOptions,
  type PageGroupDefinition,
  type PageResolver,
  relationFieldOf,
} from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"
import { pageDayKey } from "akasha/page/core/view/modules/calendar-date-to-value/calendar-date-to-value.module.code.ts"
import {
  applyGranularityBucket,
  formatGranularityLabel,
} from "akasha/page/core/view/modules/group-granularity/group-granularity.module.code.ts"

const NONE_KEY = GROUP_NONE_KEY

function namesIn(held: unknown, fieldId: string): readonly string[] {
  const records: unknown[] = Array.isArray(held) ? held : [held]
  const names = records.flatMap((one) => (isRecord(one) ? [one[fieldId]].flat() : []))
  return [...new Set(names.filter((one): one is string => typeof one === "string" && one !== ""))]
}

function titleOf(resolver?: PageResolver | null): (key: string) => string {
  return (key) => (key === NONE_KEY ? "No Value" : (resolver?.resolve(key)?.title ?? key))
}

export function generateGroupOptions(
  properties: readonly PropertyDefinition[]
): readonly GroupOption[] {
  return properties
    .filter((prop) => effectiveGroupable(prop))
    .map((prop) => ({ value: prop.id, label: prop.title }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

export function getPageGroupDefinition(
  groupBy: string,
  properties: readonly PropertyDefinition[],
  resolver?: PageResolver | null,
  granularity: GroupGranularity = "none"
): PageGroupDefinition | null {
  const prop = properties.find((p) => p.id === groupBy)
  if (!prop || !effectiveGroupable(prop)) return null

  const propId = prop.id

  const field = relationFieldOf(prop)
  if (field !== undefined) {
    const fieldId = field.id
    return {
      getKey: (item) => namesIn(item[propId], fieldId)[0] ?? NONE_KEY,
      getKeys: (item) => {
        const names = namesIn(item[propId], fieldId)
        return names.length === 0 ? [NONE_KEY] : names
      },
      getLabel: titleOf(resolver),
    }
  }

  if (prop.type === "boolean") {
    return {
      getKey: (item) => {
        const v: unknown = item[propId]
        return Boolean(v) === true ? "true" : "false"
      },
      getLabel: (key) => (key === "true" ? "Checked" : "Unchecked"),
    }
  }

  if (prop.type === "select") {
    const options = getOptions(prop)
    const optionMap = new Map(options.map((o) => [o.id, o.label]))
    return {
      getKey: (item) => {
        const val = item[propId]
        return typeof val === "string" && val !== "" ? val : NONE_KEY
      },
      getLabel: (key) => (key === NONE_KEY ? "No Value" : (optionMap.get(key) ?? key)),
    }
  }

  if (prop.type === "multi-select") {
    const options = getOptions(prop)
    const optionMap = new Map(options.map((o) => [o.id, o.label]))
    return {
      getKey: (item) => {
        const val = item[propId]
        if (!Array.isArray(val) || val.length === 0) return NONE_KEY
        return String(val[0])
      },
      getKeys: (item) => {
        const val = item[propId]
        if (!Array.isArray(val) || val.length === 0) return [NONE_KEY]
        return val.filter((v): v is string => typeof v === "string")
      },
      getLabel: (key) => (key === NONE_KEY ? "No Value" : (optionMap.get(key) ?? key)),
    }
  }

  if (prop.type === "relation") {
    return {
      getKey: (item) => {
        const val = item[propId]
        return typeof val === "string" && val !== "" ? val : NONE_KEY
      },
      getLabel: titleOf(resolver),
    }
  }

  if (prop.type === "multi-relation") {
    return {
      getKey: (item) => {
        const val = item[propId]
        if (!Array.isArray(val) || val.length === 0) return NONE_KEY
        const first = val[0]
        return typeof first === "string" ? first : NONE_KEY
      },
      getKeys: (item) => {
        const val = item[propId]
        if (!Array.isArray(val) || val.length === 0) return [NONE_KEY]
        return val.filter((v): v is string => typeof v === "string")
      },
      getLabel: titleOf(resolver),
    }
  }

  if (prop.type === "calendar-date" || prop.type === "instant") {
    return {
      getKey: (item) => {
        const day = pageDayKey(prop, item[propId])
        return day === null ? NONE_KEY : applyGranularityBucket(day, granularity)
      },
      getLabel: (key) => (key === NONE_KEY ? "No Value" : formatGranularityLabel(key, granularity)),
    }
  }

  return {
    getKey: (item) => {
      const val = item[propId]
      if (val == null || val === "") return NONE_KEY
      if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
        return String(val)
      }
      return NONE_KEY
    },
    getLabel: (key) => (key === NONE_KEY ? "No Value" : key),
  }
}
