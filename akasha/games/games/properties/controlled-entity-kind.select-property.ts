import type { SelectProperty } from "@akasha/pages-system/select-property"

export const controlledEntityKind = {
  id: "01a0673c-8e0e-7007-846b-f52757583f80",
  pageTypeSlug: "select-property",
  slug: "controlled-entity-kind",
  propertySlug: "controlled-entity-kind",
  definition: "how many characters the player holds at once",
  values: ["single"],
} as const satisfies SelectProperty

export type ControlledEntityKind = (typeof controlledEntityKind.values)[number]
