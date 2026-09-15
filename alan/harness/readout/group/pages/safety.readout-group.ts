import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const safety = {
  id: "01a05f42-92f5-7003-8df0-f5215872a280",
  type: "readout-group",
  slug: "safety",
  definition: "how safe things are where Alan is",
  figureOffScale: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color reports where Alan is rather than whether Alan did well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level draws its figure at either end of its scale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tile draws that figure alone.",
    },
  ],
} as const satisfies ReadoutGroup
