import type { TextProperty } from "@akasha/pages/text-property"

export type HostAddress = string

export const hostAddress = {
  id: "01a07c91-58b9-7703-9263-891c8377ebae",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "host-address",
  propertySlug: "address",
  definition: "where on the house network the host answers",
  maxLength: 45,
  nameFormat: null,
} as const satisfies TextProperty
