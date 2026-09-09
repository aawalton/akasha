import type { ChangeGuard } from "../../change-guard.page-type.ts"

export const pageTypeCarriesNoPages = {
  id: "01a0798b-75e5-74cb-96a6-d72e53dc5424",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "page-type-carries-no-pages",
  changeTargetType: "change-target-type/file-content",
  definition:
    "the guard refusing an answer taking a page type away that pages are still filed under",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a path the naming grammar reads as a page type's page is judged here.",
    },
    {
      invariantKind: "departure",
      statement: "The pages of that page type are read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A page the same answer takes away is filed under that page type no longer.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the index still files a page under refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the page type and the pages filed under that page type.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names five pages and counts the pages past those five.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the working tree or the index on disk.",
    },
  ],
} as const satisfies ChangeGuard
