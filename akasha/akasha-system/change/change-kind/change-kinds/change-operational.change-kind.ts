import type { ChangeKind } from "../change-kind.page-type.ts"

export const changeOperational = {
  id: "01a05df1-e263-73c0-8b58-8a1b925e557b",
  pageTypeSlug: "change-kind",
  slug: "change-operational",
  definition: "a change a service makes",
  runsChecks: false,
  runsWarrants: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "No agent composed what an operational change carries.",
    },
    {
      invariantKind: "departure",
      statement: "The code a service runs was judged when it was authored.",
    },
    {
      invariantKind: "stopgap",
      statement: "An operational change states a boolean saying no agent ran it.",
    },
    {
      invariantKind: "gap",
      statement: "An operational change names the service that made it.",
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
      statement: "No service lands a body an agent handed it.",
    },
  ],
} as const satisfies ChangeKind
