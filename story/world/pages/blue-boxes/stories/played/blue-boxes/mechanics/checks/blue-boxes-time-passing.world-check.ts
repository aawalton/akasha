import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const blueBoxesTimePassing = {
  id: "01a14ae6-f164-79e6-802d-99c6f4a01079",
  type: "page-type/world-check",
  slug: "blue-boxes-time-passing",
  title: "Time Passing",
  world: "world/blue-boxes",
  definition: "when a turn of Blue Boxes ends, and the day and light it ends in",
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
      statement: "Saturday, October 17, 2026 is day one, and the date only carries that count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala came to at the Fallen Wayshrine at twenty to five in the afternoon of day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn ends at the end of the turn before plus the minutes its prose shows passing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A thought, a line of talk or a System window read takes a minute, and a close look around a few.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mile takes twenty minutes on a road, forty over rough ground, and double that in the dark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one woman working alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dawn runs twenty past six to ten to seven, and dusk ten to six to half past six.",
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
  createdAt: "2026-10-17T17:26:51.488Z",
  updatedAt: "2026-10-17T17:26:51.488Z",
} as const satisfies WorldCheck
