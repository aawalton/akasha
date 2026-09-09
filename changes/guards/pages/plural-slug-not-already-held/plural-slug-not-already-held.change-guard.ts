import type { ChangeGuard } from "../../change-guard.page-type.ts"

export const pluralSlugNotAlreadyHeld = {
  id: "01a07984-8ee9-7d24-bca8-2d2d1b16ae97",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "plural-slug-not-already-held",
  changeTargetType: "change-target-type/file-content",
  definition:
    "the guard refusing an answer writing a page type whose plural slug another page type states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page types judged against are read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the answer writes is judged against every other page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is no page type is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating no plural slug is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "One plural slug two page types state refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the page already stating that plural slug.",
    },
    {
      invariantKind: "departure",
      statement: "A path under no page name is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
  ],
} as const satisfies ChangeGuard
