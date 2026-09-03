import type { FileProperty } from "@akasha/pages-system/file-property"

export type Instructions = "txt"

export const instructions = {
  id: "01a0657b-1ad2-7f33-8ce6-e8cf9c33c6b5",
  pageTypeSlug: "file-property",
  slug: "instructions",
  propertySlug: "instructions",
  definition: "how a movement is performed, step by step",
} as const satisfies FileProperty
