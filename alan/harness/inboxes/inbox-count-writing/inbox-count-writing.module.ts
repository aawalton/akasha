import type { Module } from "@akasha/code-system/module"

export const inboxCountWriting = {
  id: "01a069b6-bb6b-7b92-97c2-53a4f930ea5a",
  pageTypeSlug: "module",
  slug: "inbox-count-writing",
  definition: "the counts one poll took, written onto that day's tracking row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The counts land on the day's daily-tracking row as a patch.",
    },
    {
      invariantKind: "departure",
      statement: "The email count also lands on the day's own email entry.",
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
  ],
} as const satisfies Module
