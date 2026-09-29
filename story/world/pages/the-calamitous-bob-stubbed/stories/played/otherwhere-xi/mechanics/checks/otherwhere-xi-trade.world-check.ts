import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiTrade = {
  id: "01a0ea88-1a35-7826-9566-d6f308344e2a",
  type: "page-type/world-check",
  slug: "otherwhere-xi-trade",
  title: "Trade",
  world: "world/the-calamitous-bob-stubbed",
  definition: "the fair price of a deal a character in Otherwhere XI strikes, and whether it holds",
  description: "What something fairly costs someone, and whether a deal is struck.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every buying and selling in a turn is settled here, once, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deal starts from the price the places' lore gives, in copper bits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stranger held below nought pays a quarter more, and is paid a quarter less.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Regard of ten moves the price a tenth her way; regard of twenty-five a fifth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dealer eager for the deal moves a tenth her way; an indifferent one a tenth against.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deal holds when her offer meets the fair price; else it is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Haggling past the fair price is an act settled by the action check first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Work traded for food and a bed is fair at a day's work for a day's keep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Coin that changes hands is written on her purse page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"...","deals":[{"what":"...","side":"buying","price":10,...}]}`.',
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No price shows in the prose but as the coins named in talk.",
    },
  ],
} as const satisfies WorldCheck
