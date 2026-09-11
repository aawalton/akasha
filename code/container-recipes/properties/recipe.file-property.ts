import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const recipe = {
  id: "01a06815-9efd-7004-9d6a-efd331d652ce",
  type: "file-property",
  slug: "recipe",
  propertySlug: "recipe",
  definition: "the steps an image is built by",
  extensions: ["dockerfile"],
  fileName: "Containerfile",
  generated: true,
  writtenBy: "module-property-group/composing",
  types: "ts",
} as const satisfies FileProperty
