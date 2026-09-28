import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIvTimePassing = {
  id: "01a0e9ea-7b35-7738-9044-313555b4f9d4",
  type: "page-type/world-check",
  slug: "otherwhere-iv-time-passing",
  title: "Time Passing",
  world: "world/beware-of-chicken",
  definition: "when a turn of Otherwhere IV ends, and the day and light it ends in",
  description: "How far the day has gone in the hills where Nala is.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every played turn ends at an instant, held as its `endsAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hour in `endsAt` is the hills' own sun time, written as UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Monday, September 28, 2026 is day one, and the date carries only that count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Day one falls in late spring, with the rice newly planted out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came to at Willow Bend at twenty to six on the morning of day one.",
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
      statement: "A li of road is walked in six minutes shod, and in ten barefoot or uphill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one small woman new to it, working alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dawn runs from five to half past five, and dusk from seven to half past seven.",
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
      statement: "Nala has no clock, so the prose shows the hour only as the sun and the work do.",
    },
  ],
} as const satisfies WorldCheck
