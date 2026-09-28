import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViTimePassing = {
  id: "01a0ea3b-5124-746e-82d6-e12afa654850",
  type: "page-type/world-check",
  slug: "otherwhere-vi-time-passing",
  title: "Time Passing",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  definition: "when a turn of Otherwhere VI ends, and the day and light it ends in",
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
      statement: "Nala woke in Moss Hollow at twenty to eight in the evening of day one.",
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
        "A mile takes twenty minutes on a track, forty in woods, and double that barefoot or in the dark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one small woman working alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dawn runs ten to six to half past six, and dusk twenty to seven to twenty past seven.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The great moon is full on the night of day two and wanes after.",
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
