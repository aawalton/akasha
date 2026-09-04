import type { FileProperty } from "@akasha/pages-system/file-property"

export type Entitlements = "entitlements"

export const entitlements = {
  id: "01a05901-26b4-700d-b414-a3f259d1d170",
  pageTypeSlug: "file-property",
  slug: "entitlements",
  propertySlug: "entitlements",
  definition: "the capabilities a signed target is granted",
} as const satisfies FileProperty
