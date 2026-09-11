import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const pythonVersion = {
  id: "01a09094-d9f5-70cd-8f63-11c96376ec8d",
  type: "text-property",
  slug: "python-version",
  propertySlug: "python-version",
  definition: "the python a service's environment is built with",
  maxLength: 20,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
