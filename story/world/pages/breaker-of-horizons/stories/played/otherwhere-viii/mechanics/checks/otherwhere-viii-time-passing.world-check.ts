import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereViiiTimePassing = {
  id: "01a0ea2d-403e-71a7-9e77-4ebda9f59429",
  type: "page-type/world-check",
  slug: "otherwhere-viii-time-passing",
  title: "Time Passing",
  world: "world/breaker-of-horizons",
  definition: "when a turn of Otherwhere VIII ends, and the day and light it ends in",
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
      statement: "Nala woke on a bench in Weir Gardens at twenty-five to six on day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The opening turn ends at twenty to six on day one, as the warden reaches her.",
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
        "A mile takes twenty minutes walked in shoes, thirty barefoot on paving, and five by car or bus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A queue at a public counter takes half an hour, and a form another quarter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one small woman working alone without the Art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Dawn runs quarter to six to twenty past six, and dusk five past six to quarter to seven.",
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
        "Nala has no watch, so the prose shows the hour only as light, clocks, body and scene show it.",
    },
  ],
} as const satisfies WorldCheck
