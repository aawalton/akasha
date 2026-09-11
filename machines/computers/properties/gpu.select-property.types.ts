import type { gpu } from "akasha/machines/computers/properties/gpu.select-property.ts"

export type Gpu = (typeof gpu.values)[number]
