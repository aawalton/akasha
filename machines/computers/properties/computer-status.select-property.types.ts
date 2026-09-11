import type { computerStatus } from "akasha/machines/computers/properties/computer-status.select-property.ts"

export type ComputerStatus = (typeof computerStatus.values)[number]
