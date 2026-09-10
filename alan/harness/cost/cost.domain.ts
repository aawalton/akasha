import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const cost = {
  id: "01a08b96-f6dd-7d5f-b99c-f87675def793",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "cost",
  definition: "what the stretch Alan is in costs him for each hour it runs",
  parts: [
    "module/cost-color",
    "module/cost-reading",
    "module/cost-stoplight",
    "readout/cost-multiplier",
    "workstation-service/cost-reading-service",
    "workstation-service/cost-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The cost is the multiplier the open block's safety and difficulty price it at.",
    },
    {
      invariantKind: "departure",
      statement: "A cost of one is the most Alan can pay all day without draining.",
    },
    {
      invariantKind: "departure",
      statement: "The color a cost takes is read with the surplus rather than from the cost alone.",
    },
    {
      invariantKind: "constraint",
      statement: "A cost nothing can be read for is shown as no signal rather than as a zero.",
    },
  ],
} as const satisfies Domain
