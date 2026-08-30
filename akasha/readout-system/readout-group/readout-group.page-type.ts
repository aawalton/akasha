import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type ReadoutGroup = Domain

export const readoutGroup = {
  id: "01a05446-e75e-7657-acda-566edc2b182e",
  pageTypeSlug: "page-type",
  slug: "readout-group",
  definition: "the readings drawn together",
  pluralSlug: "readout-groups",
  partSlugs: ["readout-group/categorization"],
  extendsSlug: "page-type/domain",
} as const satisfies PageType
