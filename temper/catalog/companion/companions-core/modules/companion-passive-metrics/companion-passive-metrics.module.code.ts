import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

export function companionPassiveMetricName(id: string): string | undefined {
  return companionCatalog().passiveMetrics.find((one) => one.id === id)?.name
}
