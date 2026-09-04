import type { SelectProperty } from "@akasha/pages-system/select-property"

export const cpu = {
  id: "01a0658c-329a-7f4d-8196-79171c58a3a3",
  pageTypeSlug: "select-property",
  slug: "cpu",
  propertySlug: "cpu",
  definition: "which processor it runs",
  values: [
    "intel-core-ultra-9-285",
    "apple-m1-max",
    "amd-ryzen-5-3600",
    "intel-core-i7-14700f",
    "intel-core-i7-3930k",
    "intel-core-i7-10700f",
    "intel-core-i7-7800x",
    "intel-core-i7-9700f",
    "intel-core-ultra-5-225f",
    "intel-core-ultra-7-255h",
    "amd-ryzen-7-8700f",
    "intel-core-ultra-7-265",
    "amd-ryzen-9-5950x",
  ],
} as const satisfies SelectProperty

export type Cpu = (typeof cpu.values)[number]
