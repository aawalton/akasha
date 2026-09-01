import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const serviceOperationalChange = {
  id: "01a05df1-e263-73c0-8b58-8a1b925e557b",
  pageTypeSlug: "domain",
  slug: "service-operational-change",
  definition: "a change a service makes as it runs",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service works out what a service-operational change carries.",
    },
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
    {
      invariantKind: "stopgap",
      statement: "The page store lands any body a caller hands it.",
    },
    {
      invariantKind: "stopgap",
      statement: "No check judges what the page store lands.",
    },
    {
      invariantKind: "gap",
      statement: "No service lands a body its caller handed it.",
    },
  ],
} as const satisfies Domain
