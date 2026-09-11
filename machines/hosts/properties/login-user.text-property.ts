import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const loginUser = {
  id: "01a07c91-865a-7319-9007-975934b929e4",
  type: "text-property",
  slug: "login-user",
  propertySlug: "login-user",
  definition: "the account a script signs in to the host as",
  maxLength: 32,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
