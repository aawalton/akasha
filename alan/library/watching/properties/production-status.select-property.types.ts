import type { productionStatus } from "akasha/alan/library/watching/properties/production-status.select-property.ts"

export type ProductionStatus = (typeof productionStatus.values)[number]
