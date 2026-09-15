import type { gpu } from "akasha/infrastructure/machine/computer/properties/gpu.select-property.ts"

export type Gpu = (typeof gpu.values)[number]
