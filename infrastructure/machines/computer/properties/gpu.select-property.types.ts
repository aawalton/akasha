import type { gpu } from "akasha/infrastructure/machines/computer/properties/gpu.select-property.ts"

export type Gpu = (typeof gpu.values)[number]
