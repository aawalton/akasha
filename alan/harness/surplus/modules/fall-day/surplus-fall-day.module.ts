import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const surplusFallDay = {
  id: "01a18dac-b6ed-78c5-ae35-44c432fcac56",
  type: "page-type/module",
  slug: "surplus-fall-day",
  definition: "how code reads the surplus and the sleep hours of a day",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Both numbers are keys on the day's tracking row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day's row is asked for through the funnel's by-date reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Neither read composes a query of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "akasha decides what each number means.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The funnel decides where the day is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The surplus this reads and the website's surplus tile come off one reducer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sleep this reads and the website's sleep come off one reducer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole day is asked for rather than keys the day page has nothing for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reducer finding nothing answers null rather than zero.",
    },
  ],
  createdAt: "2026-10-30T16:37:48.908Z",
  updatedAt: "2026-10-30T17:25:38.207Z",
} as const satisfies Module
