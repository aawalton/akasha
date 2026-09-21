import {
  type PropertyDefinition,
  type PropertyType,
  readString,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import {
  type PageTypePropertiesMap,
  parseRollupConfig,
  type RollupConfig,
} from "akasha/page/core/property-type/modules/rollup/rollup.module.code.ts"
import {
  aggregateConfigSchema,
  formulaConfigSchema,
} from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"
import type * as z from "zod"

const MAX_ROLLUP_DEPTH = 10

export function resolveComputedProperty(
  definition: PropertyDefinition,
  pageTypeId: string,
  propertiesByPageType: PageTypePropertiesMap
): PropertyDefinition {
  if (definition.type === "aggregate") {
    return synthesizeDefinition(definition, propertiesByPageType, {
      type: "number",
      config: resolveAggregateNumberConfig(definition),
      drawn: {},
    })
  }
  if (definition.type === "formula") {
    return resolveFormula(definition, propertiesByPageType)
  }
  if (definition.type === "rollup") {
    return resolveRollupDefinition(definition, pageTypeId, propertiesByPageType)
  }
  return definition
}

function resolveFormula(
  definition: PropertyDefinition,
  propertiesByPageType: PageTypePropertiesMap
): PropertyDefinition {
  const parsed = formulaConfigSchema.safeParse(definition.config)
  if (!parsed.success) return definition
  return synthesizeDefinition(definition, propertiesByPageType, {
    type: parsed.data.returnType,
    config: resolvedFormulaConfig(parsed.data),
    drawn: {},
  })
}

function resolvedFormulaConfig(parsed: z.infer<typeof formulaConfigSchema>): ConfigValue {
  const numberSurface = parsed.returnType === "number" ? numberFormatSurfaceConfig(parsed) : {}
  return { ...numberSurface, ...badgeDisplayConfig(parsed) }
}

function resolveAggregateNumberConfig(definition: PropertyDefinition): ConfigValue {
  const parsed = aggregateConfigSchema.safeParse(definition.config)
  if (!parsed.success) return {}
  return { ...numberFormatSurfaceConfig(parsed.data), ...badgeDisplayConfig(parsed.data) }
}

const NUMBER_FORMAT_SURFACE_KEYS = [
  "format",
  "decimals",
  "percentBasis",
  "min",
  "max",
  "units",
  "prefix",
  "round",
] as const

const BADGE_DISPLAY_KEYS = ["icon", "badgeVariant"] as const

function badgeDisplayConfig(
  parsed: Partial<Record<(typeof BADGE_DISPLAY_KEYS)[number], string | undefined>>
): ConfigValue {
  const config: Record<string, string> = {}
  for (const key of BADGE_DISPLAY_KEYS) {
    const value = parsed[key]
    if (value !== undefined) config[key] = value
  }
  return config
}

function numberFormatSurfaceConfig(
  parsed: Partial<Record<(typeof NUMBER_FORMAT_SURFACE_KEYS)[number], string | number | undefined>>
): ConfigValue {
  const config: Record<string, string | number> = {}
  for (const key of NUMBER_FORMAT_SURFACE_KEYS) {
    const value = parsed[key]
    if (value !== undefined) config[key] = value
  }
  return config
}

function resolveRollupDefinition(
  definition: PropertyDefinition,
  pageTypeId: string,
  propertiesByPageType: PageTypePropertiesMap
): PropertyDefinition {
  const config = parseRollupConfig(definition.config)
  if (config === null) return definition

  const resolved = walkRollupChain(config, pageTypeId, propertiesByPageType, new Set(), 0)
  if (resolved === null) return definition

  return synthesizeDefinition(definition, propertiesByPageType, resolved)
}

interface Drawn {
  readonly drawnBy?: readonly string[]
  readonly memberDrawnBy?: readonly (readonly string[])[]
}

interface ResolvedType {
  readonly type: PropertyType
  readonly config: ConfigValue
  readonly drawn: Drawn
}

function walkRollupChain(
  config: RollupConfig,
  pageTypeId: string,
  propertiesByPageType: PageTypePropertiesMap,
  visited: Set<string>,
  depth: number
): ResolvedType | null {
  if (depth >= MAX_ROLLUP_DEPTH) return null

  const visitKey = `${pageTypeId}:${config.relationPropertyId}:${config.targetPropertyId}`
  if (visited.has(visitKey)) return null
  visited.add(visitKey)

  const currentProperties = propertiesByPageType.get(pageTypeId)
  if (!currentProperties) return null

  const relationProp = currentProperties.find((p) => p.id === config.relationPropertyId)
  if (!relationProp) return null
  if (relationProp.type !== "relation" && relationProp.type !== "multi-relation") return null

  const targetPageTypeId = readString(relationProp.config, "targetPageTypeId")
  if (targetPageTypeId === null) return null

  const targetProperties = propertiesByPageType.get(targetPageTypeId)
  if (!targetProperties) return null

  const targetProp = targetProperties.find((p) => p.id === config.targetPropertyId)
  if (!targetProp) return null

  if (targetProp.type === "rollup") {
    const nestedConfig = parseRollupConfig(targetProp.config)
    if (nestedConfig === null) return null
    return walkRollupChain(nestedConfig, targetPageTypeId, propertiesByPageType, visited, depth + 1)
  }

  if (targetProp.type === "aggregate") {
    return { type: "number", config: resolveAggregateNumberConfig(targetProp), drawn: {} }
  }

  if (targetProp.type === "formula") {
    const parsed = formulaConfigSchema.safeParse(targetProp.config)
    if (!parsed.success) return null
    return { type: parsed.data.returnType, config: resolvedFormulaConfig(parsed.data), drawn: {} }
  }

  return { type: targetProp.type, config: targetProp.config ?? {}, drawn: drawnOf(targetProp) }
}

type ConfigValue = NonNullable<PropertyDefinition["config"]>

function drawnOf(one: PropertyDefinition): Drawn {
  const drawn: { drawnBy?: readonly string[]; memberDrawnBy?: readonly (readonly string[])[] } = {}
  if (one.drawnBy !== undefined) drawn.drawnBy = one.drawnBy
  if (one.memberDrawnBy !== undefined) drawn.memberDrawnBy = one.memberDrawnBy
  return drawn
}

function drawnAsType(
  type: PropertyType,
  propertiesByPageType: PageTypePropertiesMap
): Drawn | null {
  for (const properties of propertiesByPageType.values()) {
    for (const one of properties) {
      if (one.type !== type) continue
      if (one.drawnBy === undefined || one.drawnBy.length === 0) continue
      return drawnOf(one)
    }
  }
  return null
}

function drawnForResolved(
  source: PropertyDefinition,
  resolved: ResolvedType,
  propertiesByPageType: PageTypePropertiesMap
): Drawn {
  if (resolved.drawn.drawnBy !== undefined) return resolved.drawn
  return drawnAsType(resolved.type, propertiesByPageType) ?? drawnOf(source)
}

function synthesizeDefinition(
  source: PropertyDefinition,
  propertiesByPageType: PageTypePropertiesMap,
  resolved: ResolvedType
): PropertyDefinition {
  const required = {
    id: source.id,
    title: source.title,
    type: resolved.type,
    config: resolved.config,
  }
  const optional: {
    accent?: boolean
    display?: "badge" | "inline"
    sort?: "alpha" | "manual"
    colorRule?: NonNullable<PropertyDefinition["colorRule"]>
    columnName?: string
    indexName?: string
    isRequired?: boolean
    unique?: boolean
  } = {}
  if (source.accent !== undefined) optional.accent = source.accent
  if (source.display !== undefined) optional.display = source.display
  if (source.sort !== undefined) optional.sort = source.sort
  if (source.colorRule !== undefined) optional.colorRule = source.colorRule
  if (source.columnName !== undefined) optional.columnName = source.columnName
  if (source.indexName !== undefined) optional.indexName = source.indexName
  if (source.isRequired !== undefined) optional.isRequired = source.isRequired
  if (source.unique !== undefined) optional.unique = source.unique
  return {
    ...required,
    ...drawnForResolved(source, resolved, propertiesByPageType),
    ...optional,
  } satisfies PropertyDefinition
}
