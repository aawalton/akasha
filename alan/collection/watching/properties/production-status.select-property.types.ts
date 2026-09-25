import type { productionStatus } from "akasha/alan/collection/watching/properties/production-status.select-property.ts"

export type ProductionStatus = (typeof productionStatus.values)[number]
