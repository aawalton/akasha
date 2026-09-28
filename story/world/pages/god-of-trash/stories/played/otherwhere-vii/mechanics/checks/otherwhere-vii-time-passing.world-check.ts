import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiTimePassing = {
  id: "01a0ea2a-3b22-76b6-859b-9431d8201e01",
  type: "page-type/world-check",
  slug: "otherwhere-vii-time-passing",
  title: "Time Passing",
  world: "world/god-of-trash",
  definition: "when a turn of Otherwhere VII ends, and the day and light it ends in",
  description: "How far the day has gone where Nala is.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every played turn ends at an instant, held as its `endsAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The date and hour in `endsAt` are the sun's own clock where Nala is, written as UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Monday, September 28, 2026 is day one, and the date only carries that count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala woke in the ditch by the Ashford road at ten past six in the morning of day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn ends at the end of the turn before plus the minutes its prose shows passing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thought or a line of talk takes a minute, and a close look around a few.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mile takes twenty minutes walked on a road, fifteen on a cart, and forty barefoot off it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one small woman with no mana working alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dawn runs ten to six to half past six, and dusk half past six to ten past seven.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Time never runs backward, and no turn passes more than a week.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game master settles the passing once a turn, with no dice, before telling it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala has no clock, so the prose shows the hour only as light, body and scene show it.",
    },
  ],
} as const satisfies WorldCheck
