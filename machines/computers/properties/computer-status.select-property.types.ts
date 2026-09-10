import type { computerStatus } from "./computer-status.select-property.ts"

export type ComputerStatus = (typeof computerStatus.values)[number]
