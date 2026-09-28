import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIxTrade = {
  id: "01a0ea41-e8fa-7114-8d09-54fe9c7ca43a",
  type: "page-type/world-check",
  slug: "otherwhere-ix-trade",
  title: "Trade",
  world: "world/mana-devourer-litrpgmana-cultivation",
  definition: "the price a deal in Otherwhere IX closes at",
  description: "What something costs Nala, or fetches her.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every buying or selling worth the telling is priced here, once, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Twenty copper make a silver, and twenty silver a gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The list price is the one the lore gives, or what the world builder sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cold dealer asks half again; a friendly one a tenth off, trusting a fifth, hers 30 off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Haggling is her act first: strong takes a fifth off, success a tenth, failure adds a tenth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Selling, the same regard and haggling raise what she is paid instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A dealer who marks her strange cloth or talk takes her for easy prey and is colder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her purse page holds her money in copper and changes the turn it is spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Labour pays by the day: a hand's work a silver or two, a hunter's beater three.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No price shows as a sum of copper in the prose; coins are named as they change hands.",
    },
  ],
} as const satisfies WorldCheck
