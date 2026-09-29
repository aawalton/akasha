import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiTimePassing = {
  id: "01a0ea6b-815f-7fff-aab6-0c2e2daf9d12",
  type: "page-type/world-check",
  slug: "otherwhere-xi-time-passing",
  title: "Time Passing",
  world: "world/the-calamitous-bob-stubbed",
  definition: "when a turn of Otherwhere XI ends, and the day and light it ends in",
  description: "How far the day has gone.",
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
      statement: "Nala woke in the Waystone Shrine's ring at ten to six in the morning of day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first turn ends at six, as the first light reaches the altar stone.",
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
        "A mile takes twenty minutes on a road, thirty barefoot on it, and forty over rough hill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one small, untrained woman working alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dawn runs twenty to six to twenty past six, and dusk six in the evening to twenty to seven.",
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
