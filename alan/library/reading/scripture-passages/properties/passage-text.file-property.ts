import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const passageText = {
  id: "01a0658d-fe50-7002-8242-3b80df68cd8f",
  type: "file-property",
  slug: "passage-text",
  propertySlug: "passage-text",
  definition: "the verses a passage is made of",
  extensions: ["txt"],
  types: "ts",
} as const satisfies FileProperty
