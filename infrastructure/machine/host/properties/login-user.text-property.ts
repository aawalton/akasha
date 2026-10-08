import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loginUser = {
  id: "01a07c91-865a-7319-9007-975934b929e4",
  type: "page-type/text-property",
  slug: "login-user",
  propertySlug: "login-user",
  definition: "the account a script signs in to the host as",
  maxLength: 32,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-07T15:51:47.034Z",
  updatedAt: "2026-09-15T17:18:57.000Z",
} as const satisfies TextProperty
