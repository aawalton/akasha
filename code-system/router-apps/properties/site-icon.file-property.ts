import type { FileProperty } from "@akasha/pages/file-property"

export type SiteIcon = "svg"

export const siteIcon = {
  id: "01a08187-7c07-777d-8407-7f0bbc1cf95e",
  pageTypeSlug: "file-property",
  slug: "site-icon",
  propertySlug: "site-icon",
  definition: "the icon a browser shows for an app",
  fileName: "public/favicon.svg",
} as const satisfies FileProperty
