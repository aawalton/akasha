import type { brand } from "akasha/infrastructure/machines/computer/properties/brand.select-property.ts"

export type Brand = (typeof brand.values)[number]
