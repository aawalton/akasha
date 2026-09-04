import type { Module } from "@akasha/code-system/module"

export const inboxTrackingPolling = {
  id: "01a0686a-7a57-72a3-bd0e-04ddd401bb78",
  pageTypeSlug: "module",
  slug: "inbox-tracking-polling",
  definition: "one poll of every inbox, written onto the day's tracking row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The email, task, temper-task and text inboxes are each polled on their own.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is written is the count standing now, together with whether that inbox was cleared to zero today.",
    },
    {
      invariantKind: "departure",
      statement: "The counts land on the ESO day's daily-tracking row.",
    },
    {
      invariantKind: "departure",
      statement: "The email count also lands on the wake day's email entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "The email count is kept on the wake day only where it is lower than the count already standing there.",
    },
    {
      invariantKind: "departure",
      statement: "A source that fails is left out of the write rather than written as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A source that fails is named in what the run reports as failed.",
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
      statement: "One tick is one poll and one write, and then the run is over.",
    },
  ],
} as const satisfies Module
