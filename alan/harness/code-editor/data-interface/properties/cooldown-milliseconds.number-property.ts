import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const cooldownMilliseconds = {
  id: "01a07235-8d03-7f26-ac3e-ac03771b126c",
  type: "page-type/number-property",
  slug: "cooldown-milliseconds",
  propertySlug: "cooldown-milliseconds",
  definition: "how many milliseconds a file waits between writes",
  max: null,
  types: "ts",
  createdAt: "2026-09-05T15:35:07.267Z",
  updatedAt: "2026-10-30T15:35:05.061Z",
} as const satisfies NumberProperty
