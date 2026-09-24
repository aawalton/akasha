import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const inboxFindingsClearedToday = {
  id: "01a0d477-358f-78c4-b78a-df00cb3cba99",
  type: "page-type/boolean-property",
  slug: "inbox-findings-cleared-today",
  propertySlug: "inbox-findings-cleared-today",
  definition: "whether the findings reached empty on a day",
  types: "ts",
} as const satisfies BooleanProperty
