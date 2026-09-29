import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIStanding = {
  id: "01a0ed27-0ada-7c1f-b23a-47f4a371e1a6",
  type: "page-type/world-check",
  slug: "overwhere-i-standing",
  title: "Standing",
  world: "world/hell-hound-evolution-litrpg",
  definition: "how far a turn's deeds move one community's regard for Nala in Overwhere I",
  description: "How far a community's regard for her has shifted.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Standing is settled with no dice, once a turn, for each community her deeds touched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A community is a village, a town, a guild or a people who hear of her as one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A community's regard runs from minus three to five, and starts at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saving a life, or ending a threat to them, raises regard two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Helping openly, keeping her word or giving freely raises it one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Giving offence, or frightening them with raw power, lowers it one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Breaking her word, stealing or cheating lowers it two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Harming one of their own lowers it three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every deed quotes the words of the turn it rests on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At minus three they drive her out; at minus one or two they are cold and withhold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought she is a stranger; at one or two welcome, and helped in small things.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At three or four they trust her and share what they know.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At five she is one of their own, and they take her side at a cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Regard sets how they treat her, never whether her acts come off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A community's regard is written as a fact on its lore page before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Closeness to one person is the points of a relationship page naming her and them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Settled by `akasha story settle --story overwhere-i --check overwhere-i-standing`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"community":"...","regard":0,"deeds":[{"deed":"helped-openly","quote":"..."}]}`.',
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No regard shows as a number in the prose.",
    },
  ],
} as const satisfies WorldCheck
