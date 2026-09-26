import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const partnersBondStagePoints = {
  id: "01a0dee0-09a4-753e-bd97-b667f523f3cc",
  type: "page-type/number-property",
  slug: "partners-bond-stage-points",
  propertySlug: "points",
  definition: "the bond points at which a bond in Partners reaches a stage",
  nullable: false,
  max: null,
  types: "ts",
} as const satisfies NumberProperty
