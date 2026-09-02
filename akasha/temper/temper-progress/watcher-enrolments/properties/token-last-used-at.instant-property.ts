import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type TokenLastUsedAt = string

export const tokenLastUsedAt = {
  id: "01a05fd3-4363-7e26-a26a-864410b87ea0",
  pageTypeSlug: "instant-property",
  slug: "token-last-used-at",
  propertySlug: "token-last-used-at",
  definition: "when a token was last accepted on a call",
} as const satisfies InstantProperty
