import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const content = {
  id: "01a06861-49aa-7da0-ac90-203f33e32ff4",
  type: "file-property",
  slug: "content",
  propertySlug: "content",
  definition: "the body a provisioned file is put in place with",
  extensions: ["sh", "conf", "json"],
  writtenBy: "module-property-group/filling",
  types: "ts",
} as const satisfies FileProperty
