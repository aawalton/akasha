import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const infoPlist = {
  id: "01a05901-26b4-7689-892c-e2f96e09c5a5",
  type: "file-property",
  slug: "info-plist",
  propertySlug: "info-plist",
  definition: "what a build target tells iOS about itself",
  extensions: ["plist"],
  types: "ts",
} as const satisfies FileProperty
