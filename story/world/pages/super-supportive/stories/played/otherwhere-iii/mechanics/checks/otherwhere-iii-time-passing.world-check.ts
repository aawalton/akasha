import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereIiiTimePassing = {
  id: "01a0e9e1-aa60-7dc6-98ef-ea0fbbd0edaa",
  type: "page-type/world-check",
  slug: "otherwhere-iii-time-passing",
  title: "Time Passing",
  world: "world/super-supportive",
  definition: "when a turn of Otherwhere III ends, and the day and light it ends in",
  description: "How far the day has gone in the city where Nala is.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every played turn ends at an instant, held as its `endsAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The date and hour in `endsAt` are Chicago's own clock, written as UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saturday, January 31, 2037 is day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala came to on the Belmont platform at twenty to five on day one.",
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
        "A city block is walked in two minutes shod, and barefoot on snow in five if at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An L train calls every ten minutes or so and takes two minutes a station.",
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
        "Winter dawn runs twenty-five to seven to five past seven, and dusk five to five to twenty-five past.",
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
        "Nala has no phone or watch, so the prose shows the hour only as the city shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clock, a screen or a train board in the scene is a clock she may read.",
    },
  ],
} as const satisfies WorldCheck
