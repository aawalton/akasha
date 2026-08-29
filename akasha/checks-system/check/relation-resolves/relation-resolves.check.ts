import type { Check } from "../check.page-type.ts"

export const relationResolves = {
  id: "01a04d99-71ca-7e06-9f74-3a462cb7d4fb",
  pageTypeSlug: "check",
  slug: "relation-resolves",
  definition:
    "the check refusing a page that names a relation reaching no page, and a non-mortal page that names a mortal one",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "departure",
      statement:
        "Which of a page's keys are relations is read from the property schema in the index, never from a list written here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name reaches the index and the pages the change itself carries, so a page and the page it names land together.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the change takes away stops being reachable, and the pages the index says name it are judged though the change never names them.",
    },
    {
      invariantKind: "departure",
      statement: "A name narrowing to more than one page is refused, not taken as reached.",
    },
    {
      invariantKind: "departure",
      statement: "A mortal page is never refused for a name reaching no page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A non-mortal page naming a mortal page is refused, judged on the page type the name reaches, or on the property's declared target when it reaches none.",
    },
    {
      invariantKind: "gap",
      statement:
        "The page types a bare name is looked for under are the ones already landed, so a bare name reaching a page of a page type the same change adds is refused.",
    },
  ],
} as const satisfies Check
