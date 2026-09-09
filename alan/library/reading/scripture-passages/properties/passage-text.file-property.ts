import type { FileProperty } from "@akasha/pages/file-property"

export type PassageText = "txt"

export const passageText = {
  id: "01a0658d-fe50-7002-8242-3b80df68cd8f",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "passage-text",
  propertySlug: "passage-text",
  definition: "the verses a passage is made of",
} as const satisfies FileProperty
