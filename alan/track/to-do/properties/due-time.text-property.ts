import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const dueTime = {
  id: "01a065a1-49b7-75e1-a270-9a54bc7948cf",
  type: "page-type/text-property",
  slug: "due-time",
  propertySlug: "due-time",
  definition: "the time of day a to-do is due",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-03T04:57:44.119Z",
  updatedAt: "2026-10-30T16:43:27.206Z",
} as const satisfies TextProperty
