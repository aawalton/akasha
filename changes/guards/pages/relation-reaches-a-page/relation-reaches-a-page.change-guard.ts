import type { ChangeGuard } from "../../change-guard.page-type.types.ts"

export const relationReachesAPage = {
  id: "01a07976-d28f-7fac-9491-0467366b86b4",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "relation-reaches-a-page",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer whose written page names a page reaching nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page judged is read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "Which of a page's keys are relations is read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaches a page the answer itself writes.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no page refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the property the name is held under.",
    },
    {
      invariantKind: "departure",
      statement: "A path under no page name is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a page may name a mortal page is judged by `relation-resolves`.",
    },
  ],
} as const satisfies ChangeGuard
