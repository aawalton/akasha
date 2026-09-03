import type { SelectProperty } from "@akasha/pages-system/select-property"

export const displayResolution = {
  id: "01a0658c-329a-7fdf-a7c9-f5d76820e07c",
  pageTypeSlug: "select-property",
  slug: "display-resolution",
  propertySlug: "display-resolution",
  definition: "how many pixels that monitor carries",
  values: ["3440x1440", "3456x2234", "1920x1080", "2560x1440", "2048-x-1280"],
} as const satisfies SelectProperty

export type DisplayResolution = (typeof displayResolution.values)[number]
