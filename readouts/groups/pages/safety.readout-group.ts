import type { ReadoutGroup } from "../readout-group.page-type.types.ts"

export const safety = {
  id: "01a05f42-92f5-7003-8df0-f5215872a280",
  pageTypeSlug: "readout-group",
  type: "readout-group",
  slug: "safety",
  definition: "how safe things are where Alan is",
  figureOffScale: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The color reports where Alan is rather than whether Alan did well.",
    },
    {
      invariantKind: "departure",
      statement: "A level draws its figure at either end of its scale.",
    },
    {
      invariantKind: "departure",
      statement: "The tile draws that figure alone.",
    },
  ],
} as const satisfies ReadoutGroup
