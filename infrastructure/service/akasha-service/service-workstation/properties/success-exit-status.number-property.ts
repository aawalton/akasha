import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const successExitStatus = {
  id: "01a06738-9f12-724d-8c06-c1f4e4e3bc35",
  type: "page-type/number-property",
  slug: "success-exit-status",
  propertySlug: "success-exit-status",
  definition: "an exit code a unit ending on is counted as a clean stop",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
