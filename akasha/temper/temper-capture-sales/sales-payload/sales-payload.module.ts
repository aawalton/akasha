import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const salesPayload = {
  id: "01a0608a-15b3-7095-b65b-bb44a69a01c0",
  pageTypeSlug: "module",
  slug: "sales-payload",
  definition: "the shape one sale through a guild store takes, held under an id of its own",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sale is held under the sale id the game gave the sale.",
    },
    {
      invariantKind: "departure",
      statement: "A sale names the item sold and the quantity of the item.",
    },
    {
      invariantKind: "departure",
      statement: "A sale names the buyer and the guild the sale went through.",
    },
    {
      invariantKind: "departure",
      statement: "A sale names the price paid and the tax taken out of the price.",
    },
    {
      invariantKind: "departure",
      statement: "Every field of a sale may be missing.",
    },
    {
      invariantKind: "departure",
      statement: "The payload names the account the sales were captured under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds code that runs.",
    },
  ],
} as const satisfies Module
