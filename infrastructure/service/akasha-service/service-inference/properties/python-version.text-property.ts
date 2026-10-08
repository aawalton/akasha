import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const pythonVersion = {
  id: "01a09094-d9f5-70cd-8f63-11c96376ec8d",
  type: "page-type/text-property",
  slug: "python-version",
  propertySlug: "python-version",
  definition: "the python of a service's environment",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-11T13:07:49.365Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies TextProperty
