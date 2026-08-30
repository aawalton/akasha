import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type AuthorityKind = Domain

export const authorityKind = {
  id: "01a0542d-0f76-7ac0-97f4-c19e1d035437",
  pageTypeSlug: "page-type",
  slug: "authority-kind",
  definition: "which sort of act an authority permits",
  pluralSlug: "authority-kinds",
  partSlugs: [
    "authority-kind/domain",
    "authority-kind/feature-approval",
    "authority-kind/feature-request",
    "authority-kind/page-data",
    "authority-kind/page-schema",
  ],
  extendsSlug: "page-type/domain",
} as const satisfies PageType
