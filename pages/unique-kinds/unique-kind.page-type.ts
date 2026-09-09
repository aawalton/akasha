import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "../types/page-type.page-type.ts"

export type UniqueKind = Domain

export const uniqueKind = {
  id: "01a04edd-897d-7e60-9206-d1b3a52bea1f",
  pageTypeSlug: "page-type",
  slug: "unique-kind",
  definition: "which pages a property's value is unique among",
  pluralSlug: "unique-kinds",
  parts: ["unique-kind/page", "unique-kind/page-type", "unique-kind/page-property"],
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Uniqueness names the pages a value is unique among rather than being yes or no.",
    },
  ],
} as const satisfies PageType
