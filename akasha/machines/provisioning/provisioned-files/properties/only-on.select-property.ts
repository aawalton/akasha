import type { SelectProperty } from "@akasha/pages-system/select-property"

export const onlyOn = {
  id: "01a06861-49aa-75eb-b571-52f5d1081aa3",
  pageTypeSlug: "select-property",
  slug: "only-on",
  propertySlug: "only-on",
  definition: "the kind of machine the file is placed on",
  values: ["linux", "macos", "any"],
} as const satisfies SelectProperty

export type OnlyOn = (typeof onlyOn.values)[number]
