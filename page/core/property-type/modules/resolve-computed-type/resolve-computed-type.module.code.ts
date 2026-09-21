import type {
  PageTypePropertiesMap,
  PropertyDefinition,
  PropertyType,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { aggregateConfigSchema } from "akasha/page/core/schema/modules/property-config-schemas/property-config-schemas.module.code.ts"

export function resolveComputedProperty(
  definition: PropertyDefinition,
  propertiesByPageType: PageTypePropertiesMap
): PropertyDefinition {
  if (definition.type === "aggregate") {
    return synthesizeDefinition(definition, propertiesByPageType, {
      type: "number",
      config: resolveAggregateNumberConfig(definition),
    })
  }
  return definition
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

interface Drawn {
  readonly drawnBy?: readonly string[]
  readonly memberDrawnBy?: readonly (readonly string[])[]
}

interface ResolvedType {
  readonly type: PropertyType
  readonly config: ConfigValue
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
