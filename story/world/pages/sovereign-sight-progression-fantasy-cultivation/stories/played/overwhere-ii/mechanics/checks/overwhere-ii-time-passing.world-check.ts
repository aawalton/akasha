import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiTimePassing = {
  id: "01a0ed14-f631-7ea7-b447-1d2ec86c1b47",
  type: "page-type/world-check",
  slug: "overwhere-ii-time-passing",
  title: "Time Passing",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  definition: "when a turn of Overwhere ends, and the day and light it ends in",
  description: "How far the day has gone in the valley.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every played turn ends at an instant, held as its `endsAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The date and hour in `endsAt` are the valley's own clock, written as UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The story's first date, September 29, 2026, is day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala woke in the loft at Tern Hollow at about half past six on day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The season is the thaw at winter's end, with snow still lying in the shade.",
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
      statement: "A lane or road is walked at three miles an hour shod, and two barefoot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hill and forest are walked at half the pace a road is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Power drawn to speed her body shortens a journey as far as the drawing reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one small woman working alone without power.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dawn runs six to seven, and dusk six to seven in the evening.",
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
      statement: "Nala has no clock, so the prose shows the hour as sun, shade, cold and hunger.",
    },
  ],
} as const satisfies WorldCheck
