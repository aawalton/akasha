import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const thornfordTimePassing = {
  id: "01a14b66-4c0f-75fc-876a-795844595bc7",
  type: "page-type/world-check",
  slug: "thornford-time-passing",
  title: "Time Passing",
  world: "world/thornford",
  definition: "when a turn of Thornford ends, and the day and light it ends in",
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
      statement: "Tuesday, April 28, 2026 is day one, three days before Beltane.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beltane is Friday, May 1, 2026, day four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Shaestrel comes into Nala's shop just after closing, at six in the evening of day one.",
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
      statement:
        "Dawn runs five to a quarter to six, and dusk a quarter to nine to half past nine.",
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
      statement: "The prose shows the hour only as light, sound, body and scene show it.",
    },
  ],
  createdAt: "2026-10-17T19:45:57.774Z",
  updatedAt: "2026-10-17T19:45:57.774Z",
} as const satisfies WorldCheck
