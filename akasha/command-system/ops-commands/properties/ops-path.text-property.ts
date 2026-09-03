import type { TextProperty } from "@akasha/pages-system/text-property"

export type OpsPath = string

export const opsPath = {
  id: "01a068f0-0000-7000-8000-000000000001",
  pageTypeSlug: "text-property",
  slug: "ops-path",
  propertySlug: "ops-path",
  definition: "the words typed after `ops` to reach a command",
  max: 60,
  nameFormatSlug: null,
} as const satisfies TextProperty
