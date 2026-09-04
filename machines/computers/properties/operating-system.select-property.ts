import type { SelectProperty } from "@akasha/pages-system/select-property"

export const operatingSystem = {
  id: "01a0658c-329a-7dce-bdbd-00b709366c9f",
  pageTypeSlug: "select-property",
  slug: "operating-system",
  propertySlug: "operating-system",
  definition: "which system it boots",
  values: ["macos-sequoia", "windows-11-home", "windows-10-home", "windows-11-pro"],
} as const satisfies SelectProperty

export type OperatingSystem = (typeof operatingSystem.values)[number]
