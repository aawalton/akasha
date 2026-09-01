import type { PageDataJSON, PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export interface RollupConfig {
  readonly relationPropertyId: string
  readonly targetPropertyId: string
}

export interface RollupInput {
  readonly id: string
  readonly data: PageDataJSON
}

export type PageTypePropertiesMap = ReadonlyMap<string, readonly PropertyDefinition[]>

const MAX_ROLLUP_DEPTH = 10

export function computeRollup(
  config: RollupConfig,
  currentPageData: PageDataJSON,
  allPages: readonly RollupInput[],
  pageTypes: PageTypePropertiesMap
): PropertyValue {
  return resolveRollup(config, currentPageData, allPages, pageTypes, new Set(), 0)
}

function resolveRollup(
  config: RollupConfig,
  currentPageData: PageDataJSON,
  allPages: readonly RollupInput[],
  pageTypes: PageTypePropertiesMap,
  visited: Set<string>,
  depth: number
): PropertyValue {
  if (depth >= MAX_ROLLUP_DEPTH) return null

  const targetId = currentPageData[config.relationPropertyId]
  if (typeof targetId !== "string") return null

  const targetPage = allPages.find((p) => p.id === targetId)
  if (!targetPage) return null

  const visitKey = `${targetId}:${config.targetPropertyId}`
  if (visited.has(visitKey)) return null
  visited.add(visitKey)

  const targetTypeId = targetPage.data.pageTypeId
  if (typeof targetTypeId === "string") {
    const targetProperties = pageTypes.get(targetTypeId)
    const targetPropertyDef = targetProperties?.find((p) => p.id === config.targetPropertyId)
    if (targetPropertyDef?.type === "rollup") {
      const nestedConfig = parseRollupConfig(targetPropertyDef.config)
      if (nestedConfig === null) return null
      return resolveRollup(nestedConfig, targetPage.data, allPages, pageTypes, visited, depth + 1)
    }
  }

  return targetPage.data[config.targetPropertyId] ?? null
}

export function parseRollupConfig(raw: PropertyDefinition["config"]): RollupConfig | null {
  if (!raw) return null
  const rel = raw.relationPropertyId
  const tgt = raw.targetPropertyId
  if (typeof rel !== "string" || typeof tgt !== "string") return null
  return { relationPropertyId: rel, targetPropertyId: tgt }
}

export function computeFillRollupsForPage(
  data: PageDataJSON,
  definitions: readonly PropertyDefinition[],
  allPages: readonly RollupInput[],
  pageTypes: PageTypePropertiesMap
): Record<string, PropertyValue> {
  const fill: Record<string, PropertyValue> = {}
  for (const def of definitions) {
    if (def.type !== "rollup") continue
    if (data[def.id] != null) continue
    const config = parseRollupConfig(def.config)
    if (config === null) continue
    fill[def.id] = computeRollup(config, data, allPages, pageTypes)
  }
  return fill
}

export const ROLLUP_OPS: PropertyTypeOps = {
  validate() {
    return null
  },

  getSortValue(value: PropertyValue) {
    if (typeof value === "string") return value
    if (typeof value === "number") return value
    return null
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig) {
    return (value) => {
      switch (config.operator) {
        case "is_empty":
          return value == null
        case "is_not_empty":
          return value != null
        default:
          return true
      }
    }
  },
}
