import type { Module } from "@akasha/code/module"

export const inboxCountWriting = {
  id: "01a069b6-bb6b-7b92-97c2-53a4f930ea5a",
  pageTypeSlug: "module",
  slug: "inbox-count-writing",
  definition: "the counts one poll took, written onto that day's tracking row",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The counts land on the day's daily-tracking row as a patch.",
    },
    {
      invariantKind: "departure",
      statement: "The mail count lands on the day it was taken in rather than on the ESO day.",
    },
    {
      invariantKind: "departure",
      statement: "The mail count kept is the lowest the mail reached rather than the last taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mail count is kept only where that count is lower than the count already there.",
    },
    {
      invariantKind: "departure",
      statement: "An inbox with no count is left out of the write rather than written as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An inbox reading zero is marked cleared for that day.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day already marked cleared keeps that mark however high the count climbs after.",
    },
    {
      invariantKind: "constraint",
      statement: "Where a day is kept is asked of `day-place` rather than decided here.",
    },
    {
      invariantKind: "departure",
      statement: "A read or a write that fails ends the run rather than answering half a reading.",
    },
    {
      invariantKind: "departure",
      statement: "Counts the day already carries are not landed again.",
    },
    {
      invariantKind: "departure",
      statement: "A count already on the day is read as the number that count spells.",
    },
  ],
} as const satisfies Module
