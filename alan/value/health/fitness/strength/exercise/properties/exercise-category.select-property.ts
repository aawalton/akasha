import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const exerciseCategory = {
  id: "01a0657e-2bbf-7a67-8e51-2974d08e36a8",
  type: "page-type/select-property",
  slug: "exercise-category",
  propertySlug: "exercise-category",
  definition: "the broad training discipline the movement belongs to",
  values: [
    "cardio",
    "olympic-weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
    "strongman",
  ],
  types: "ts",
  createdAt: "2026-09-03T04:19:22.687Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
