import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const safety = {
  id: "01a05f42-92f5-7003-8df0-f5215872a280",
  pageTypeSlug: "readout-group",
  slug: "safety",
  definition: "how safe things are where Alan is",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The color reports where Alan is rather than whether Alan did well.",
    },
  ],
} as const satisfies ReadoutGroup
