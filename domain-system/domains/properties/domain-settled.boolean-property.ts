import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type DomainSettled = boolean

export const domainSettled = {
  id: "01a06935-8f87-7c6d-a0bd-8888b95d9229",
  pageTypeSlug: "boolean-property",
  slug: "domain-settled",
  propertySlug: "settled",
  definition: "a domain's own record that it is settled",
} as const satisfies BooleanProperty
