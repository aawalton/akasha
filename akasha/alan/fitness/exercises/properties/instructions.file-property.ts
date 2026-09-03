import type { FileProperty } from "@akasha/pages-system/file-property"

export type Instructions = "txt"

export const instructions = {
  id: "01a0657e-2bc0-73ec-8b7f-ffb3a36fd430",
  pageTypeSlug: "file-property",
  slug: "instructions",
  propertySlug: "instructions",
  definition: "how a movement is performed, step by step",
} as const satisfies FileProperty
