import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanHarnessStoplight = {
  id: "01a0655b-9cdd-7169-bede-e916a8a6bd42",
  type: "domain",
  slug: "alan-harness-stoplight",
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
