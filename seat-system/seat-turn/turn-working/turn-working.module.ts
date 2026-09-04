import type { Module } from "@akasha/code-system/module"

export const turnWorking = {
  id: "01a0687b-3c85-7000-b60f-9d7b8c037697",
  pageTypeSlug: "module",
  slug: "turn-working",
  definition:
    "what one read of a seat's transcript says about the turn and the tasks still running",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is working until an answer ends its turn.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt with nothing answering it yet is a turn still to finish.",
    },
    {
      invariantKind: "departure",
      statement: "A record that is neither a prompt nor an answer neither starts nor ends a turn.",
    },
    {
      invariantKind: "departure",
      statement: "Unread is not off.",
    },
    {
      invariantKind: "departure",
      statement: "An unread seat and a seat that is not working are told apart.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript is read forward from the byte the transcript was last read to.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript no longer than when it was last read is not read again.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript shorter than when it was last read is read from its first byte.",
    },
    {
      invariantKind: "departure",
      statement: "A read ends at the last line end rather than part way through a line.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch of transcript holding no answer leaves the turn reading unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The byte a transcript was read to is kept beside the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A background command and a subagent each start a task the transcript names.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent awaited within the turn starting the subagent is no task.",
    },
    {
      invariantKind: "departure",
      statement:
        "A task is live from the record starting the task until the notification naming the task.",
    },
    {
      invariantKind: "departure",
      statement: "A task started again after its notification is live again.",
    },
    {
      invariantKind: "departure",
      statement: "Which tasks are live is kept beside the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A reading kept in an unknown shape is unread.",
    },
    {
      invariantKind: "gap",
      statement: "A task started before the first read of a transcript is live to nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "No hook is asked what a seat is doing.",
    },
    {
      invariantKind: "absence",
      statement: "No process is read to find a task.",
    },
  ],
} as const satisfies Module
