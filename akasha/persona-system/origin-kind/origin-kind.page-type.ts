import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

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
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is taken from a language, taken from a work, or made for her.",
    },
  ],
} as const satisfies PageType
