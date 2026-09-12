import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const uniqueKind = {
  id: "01a04edd-897d-7e60-9206-d1b3a52bea1f",
  type: "page-type",
  slug: "unique-kind",
  definition: "which pages a property's value is unique among",
  pluralSlug: "unique-kinds",
  parts: ["unique-kind/page", "unique-kind/page-property", "unique-kind/page-type"],
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Uniqueness names the pages a value is unique among rather than being yes or no.",
    },
  ],
  types: "ts",
} as const satisfies PageType
