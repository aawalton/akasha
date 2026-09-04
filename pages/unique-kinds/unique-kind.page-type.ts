import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "../page-types/page-type.page-type.ts"

export type UniqueKind = Domain

export const uniqueKind = {
  id: "01a04edd-897d-7e60-9206-d1b3a52bea1f",
  pageTypeSlug: "page-type",
  slug: "unique-kind",
  definition: "which reach a property's value is unique across",
  pluralSlug: "unique-kinds",
  partSlugs: ["unique-kind/always", "unique-kind/page-type", "unique-kind/part-of"],
  extendsSlug: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Uniqueness is a reach rather than a yes or no answer.",
    },
  ],
} as const satisfies PageType
