import type { BooleanProperty } from "../../pages/boolean-properties/boolean-property.page-type.ts"

export type IsCommand = boolean

export const isCommand = {
  id: "01a0770b-b274-73c9-9437-2c09f28aee2a",
  pageTypeSlug: "boolean-property",
  slug: "is-command",
  propertySlug: "is-command",
  definition: "whether a change is reached from the command line",
} as const satisfies BooleanProperty
