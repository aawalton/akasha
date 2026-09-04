import type { Domain } from "../../../domains/domain.page-type.ts"

export const studying = {
  id: "01a06574-0291-7001-9087-db957190cd32",
  pageTypeSlug: "domain",
  slug: "studying",
  definition: "the courses Alan is taught by",
  partSlugs: [
    "page-type/great-course",
    "page-type/great-courses-collection",
    "page-type/great-courses-subject",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A course is counted in the minutes it runs to.",
    },
    {
      invariantKind: "departure",
      statement: "A course sits under every shelf it belongs to rather than under one.",
    },
  ],
} as const satisfies Domain
