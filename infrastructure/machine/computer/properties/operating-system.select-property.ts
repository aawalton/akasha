import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const operatingSystem = {
  id: "01a0658c-329a-7dce-bdbd-00b709366c9f",
  type: "page-type/select-property",
  slug: "operating-system",
  propertySlug: "operating-system",
  definition: "which system it boots",
  values: ["macos-sequoia", "windows-11-home", "windows-10-home", "windows-11-pro"],
  types: "ts",
} as const satisfies SelectProperty
