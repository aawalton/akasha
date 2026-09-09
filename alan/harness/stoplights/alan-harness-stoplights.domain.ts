import type { Domain } from "../../../domains/domain.page-type.ts"

export const alanHarnessStoplights = {
  id: "01a0655b-9cdd-7169-bede-e916a8a6bd42",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "alan-harness-stoplights",
  definition: "how Alan knows what to do next",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Every difference between two readouts is written on those readouts.",
    },
    {
      invariantKind: "gap",
      statement: "No code names a readout or a readout group.",
    },
  ],
} as const satisfies Domain
