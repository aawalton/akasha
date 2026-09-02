import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type ReadoutGroup = Domain

export const readoutGroup = {
  id: "01a05446-e75e-7657-acda-566edc2b182e",
  pageTypeSlug: "page-type",
  slug: "readout-group",
  definition: "the readings drawn together",
  pluralSlug: "readout-groups",
  partSlugs: [
    "readout-group/categorization",
    "readout-group/safety",
    "readout-group/surplus",
    "readout-group/upkeep",
  ],
  extendsSlug: "page-type/domain",
} as const satisfies PageType
