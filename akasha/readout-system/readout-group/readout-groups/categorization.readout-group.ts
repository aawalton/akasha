import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const categorization = {
  id: "01a05455-7631-7e29-b225-b04ee2ae4890",
  pageTypeSlug: "readout-group",
  slug: "categorization",
  definition: "how much of the transaction record is still unreviewed",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The backlog counted is a year's.",
    },
    {
      invariantKind: "departure",
      statement: "The tap opens Monarch filtered only where Monarch was not already running.",
    },
  ],
} as const satisfies ReadoutGroup
