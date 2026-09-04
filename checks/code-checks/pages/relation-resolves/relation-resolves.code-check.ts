import type { CodeCheck } from "../../code-check.page-type.ts"

export const relationResolves = {
  id: "01a04d99-71ca-7e06-9f74-3a462cb7d4fb",
  pageTypeSlug: "code-check",
  slug: "relation-resolves",
  definition:
    "the check refusing a name that reaches no page, and a non-mortal page that names a mortal one",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: false,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which of a page's keys are relations is read from the index rather than from a list written here.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaches the index and the pages the change itself carries.",
    },
    {
      invariantKind: "departure",
      statement: "A page the change takes away stops being reachable.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the index says names a page being taken away is judged though the change names no such page.",
    },
    {
      invariantKind: "departure",
      statement: "A name narrowing to more than one page is refused rather than taken as reached.",
    },
    {
      invariantKind: "departure",
      statement: "A mortal page is never refused for a name reaching no page.",
    },
    {
      invariantKind: "departure",
      statement: "Mortality is judged on the page type the name reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no page is judged on the property's declared target.",
    },
    {
      invariantKind: "departure",
      statement: "A property declaring more than one target is judged on the page a name reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A name nested one record deep is resolved.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the record and the field.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaches a page of a page type the change itself adds.",
    },
    {
      invariantKind: "departure",
      statement: "A relation property the change introduces is judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pages named a page being taken away is read from the index as the change leaves the index.",
    },
    {
      invariantKind: "departure",
      statement: "The id of a page being taken away is read from the body the change takes away.",
    },
  ],
} as const satisfies CodeCheck
