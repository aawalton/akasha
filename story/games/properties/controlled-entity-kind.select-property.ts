import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const controlledEntityKind = {
  id: "01a0673c-8e0e-7007-846b-f52757583f80",
  type: "select-property",
  slug: "controlled-entity-kind",
  propertySlug: "controlled-entity-kind",
  definition: "how many characters the player has at once",
  values: ["single"],
  types: "ts",
} as const satisfies SelectProperty
