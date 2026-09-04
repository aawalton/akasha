import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type OriginKind = Domain

export const originKind = {
  id: "01a05361-6286-7dcd-a5b1-16a97d9c1932",
  pageTypeSlug: "page-type",
  slug: "origin-kind",
  definition: "where a persona's name comes from",
  pluralSlug: "origin-kinds",
  partSlugs: [
    "origin-kind/canon",
    "origin-kind/celtic",
    "origin-kind/greek",
    "origin-kind/hebrew",
    "origin-kind/human",
    "origin-kind/invented",
    "origin-kind/norse",
    "origin-kind/sanskrit",
    "origin-kind/welsh",
  ],
  extendsSlug: ["page-type/domain"],
} as const satisfies PageType
