import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const serviceOperationalChange = {
  id: "01a05df1-e263-73c0-8b58-8a1b925e557b",
  pageTypeSlug: "domain",
  slug: "service-operational-change",
  definition: "a change a service makes to operational state",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A service-operational change is judged by no check.",
    },
    {
      invariantKind: "absence",
      statement: "A service-operational change owes no reading.",
    },
    {
      invariantKind: "departure",
      statement: "The code a service runs was judged when it was authored.",
    },
    {
      invariantKind: "stopgap",
      statement: "A service-operational change states a boolean saying no agent ran it.",
    },
    {
      invariantKind: "gap",
      statement: "A service-operational change names the service that made it.",
    },
  ],
} as const satisfies Domain
