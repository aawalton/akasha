import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const giftedTrialTimePassing = {
  id: "01a18d10-93f1-7849-9d2d-f20a6a228f44",
  type: "page-type/world-check",
  slug: "gifted-trial-time-passing",
  title: "Time Passing",
  world: "world/gifted-trial-world",
  definition: "when a turn of GiftedTrialWorld: Reborn ends, and the day and light it ends in",
  description: "How far the day has gone where Nala is.",
  settledBy: "world-check/gifted-reborn-time-passing",
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
      statement: "Tuesday, October 27, 2026 is day one, and the date only carries that count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Day one is the day Nala's soul reached her unborn body, four months into her mother's term.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala reached the womb at half past eight in the evening of day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala is born about five months after day one, in early winter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn ends at the end of the turn before plus the minutes its prose shows passing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thought, a line of talk or a Status read takes a minute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An unborn or newborn child sleeps most of every day, a sleep running two to four hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dawn runs six to half past six, and dusk six to twenty to seven, the whole year round.",
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
        "Nala has no clock, so the prose shows the hour only as light, sound, hunger and sleep show it.",
    },
  ],
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldCheck
