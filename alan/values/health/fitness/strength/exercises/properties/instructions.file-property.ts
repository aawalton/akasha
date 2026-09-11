import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const instructions = {
  id: "01a0657e-2bc0-73ec-8b7f-ffb3a36fd430",
  type: "file-property",
  slug: "instructions",
  propertySlug: "instructions",
  definition: "how a movement is performed, step by step",
  extensions: ["txt"],
  types: "ts",
} as const satisfies FileProperty
