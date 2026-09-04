import type { Domain } from "./domain.page-type.ts"

export const domainChampioning = {
  id: "01a0675b-16de-790e-8eea-52afc2046700",
  pageTypeSlug: "domain",
  slug: "domain-championing",
  definition: "one persona answering for one domain",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every domain has exactly one champion, and every champion exactly one domain.",
    },
    {
      invariantKind: "gap",
      statement:
        "A domain naming a persona is championed by her rather than by whoever champions its parent.",
    },
    {
      invariantKind: "gap",
      statement: "A champion answers for a domain, and any agent may change it without asking her.",
    },
    {
      invariantKind: "gap",
      statement: "Championing descends the parent tree from wherever a persona is named.",
    },
  ],
} as const satisfies Domain
