import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViPurse = {
  id: "01a0ea46-98e2-7d5f-81e7-5ec1ed44c5b9",
  type: "page-type/page-type",
  slug: "otherwhere-vi-purse",
  definition: "the coin a character in Otherwhere VI carries, counted in copper",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse is counted in copper: ten copper make a silver, ten silver a gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came with no coin at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Prices are the trade lore's: a skewer two copper, a hearth bed three, a potion a gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fair price is paid as asked; haggling is an act against the seller's want of coin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's labour for villagers pays three to five copper, or a meal and a bed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rabbit pelt sells for a copper, a fox pelt five, a deer hide a silver, a wolf's two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bundle of twenty sneezewort sells to a herb-wife or the Guild for three copper.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Tier 0 core sells for two to five silver; a Tier 1 core for one to three gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her odd shirt and tights would fetch a silver from a curious buyer, and leave her bare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in coin is written on her page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No coin total shows as a number save as the coins she counts in her hand.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
