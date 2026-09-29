import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXTrade = {
  id: "01a0ea77-4153-7b9f-9caa-552828972d13",
  type: "page-type/world-check",
  slug: "otherwhere-x-trade",
  title: "Trade",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  definition: "the price a deal in Otherwhere X closes at",
  description: "What something costs Nala, or fetches her.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every buying or selling worth the telling is priced here, once, with no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ten copper make a silver, and twenty silver a gold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The asked price is the one the lore gives, or what the world builder sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cold dealer asks four tenths more, a friendly one a tenth less, trusting a fifth, hers 30 off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Haggling is her act first: strong takes a fifth off, success a tenth, failure adds a tenth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dealer who sees she is desperate or foreign asks a fifth more of the price.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Selling, the same leanings raise what she is paid instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her purse page holds her money in copper and changes the turn it is spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A farm hand's day pays three copper and a meal; the waystation pays four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Her Earth shirt and tights are strange cloth a dealer would pay a silver or two for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No price shows as a sum of copper in the prose; coins are named as they change hands.",
    },
  ],
} as const satisfies WorldCheck
