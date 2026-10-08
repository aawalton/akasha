import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const referenceEvent = {
  id: "01a06558-a991-7b74-a9b8-26a430ce7964",
  type: "page-type/text-property",
  slug: "reference-event",
  propertySlug: "event",
  definition: "what happened to the mechanic where the text named it",
  maxLength: 36,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-19T11:55:56.000Z",
} as const satisfies TextProperty
