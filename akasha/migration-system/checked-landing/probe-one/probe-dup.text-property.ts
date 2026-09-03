import type { TextProperty } from "@akasha/pages-system/text-property"

export type ProbeDup = string

export const probeDup = {
  id: "01a06600-0000-7000-8000-000000000001",
  pageTypeSlug: "text-property",
  slug: "probe-dup",
  propertySlug: "probe-dup",
  definition: "a seeded control that proves whether a shared entry file is trimmed 1",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
