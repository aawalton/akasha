import type { BooleanProperty } from "../../../pages/boolean-properties/boolean-property.page-type.ts"

export type ReadersOweReading = boolean

export const readersOweReading = {
  id: "01a076e3-dd57-7ac5-97e1-dba882addf78",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "readers-owe-reading",
  propertySlug: "readers-owe-reading",
  definition: "whether a change of this kind leaves every other agent owing the reading again",
} as const satisfies BooleanProperty
