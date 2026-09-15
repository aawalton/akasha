import type { gpuSize } from "akasha/infrastructure/machines/computer/properties/gpu-size.select-property.ts"

export type GpuSize = (typeof gpuSize.values)[number]
