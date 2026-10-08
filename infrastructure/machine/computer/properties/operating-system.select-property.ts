import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const operatingSystem = {
  id: "01a0658c-329a-7dce-bdbd-00b709366c9f",
  type: "page-type/select-property",
  slug: "operating-system",
  propertySlug: "operating-system",
  definition: "which system it boots",
  values: ["macos-sequoia", "windows-11-home", "windows-10-home", "windows-11-pro"],
  types: "ts",
  createdAt: "2026-09-03T04:34:41.946Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
