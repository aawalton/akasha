import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const domainChampion = {
  id: "01a0675b-16de-790e-8eea-52afc2046700",
  type: "page-type/domain",
  slug: "domain-champion",
  definition: "a persona that champions a domain",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every domain has a champion.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "No two personas champion one domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain no persona names takes the champion of the domain above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any agent may change a domain without asking that domain's champion.",
    },
  ],
} as const satisfies Domain
