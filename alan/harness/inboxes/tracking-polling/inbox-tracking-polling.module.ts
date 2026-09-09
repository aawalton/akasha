import type { Module } from "@akasha/code/module"

export const inboxTrackingPolling = {
  id: "01a0686a-7a57-72a3-bd0e-04ddd401bb78",
  pageTypeSlug: "module",
  type: "module",
  slug: "inbox-tracking-polling",
  definition: "one poll of every inbox, written onto the day's tracking row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The email and task and temper-task and text inboxes are each polled on their own.",
    },
    {
      invariantKind: "departure",
      statement: "The write puts the count now and whether that inbox was cleared to zero today.",
    },
    {
      invariantKind: "departure",
      statement: "The counts land on the ESO day's daily-tracking row.",
    },
    {
      invariantKind: "departure",
      statement: "The email count also lands on the opened day's email entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "The email count is kept on the opened day only where it is lower than the count already there.",
    },
    {
      invariantKind: "departure",
      statement: "A source that fails is left out of the write rather than written as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A source that fails is named among the sources the run reports as failed.",
    },
    {
      invariantKind: "departure",
      statement: "A run in which a source failed still ends well.",
    },
    {
      invariantKind: "departure",
      statement: "A persist write that fails ends the run as an operational error.",
    },
    {
      invariantKind: "departure",
      statement: "A tick is one poll followed by one write.",
    },
    {
      invariantKind: "departure",
      statement: "The run is over once that tick is done.",
    },
  ],
} as const satisfies Module
