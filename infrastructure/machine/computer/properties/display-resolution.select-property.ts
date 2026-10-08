import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const displayResolution = {
  id: "01a0658c-329a-7fdf-a7c9-f5d76820e07c",
  type: "page-type/select-property",
  slug: "display-resolution",
  propertySlug: "display-resolution",
  definition: "how many pixels that monitor carries",
  values: ["3440x1440", "3456x2234", "1920x1080", "2560x1440", "2048-x-1280"],
  types: "ts",
  createdAt: "2026-09-03T04:34:41.946Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
