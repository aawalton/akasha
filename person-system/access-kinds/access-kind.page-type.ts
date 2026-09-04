import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type AccessKind = Domain

export const accessKind = {
  id: "01a0542d-0f75-73b3-a578-8d20baddb655",
  pageTypeSlug: "page-type",
  slug: "access-kind",
  definition: "which sort of thing an access reaches",
  pluralSlug: "access-kinds",
  partSlugs: [
    "access-kind/database-row",
    "access-kind/domain",
    "access-kind/page-type",
    "access-kind/route",
  ],
  extendsSlug: ["page-type/domain"],
} as const satisfies PageType
