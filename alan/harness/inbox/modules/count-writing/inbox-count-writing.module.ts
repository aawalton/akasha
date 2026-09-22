import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxCountWriting = {
  id: "01a069b6-bb6b-7b92-97c2-53a4f930ea5a",
  type: "page-type/module",
  slug: "inbox-count-writing",
  definition: "the counts a poll took, written onto that day's tracking row",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The counts land on the day's daily-tracking row as a patch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The mail count lands on the day the count was taken in rather than on the ESO day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mail count kept is the lowest the mail reached rather than the last taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mail count is kept only where that count is lower than the count already there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inbox with no count is left out of the write rather than written as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inbox reading zero is marked cleared for that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day already marked cleared keeps that mark however high the count climbs after.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Where a day is kept is asked of `day-place` rather than decided here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read or a write that fails ends the run rather than answering half a reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Counts the day already carries are not landed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count already on the day is read as the number that count spells.",
    },
  ],
} as const satisfies Module
