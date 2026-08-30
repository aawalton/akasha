import type { Check } from "../check.page-type.ts"

export const relationResolves = {
  id: "01a04d99-71ca-7e06-9f74-3a462cb7d4fb",
  pageTypeSlug: "check",
  slug: "relation-resolves",
  definition:
    "the check refusing a name that reaches no page, and a non-mortal page that names a mortal one",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which of a page's keys are relations is read from the property schema in the index rather than from a list written here.",
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
      statement: "The pages the index says name it are judged though the change never names them.",
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
      statement: "A non-mortal page naming a mortal page is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "It is judged on the page type the name reaches or on the property's declared target when it reaches none.",
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
      statement: "Which pages named a page being taken away is read from the index as it stands.",
    },
  ],
} as const satisfies Check
