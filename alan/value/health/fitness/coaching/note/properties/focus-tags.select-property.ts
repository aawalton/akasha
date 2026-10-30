import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const focusTags = {
  id: "01a0657a-fe00-7a03-baad-8bd900be24b0",
  type: "page-type/select-property",
  slug: "focus-tags",
  propertySlug: "focus-tags",
  definition: "the kinds of training a note guides",
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
  createdAt: "2026-09-03T04:15:54.368Z",
  updatedAt: "2026-10-30T16:54:50.382Z",
} as const satisfies SelectProperty
