import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereITrade = {
  id: "01a0ed28-82df-7831-95df-3201016faaf9",
  type: "page-type/world-check",
  slug: "overwhere-i-trade",
  title: "Trade",
  world: "world/hell-hound-evolution-litrpg",
  definition: "the price of a deal a character in Overwhere I strikes, and whether it holds",
  description: "What something costs someone, and whether a deal is struck.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every buying and selling in a turn is settled here, once, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deal starts from the base price the places' lore gives, in copper.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ten copper make a silver, and ten silver a gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A community's regard below nought moves the price a quarter against her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Regard of one or two moves it a tenth her way; three or more a fifth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dealer eager for the deal moves a tenth her way; an indifferent one a tenth against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Haggling is an act settled by the action check first, and its outcome is read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A strong haggle moves a fifth her way, a success a tenth, a failure a tenth against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deal holds when her offer meets the price; else it is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Coin that changes hands is written on her purse page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Settled by `akasha story settle --story overwhere-i --check overwhere-i-trade`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"character-player/overwhere-i-nala","deals":[{"side":"buying",...}]}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deal also names regard, want, bargain and offered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No price shows in the prose but as the coins named in talk.",
    },
  ],
} as const satisfies WorldCheck
