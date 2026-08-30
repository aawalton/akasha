import type { Check } from "../check.page-type.ts"

export const countingNeverFalls = {
  id: "01a05226-b542-768b-901f-5fd86fd38432",
  pageTypeSlug: "check",
  slug: "counting-never-falls",
  definition: "the check holding a page type's count of its pages to only ever rising",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A count standing lower than it stood is refused, because the numbers between would be handed out a second time while the pages holding them still stand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type that counted and no longer states a count is refused, because a count starting over hands out what it handed out before.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type taken away is passed over, its pages going with it and nothing being left to collide with.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type that never counted is passed over, there being no count to have fallen.",
    },
    {
      invariantKind: "departure",
      statement:
        "The two bodies alone are read, so this answers the same whatever the index holds and whether or not it stands.",
    },
    {
      invariantKind: "absence",
      statement:
        "How far the count rose is not judged. That a count and what it counts are stated together is judged by `counting-is-whole`.",
    },
  ],
} as const satisfies Check
