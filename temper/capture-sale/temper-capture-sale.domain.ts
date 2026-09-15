import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCaptureSale = {
  id: "01a0608a-15b3-7222-9758-3efaaecd469e",
  type: "domain",
  slug: "temper-capture-sale",
  definition: "the shape a sale through a guild store takes where the game saves it",
  parts: ["module/sales-descriptor", "module/sales-payload"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sales add-on and every reader of the add-on's capture agree here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Domain
