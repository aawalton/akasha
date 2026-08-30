import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type SendInFlight = boolean

export const sendInFlight = {
  id: "01a05035-2609-7279-9871-29886efd468d",
  pageTypeSlug: "boolean-property",
  slug: "send-in-flight",
  definition: "whether something sent to a seat has not been answered",
} as const satisfies BooleanProperty
