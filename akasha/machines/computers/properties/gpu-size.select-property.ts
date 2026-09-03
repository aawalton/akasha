import type { SelectProperty } from "@akasha/pages-system/select-property"

export const gpuSize = {
  id: "01a0658c-329a-7bea-9a01-26a5774ab8dc",
  pageTypeSlug: "select-property",
  slug: "gpu-size",
  propertySlug: "gpu-size",
  definition: "how much memory the graphics card carries",
  values: ["16gb", "64gb", "6gb", "8gb", "4gb", "11gb", "10gb"],
} as const satisfies SelectProperty

export type GpuSize = (typeof gpuSize.values)[number]
