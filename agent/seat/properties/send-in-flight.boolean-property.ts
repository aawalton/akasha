import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const sendInFlight = {
  id: "01a0541c-db61-743b-b5b2-9614897763f3",
  type: "page-type/boolean-property",
  slug: "send-in-flight",
  propertySlug: "send-in-flight",
  definition: "whether a seat waits on a message sent by the seat",
  types: "ts",
} as const satisfies BooleanProperty
