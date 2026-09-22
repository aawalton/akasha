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
} as const satisfies TextProperty
