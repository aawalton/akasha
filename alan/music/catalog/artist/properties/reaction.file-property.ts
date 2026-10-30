import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const reaction = {
  id: "01a06243-144b-7011-8f74-d30df7a6c48b",
  type: "page-type/file-property",
  slug: "reaction",
  propertySlug: "reaction",
  definition: "what Alan feels about an artist whose songs Alan has read",
  extensions: ["txt"],
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-10-30T16:14:48.275Z",
} as const satisfies FileProperty
