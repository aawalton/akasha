import type { SelectProperty } from "@akasha/pages-system/select-property"

export const focusTags = {
  id: "01a0657a-fe00-7a03-baad-8bd900be24b0",
  pageTypeSlug: "select-property",
  slug: "focus-tags",
  propertySlug: "focus-tags",
  definition: "which training focuses the constraint reaches",
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
} as const satisfies SelectProperty

export type FocusTags = (typeof focusTags.values)[number]
