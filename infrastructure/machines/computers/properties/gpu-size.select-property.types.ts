import type { gpuSize } from "akasha/infrastructure/machines/computers/properties/gpu-size.select-property.ts"

export type GpuSize = (typeof gpuSize.values)[number]
