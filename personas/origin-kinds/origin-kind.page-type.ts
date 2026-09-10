import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const originKind = {
  id: "01a05361-6286-7dcd-a5b1-16a97d9c1932",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "origin-kind",
  definition: "where a persona's name comes from",
  pluralSlug: "origin-kinds",
  parts: [
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
  extends: ["page-type/domain"],
  types: "ts",
} as const satisfies PageType
