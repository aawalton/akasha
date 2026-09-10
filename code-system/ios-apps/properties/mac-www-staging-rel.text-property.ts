import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type MacWwwStagingRel = string

export const macWwwStagingRel = {
  id: "01a06289-79d5-7187-949f-5e5c020a1272",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "mac-www-staging-rel",
  propertySlug: "mac-www-staging-rel",
  definition: "where an app's site is staged on the mac, read against the home directory",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
