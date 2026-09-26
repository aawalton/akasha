import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const imageIntelligence = {
  id: "01a0de72-77be-7c13-80f8-8de70a92f5de",
  type: "page-type/domain",
  slug: "image-intelligence",
  definition: "how a service is used to read what a picture shows",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Claude's own vision judges a picture below Alan's quality bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan judges the quality of a picture himself.",
    },
  ],
} as const satisfies Domain
