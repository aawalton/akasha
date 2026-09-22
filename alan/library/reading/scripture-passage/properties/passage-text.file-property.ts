import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const passageText = {
  id: "01a0658d-fe50-7002-8242-3b80df68cd8f",
  type: "page-type/file-property",
  slug: "passage-text",
  propertySlug: "passage-text",
  definition: "a passage's verses",
  extensions: ["txt"],
  types: "ts",
} as const satisfies FileProperty
