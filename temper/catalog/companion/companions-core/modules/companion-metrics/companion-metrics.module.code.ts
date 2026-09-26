import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import type {
  CompanionFormulaNode,
  CompanionMetricTemplate,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-template/companion-metric-template.module.code.ts"
import type { RatingSurplusInfo } from "akasha/temper/player/character/formula-framework/modules/rating-chance/rating-chance.module.code.ts"
import type { SourceCategoryId } from "akasha/temper/player/character/formula-framework/modules/source-category/source-category.module.code.ts"

export const COMPANION_CATEGORIES: SourceCategoryId[] = [
  "companion-base",
  "companion-armor",
  "companion-weapons",
  "companion-jewelry",
  "companion-skills",
]

export type CompanionMetricCatalog = DataFile<CompanionMetricId, CompanionMetricTemplate>

type CompanionMetric = CompanionMetricTemplate & { id: CompanionMetricId }

export type CompanionMetricValue = CompanionMetric & { value: number; surplus?: RatingSurplusInfo }

const COMPANION_SUBJECT = "companion"

const STATED_WHEN_THERE = [
  "effectType",
  "valueSource",
  "divisor",
  "cap",
  "ratingFloorIncrement",
] as const

const UNREAD =
  "the companion stat catalogue is read from pages, and nothing has read it yet — gate the screen on `MetricCatalogGate`, or hold it before the work starts"

class CompanionMetricCatalogUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "CompanionMetricCatalogUnread"
  }
}

function companionTemplateOf(
  value: Value,
  formulas: ReadonlyMap<string, object>
): CompanionMetricTemplate {
  const id = String(value.slug) as CompanionMetricId
  const stated: Record<string, unknown> = {}
  for (const key of STATED_WHEN_THERE) {
    const one = value[key]
    if (one !== undefined && one !== null) stated[key] = one
  }
  const formula = formulas.get(id) as CompanionFormulaNode | undefined
  return {
    id,
    name: String(value.title),
    valueType: value.valueType,
    ...stated,
    ...(formula === undefined ? {} : { formula }),
  } as CompanionMetricTemplate
}

export function companionMetricCatalogOf(
  pages: Iterable<Value>,
  formulas: ReadonlyMap<string, object>
): CompanionMetricCatalog {
  const keyed: Partial<Record<CompanionMetricId, CompanionMetricTemplate>> = {}
  const companions = [...pages].filter((value) => value.subject === COMPANION_SUBJECT)
  for (const value of companions.sort((one, two) =>
    String(one.slug).localeCompare(String(two.slug))
  )) {
    const template = companionTemplateOf(value, formulas)
    keyed[template.id] = template
  }
  return createDataFile<CompanionMetricTemplate>()(
    keyed as Record<CompanionMetricId, CompanionMetricTemplate>
  )
}

let held: CompanionMetricCatalog | null = null

export function holdCompanionMetricCatalog(read: CompanionMetricCatalog): CompanionMetricCatalog {
  held = read
  return read
}

export function companionMetrics(): CompanionMetricCatalog {
  if (held === null) throw new CompanionMetricCatalogUnread()
  return held
}

export function getCompanionMetricName(metricId: CompanionMetricId): string {
  return companionMetrics().data[metricId].name
}
