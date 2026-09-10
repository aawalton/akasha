import type { productionStatus } from "./production-status.select-property.ts"

export type ProductionStatus = (typeof productionStatus.values)[number]
