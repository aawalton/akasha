import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIStanding = {
  id: "01a0e365-14b9-7ffb-bde4-00f1f3dbfa23",
  type: "page-type/world-check",
  slug: "otherwhere-i-standing",
  title: "Standing",
  definition: "the standing one turn with a character in Otherwhere earns or costs",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is scored on what she did in that turn alone, for each character present.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn is marked on keeping faith, hearing the character out, and sharing openly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each mark scores from nought to two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line of the character's she crossed costs two.",
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
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
  ],
} as const satisfies WorldCheck
