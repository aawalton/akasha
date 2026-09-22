import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const threadStatus = {
  id: "01a0c94a-3bb2-7f00-a585-c85c769d62cb",
  type: "page-type/text-property",
  slug: "thread-status",
  propertySlug: "status",
  definition: "where a thread is: open while the play has not answered it, closed once it has",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
