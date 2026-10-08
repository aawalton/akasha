import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const siteIcon = {
  id: "01a08187-7c07-777d-8407-7f0bbc1cf95e",
  type: "page-type/file-property",
  slug: "site-icon",
  propertySlug: "site-icon",
  definition: "the icon a browser shows for an app",
  extensions: ["svg"],
  fileName: "public/favicon.svg",
  types: "ts",
  createdAt: "2026-09-08T14:58:55.111Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
