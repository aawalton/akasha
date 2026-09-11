import type { operatingSystem } from "akasha/machines/computers/properties/operating-system.select-property.ts"

export type OperatingSystem = (typeof operatingSystem.values)[number]
