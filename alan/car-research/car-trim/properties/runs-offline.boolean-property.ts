import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const runsOffline = {
  id: "01a0c542-5dde-7280-bf41-3d8b8908b48e",
  type: "page-type/boolean-property",
  slug: "runs-offline",
  propertySlug: "runs-offline",
  definition: "whether the car drives and works with no network reaching it",
  types: "ts",
} as const satisfies BooleanProperty
