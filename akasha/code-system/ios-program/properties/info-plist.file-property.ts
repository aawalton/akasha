import type { FileProperty } from "@akasha/pages-system/file-property"

export type InfoPlist = "plist"

export const infoPlist = {
  id: "01a05901-26b4-7689-892c-e2f96e09c5a5",
  pageTypeSlug: "file-property",
  slug: "info-plist",
  propertySlug: "info-plist",
  definition: "what a build target tells iOS about itself",
} as const satisfies FileProperty
