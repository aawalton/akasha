import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const content = {
  id: "01a06861-49aa-7da0-ac90-203f33e32ff4",
  type: "page-type/file-property",
  slug: "content",
  propertySlug: "content",
  definition: "a provisioned file's body",
  extensions: ["sh", "conf", "json"],
  writtenBy: "module-property-group/filling",
  types: "ts",
  createdAt: "2026-09-03T17:46:41.450Z",
  updatedAt: "2026-09-22T13:58:21.000Z",
} as const satisfies FileProperty
