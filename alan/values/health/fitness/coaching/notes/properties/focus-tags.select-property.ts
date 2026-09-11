import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const focusTags = {
  id: "01a0657a-fe00-7a03-baad-8bd900be24b0",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "focus-tags",
  propertySlug: "focus-tags",
  definition: "which training focuses a note reaches",
  values: [
    "push",
    "pull",
    "legs",
    "upper",
    "lower",
    "full-body",
    "core",
    "conditioning",
    "flex",
    "all",
  ],
  types: "ts",
} as const satisfies SelectProperty
