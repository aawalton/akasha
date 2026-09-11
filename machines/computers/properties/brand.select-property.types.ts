import type { brand } from "akasha/machines/computers/properties/brand.select-property.ts"

export type Brand = (typeof brand.values)[number]
