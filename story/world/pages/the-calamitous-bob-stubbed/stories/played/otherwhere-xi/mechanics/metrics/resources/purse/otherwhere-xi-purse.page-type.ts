import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXiPurse = {
  id: "01a0ea7b-4aeb-7181-87d4-414050c4e6b0",
  type: "page-type/page-type",
  slug: "otherwhere-xi-purse",
  definition: "the coin a character in Otherwhere XI carries, counted in copper bits",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A purse is counted in copper bits: twenty bits make a silver talent, twenty silver a gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came with no coin at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Prices are the places' lore: a bowl of stew two bits, a loft bed four, sandals ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day's farm work in the hills pays six bits in lambing season, or meals and a bed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mending potion costs about thirty silver, three months of a labourer's pay.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A desert glass globule sells to Imra's alchemist for two to four silver.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her strange shirt and tights would fetch a silver from the alchemist, and leave her bare.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "By waystone custom she may take an offering in need, and owes one back when able.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fair price is paid as asked; haggling is settled by the trade check.",
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
