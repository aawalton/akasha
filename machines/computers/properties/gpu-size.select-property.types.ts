import type { gpuSize } from "akasha/machines/computers/properties/gpu-size.select-property.ts"

export type GpuSize = (typeof gpuSize.values)[number]
