import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type UniqueKind = Domain

export const uniqueKind = {
  id: "01a04edd-897d-7e60-9206-d1b3a52bea1f",
  pageTypeSlug: "page-type",
  slug: "unique-kind",
  definition: "which reach a property's value is unique across",
  extendsSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Uniqueness is a reach rather than a yes or no, so a property says how far its value is unique.",
    },
  ],
} as const satisfies PageType
