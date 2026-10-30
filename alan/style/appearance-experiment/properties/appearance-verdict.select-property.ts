import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const appearanceVerdict = {
  id: "01a0685d-b81f-78c9-9b3a-ff743482a129",
  type: "page-type/select-property",
  slug: "appearance-verdict",
  propertySlug: "verdict",
  definition: "what Alan does with the thing after an appearance experiment",
  values: ["keep", "tweak", "drop"],
  types: "ts",
  createdAt: "2026-09-03T17:42:47.583Z",
  updatedAt: "2026-10-30T16:30:27.895Z",
} as const satisfies SelectProperty
