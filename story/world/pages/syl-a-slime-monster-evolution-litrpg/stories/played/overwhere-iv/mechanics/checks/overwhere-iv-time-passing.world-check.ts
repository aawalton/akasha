import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const overwhereIvTimePassing = {
  id: "01a0ed1e-65a8-7f04-a9f9-8fff55bd072e",
  type: "page-type/world-check",
  slug: "overwhere-iv-time-passing",
  title: "Time Passing",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  definition: "when a turn of Overwhere IV ends, and the day and light it ends in",
  description: "How far the day has gone around Millbrook.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every played turn ends at an instant, held as its `endsAt`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The date and hour in `endsAt` are the land's own clock, written as UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The story's first date, September 29, 2026, is day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala woke on Millbrook Common at noon on day one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The season is early autumn, with the harvest coming in and the nights turning cool.",
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
      statement: "A road is walked at three miles an hour shod, and two barefoot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hill, marsh and forest are walked at half the pace a road is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cart or wagon on a road makes three miles an hour, a horse ridden six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain of Blinks crosses open ground at twice a walking pace while mana lasts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task takes what it would take one small woman working alone.",
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
      statement: "Nala has no clock, so the prose shows the hour as sun, shade, bells and hunger.",
    },
  ],
} as const satisfies WorldCheck
