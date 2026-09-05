import type { Domain } from "../domain.page-type.ts"

export const domainChampions = {
  id: "01a0675b-16de-790e-8eea-52afc2046700",
  pageTypeSlug: "domain",
  slug: "domain-champions",
  definition: "one persona answering for one domain",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every domain has a champion.",
    },
    {
      invariantKind: "stopgap",
      statement: "No two personas champion one domain.",
    },
    {
      invariantKind: "gap",
      statement: "A domain no persona names takes the champion of the domain above.",
    },
    {
      invariantKind: "departure",
      statement: "Any agent may change a domain without asking that domain's champion.",
    },
  ],
} as const satisfies Domain
