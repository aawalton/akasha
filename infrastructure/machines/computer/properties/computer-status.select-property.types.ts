import type { computerStatus } from "akasha/infrastructure/machines/computer/properties/computer-status.select-property.ts"

export type ComputerStatus = (typeof computerStatus.values)[number]
