import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const infoPlist = {
  id: "01a05901-26b4-7689-892c-e2f96e09c5a5",
  type: "page-type/file-property",
  slug: "info-plist",
  propertySlug: "info-plist",
  definition: "what a build target tells iOS about itself",
  extensions: ["plist"],
  types: "ts",
  createdAt: "2026-08-31T18:07:22.804Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
