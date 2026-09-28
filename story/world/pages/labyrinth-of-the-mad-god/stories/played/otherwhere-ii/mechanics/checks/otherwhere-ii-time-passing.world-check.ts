import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIiTimePassing = {
  id: "01a0e992-4350-774a-964f-a8e84e8dd4dc",
  type: "page-type/world-check",
  slug: "otherwhere-ii-time-passing",
  title: "Time Passing",
  world: "world/labyrinth-of-the-mad-god",
  definition: "when a turn of Otherwhere ends, and the day and light it ends in",
  description: "How far the day has gone on the isle.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every played turn ends at an instant, held as its `endsAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The date and hour in `endsAt` are the isle's own clock, written as UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The story's first date, September 28, 2026, is day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came to on the Black Shore a little before ten on day one.",
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
      statement: "Open sand is walked at two miles an hour barefoot, and forest at one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Moving quietly and watchfully halves the pace it would have.",
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
        "Dawn runs half past five to half past six, and dusk half past six to half past seven.",
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
      statement: "Nala has no clock, so the prose shows the hour as sun, shade, heat and hunger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A countdown the System shows her is a clock she may read.",
    },
  ],
} as const satisfies WorldCheck
