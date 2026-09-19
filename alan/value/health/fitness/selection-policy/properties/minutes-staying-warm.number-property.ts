import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const minutesStayingWarm = {
  id: "01a0b75a-1826-723d-852a-0191a5cc695f",
  type: "page-type/number-property",
  slug: "minutes-staying-warm",
  propertySlug: "minutes-staying-warm",
  definition: "how many minutes a set keeps Alan warm after that set",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
