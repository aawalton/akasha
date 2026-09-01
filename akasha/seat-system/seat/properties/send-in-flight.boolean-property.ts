import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type SendInFlight = boolean

export const sendInFlight = {
  id: "01a0541c-db61-743b-b5b2-9614897763f3",
  pageTypeSlug: "boolean-property",
  slug: "send-in-flight",
  propertySlug: "send-in-flight",
  definition: "whether something a seat sent has not been answered",
} as const satisfies BooleanProperty
