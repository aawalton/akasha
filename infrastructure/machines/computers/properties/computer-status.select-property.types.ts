import type { computerStatus } from "akasha/infrastructure/machines/computers/properties/computer-status.select-property.ts"

export type ComputerStatus = (typeof computerStatus.values)[number]
