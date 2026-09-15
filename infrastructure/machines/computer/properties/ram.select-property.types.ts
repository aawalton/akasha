import type { ram } from "akasha/infrastructure/machines/computer/properties/ram.select-property.ts"

export type Ram = (typeof ram.values)[number]
