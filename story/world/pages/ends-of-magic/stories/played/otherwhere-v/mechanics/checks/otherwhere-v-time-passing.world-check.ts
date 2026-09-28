import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereVTimePassing = {
  id: "01a0e9eb-fbd8-7e4e-95d0-27d199455ab6",
  type: "page-type/world-check",
  slug: "otherwhere-v-time-passing",
  title: "Time Passing",
  world: "world/ends-of-magic",
  definition: "when a turn of Otherwhere V ends, and the day and light it ends in",
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
      statement: "Nala landed in Fern Hollow at five in the afternoon of day one, in early autumn.",
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
        "A mile is walked in twenty minutes on a track, and in forty barefoot through forest.",
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
      statement: "Dawn runs six to twenty to seven, and dusk ten past six to ten to seven.",
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
