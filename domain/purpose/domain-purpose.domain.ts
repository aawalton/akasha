import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const domainPurpose = {
  id: "01a06815-ceaf-7ec0-aa99-46a5438ce629",
  type: "page-type/domain",
  slug: "domain-purpose",
  definition: "something a choice is made to serve",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing that only helps another purpose is not a purpose.",
    },
  ],
} as const satisfies Domain
