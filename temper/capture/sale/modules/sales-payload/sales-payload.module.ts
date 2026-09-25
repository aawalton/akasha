import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesPayload = {
  id: "01a0608a-15b3-7095-b65b-bb44a69a01c0",
  type: "page-type/module",
  slug: "sales-payload",
  definition: "the shape a sale through a guild store takes, held under an id of its own",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale is held under the sale id the game gave the sale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale names the item sold and the quantity of the item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale names the buyer and the guild the sale went through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale names its guild by the guild's name, the guild's id and the megaserver.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale names the price paid and the tax taken out of the price.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field of a sale may be missing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The payload names the account the sales were captured under.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here has code that runs.",
    },
  ],
} as const satisfies Module
