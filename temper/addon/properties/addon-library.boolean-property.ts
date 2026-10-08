import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const addonLibrary = {
  id: "01a0c4d0-afa1-7690-adee-dfdbfa46efd2",
  type: "page-type/boolean-property",
  slug: "addon-library",
  propertySlug: "library",
  definition: "whether other add-ons call this one rather than a player running it",
  types: "ts",
  createdAt: "2026-09-21T16:33:25.921Z",
  updatedAt: "2026-09-21T16:41:05.000Z",
} as const satisfies BooleanProperty
