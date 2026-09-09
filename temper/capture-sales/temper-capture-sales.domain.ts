import type { Domain } from "../../domains/domain.page-type.ts"

export const temperCaptureSales = {
  id: "01a0608a-15b3-7222-9758-3efaaecd469e",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-capture-sales",
  definition: "the shape a sale through a guild store takes where the game saves it",
  parts: ["module/sales-payload", "module/sales-descriptor"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sales add-on and every reader of the add-on's capture agree here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Domain
