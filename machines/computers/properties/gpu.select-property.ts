import type { SelectProperty } from "@akasha/pages-system/select-property"

export const gpu = {
  id: "01a0658c-329a-75c8-9044-3abbb33f0293",
  pageTypeSlug: "select-property",
  slug: "gpu",
  propertySlug: "gpu",
  definition: "which graphics card it runs",
  values: [
    "nvidia-geforce-rtx-5080",
    "apple-m1-max",
    "nvidia-geforce-gtx-1660-ti",
    "nvidia-geforce-rtx-4060",
    "nvidia-geforce-gtx-970",
    "nvidia-geforce-rtx-2060",
    "nvidia-geforce-gtx-1080-ti",
    "nvidia-geforce-rtx-2060-super",
    "nvidia-geforce-rtx-5060",
    "intel-arc-140t",
    "nvidia-geforce-rtx-3080",
  ],
} as const satisfies SelectProperty

export type Gpu = (typeof gpu.values)[number]
