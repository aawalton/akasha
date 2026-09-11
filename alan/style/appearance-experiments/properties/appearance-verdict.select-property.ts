import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const appearanceVerdict = {
  id: "01a0685d-b81f-78c9-9b3a-ff743482a129",
  type: "select-property",
  slug: "appearance-verdict",
  propertySlug: "verdict",
  definition: "what an experiment leaves Alan doing with the thing next",
  values: ["keep", "tweak", "drop"],
  types: "ts",
} as const satisfies SelectProperty
