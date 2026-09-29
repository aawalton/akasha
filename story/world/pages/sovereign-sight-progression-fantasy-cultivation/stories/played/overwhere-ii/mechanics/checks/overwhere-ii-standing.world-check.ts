import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiStanding = {
  id: "01a0ed2d-ded0-79b7-95fc-877d12c68e6b",
  type: "page-type/world-check",
  slug: "overwhere-ii-standing",
  title: "Standing",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  definition: "how a turn's dealings move what the people of a place think of Nala",
  description: "How far a place's regard for Nala has shifted.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Standing is kept per place: Wendle Ford, Wendlemere and House Varrow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is scored on what she did in it alone, for each place whose people saw or heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is marked on keeping faith, hearing them out, sharing openly and giving freely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mark scores from nought to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saving a life counts as giving two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deed of power seen by many counts as hearing two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lie found out, or harm done to a local, is a line crossed, and costs three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every score above nought quotes the words it rests on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is the marks added, less what the crossed lines cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading's character names the place whose standing it moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Standing runs from minus ten, scorned, to ten, beloved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At three she is trusted, at six one of their own, and at nine a legend.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change answered is added to that place's standing before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Standing sets how a place treats her, never whether her acts come off.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No standing shows as a number in the prose.",
    },
  ],
} as const satisfies WorldCheck
