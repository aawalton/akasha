import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const giftedRebornTimePassing = {
  id: "01a17edf-d61f-7574-9598-5df749060e23",
  type: "page-type/world-check",
  slug: "gifted-reborn-time-passing",
  title: "Time Passing",
  world: "world/gifted",
  definition: "when a turn of Gifted: Reborn ends, and the day and light it ends in",
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
      statement: "Tuesday, October 27, 2026 is day one, and the date only carries that count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Day one is a snowy night of early winter, about a week after Nala was born.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala reached the Horndale outpost at half past eight in the evening of day one.",
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
      statement: "A newborn sleeps most of every day, and a sleep runs two to four hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dawn runs ten past seven to twenty to eight, and dusk half past four to ten past five.",
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
        "Nala has no clock, so the prose shows the hour only as light, hunger and sleep show it.",
    },
  ],
  createdAt: "2026-10-27T19:39:20.989Z",
  updatedAt: "2026-10-27T19:39:20.989Z",
} as const satisfies WorldCheck
