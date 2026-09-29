import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereITimePassing = {
  id: "01a0ed1c-7db5-7368-895f-318772151bde",
  type: "page-type/world-check",
  slug: "overwhere-i-time-passing",
  title: "Time Passing",
  world: "world/hell-hound-evolution-litrpg",
  definition: "when a turn of Overwhere I ends, and the day and light it ends in",
  description: "How far the day has gone.",
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
      statement: "Tuesday, September 29, 2026 is day one, and the date only carries that count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The season is early autumn, and the date says nothing of this world's calendar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala woke on the bank at Greyfen Ford at ten in the morning of day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first turn ends at five past ten, as the branch snaps up the track.",
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
      statement: "A fight against ordinary beasts takes a few minutes, and its aftermath more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mile takes twenty minutes on the track, thirty barefoot, and forty through fen or forest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ford to the village over the ridge takes an hour on foot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one fit woman working alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dawn runs ten to six to half past six, and dusk ten to seven to half past seven.",
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
        "Settled by `akasha story settle --story overwhere-i --check overwhere-i-time-passing`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: 'The reading is `{"from":"2026-09-29T10:00:00.000Z","minutes":5}`.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala has no clock, so the prose shows the hour only as light, body and scene show it.",
    },
  ],
} as const satisfies WorldCheck
