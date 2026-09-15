import type { computerStatus } from "akasha/infrastructure/machine/computer/properties/computer-status.select-property.ts"

export type ComputerStatus = (typeof computerStatus.values)[number]
