import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const signInProvider = {
  id: "01a0bae9-dc45-7cb3-a9cc-064293500f07",
  type: "page-type/text-property",
  slug: "sign-in-provider",
  propertySlug: "provider",
  definition: "the service whose word says who a person is",
  maxLength: 20,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
