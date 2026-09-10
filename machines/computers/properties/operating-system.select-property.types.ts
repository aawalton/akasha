import type { operatingSystem } from "./operating-system.select-property.ts"

export type OperatingSystem = (typeof operatingSystem.values)[number]
