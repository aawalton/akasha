import type { operatingSystem } from "akasha/infrastructure/machine/computer/properties/operating-system.select-property.ts"

export type OperatingSystem = (typeof operatingSystem.values)[number]
