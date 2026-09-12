import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const focus = {
  id: "01a0657a-e62d-7b35-94f4-44d27343d54f",
  type: "select-property",
  slug: "focus",
  propertySlug: "focus",
  definition: "what the day trains",
  values: ["legs", "pull", "push", "rest"],
  types: "ts",
} as const satisfies SelectProperty
