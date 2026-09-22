import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const studying = {
  id: "01a06574-0291-7001-9087-db957190cd32",
  type: "page-type/domain",
  slug: "studying",
  definition: "the courses teaching Alan",
  parts: [
    "page-type/great-course",
    "page-type/great-courses-collection",
    "page-type/great-courses-subject",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course is counted in the minutes that course runs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A course sits under every shelf that course belongs to rather than under a single shelf.",
    },
  ],
} as const satisfies Domain
