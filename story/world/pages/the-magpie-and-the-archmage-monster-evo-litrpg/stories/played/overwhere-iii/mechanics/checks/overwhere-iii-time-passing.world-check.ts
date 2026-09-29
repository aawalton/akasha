import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIiiTimePassing = {
  id: "01a0ed1e-f6ae-7bde-81b4-ec0ee3795da9",
  type: "page-type/world-check",
  slug: "overwhere-iii-time-passing",
  title: "Time Passing",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  definition: "when a turn of Overwhere III ends, and the day and light it ends in",
  description: "How far the day has gone around Wrenwood.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every played turn ends at an instant, held as its `endsAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The date and hour in `endsAt` are Wrenwood's own clock, written as UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The story's first date, September 29, 2026, is day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala woke at the Wrenwood crossroads shrine at half past four on day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The season is late winter, the beeches still holding last year's dry gold leaves.",
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
        "A road is walked at three miles an hour shod, two barefoot, and ridden by cart at four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wood, field and hill are walked at half the pace a road is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fight takes a few minutes, and a task what one small woman working alone would take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A night's sleep runs to the morning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dawn runs half past six to half past seven, and dusk five to six in the evening.",
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
      statement: "Nala has no clock, so the prose shows the hour as light, cold, bells and hunger.",
    },
  ],
} as const satisfies WorldCheck
