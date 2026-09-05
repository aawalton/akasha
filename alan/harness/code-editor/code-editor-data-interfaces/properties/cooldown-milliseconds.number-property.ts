import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CooldownMilliseconds = number

export const cooldownMilliseconds = {
  id: "01a07235-8d03-7f26-ac3e-ac03771b126c",
  pageTypeSlug: "number-property",
  slug: "cooldown-milliseconds",
  propertySlug: "cooldown-milliseconds",
  definition: "how long changes to one file are collected before that file is written again",
  max: null,
} as const satisfies NumberProperty
