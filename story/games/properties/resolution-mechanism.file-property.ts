import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type ResolutionMechanism = "json"

export const resolutionMechanism = {
  id: "01a0673c-8e0e-7013-ae6f-047f588f0390",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "resolution-mechanism",
  propertySlug: "resolution-mechanism",
  definition: "the machinery a game settles an action with",
} as const satisfies FileProperty
