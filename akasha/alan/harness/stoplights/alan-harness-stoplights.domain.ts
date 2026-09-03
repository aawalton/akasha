import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const alanHarnessStoplights = {
  id: "01a0655b-9cdd-7169-bede-e916a8a6bd42",
  pageTypeSlug: "domain",
  slug: "alan-harness-stoplights",
  definition: "how Alan knows what to do next",
  partSlugs: [
    "readout-group/upkeep",
    "readout-group/attributes",
    "readout-group/inboxes",
    "readout-group/values",
  ],
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
