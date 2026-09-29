import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIvStanding = {
  id: "01a0ed29-01c3-7f50-807b-a3cf6ec11261",
  type: "page-type/world-check",
  slug: "overwhere-iv-standing",
  title: "Standing",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  definition: "the standing one turn with a character or a town in Overwhere IV earns or costs",
  description: "How much a turn together moved someone's trust.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is scored on what she did in that turn alone, for each character present.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A town, guild or house she dealt with is scored as one character, for reputation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is marked on keeping faith, hearing them out, sharing openly and helping.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mark scores from nought to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line of theirs she crossed costs two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every score above nought quotes the words or deed it rests on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is the marks added, less what the crossed lines cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Standing runs from minus ten to twenty: at five a friend, at ten trusted, at fifteen close.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At minus five a character works against her; at minus ten, openly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A power shown openly moves a town's standing by what it saved or frightened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Standing is kept on a relationship page for each character once it is above nought.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies WorldCheck
