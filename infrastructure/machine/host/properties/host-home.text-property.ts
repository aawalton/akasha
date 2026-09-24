import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const hostHome = {
  id: "01a0d59f-f8bb-704b-96b0-1c12d442e061",
  type: "page-type/text-property",
  slug: "host-home",
  propertySlug: "home",
  definition: "the home folder of the account a script signs in to the host as",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
