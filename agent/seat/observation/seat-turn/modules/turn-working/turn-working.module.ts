import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnWorking = {
  id: "01a0687b-3c85-7000-b60f-9d7b8c037697",
  type: "module",
  slug: "turn-working",
  definition:
    "what one read of a seat's transcript says about the turn and the commands still running",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is working until an answer ends its turn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prompt with nothing answering that prompt yet is a turn still to finish.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prompt saying the user interrupted the request ends the turn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request interrupted while a tool ran is interrupted as any other is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer saying the user interrupted the request ends no turn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record's words are read whether its content is text or a run of blocks.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record that is neither a prompt nor an answer neither starts nor ends a turn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A compaction ending ends the turn the compaction interrupted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The summary a compaction wrote starts no turn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The harness's own echo of a local command starts no turn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prompt or an answer after a compaction starts the turn again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Unread is not off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unread seat and a seat that is not working are told apart.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript is read forward from the byte the transcript was last read to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A transcript no longer than when that transcript was last read is not read again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A transcript shorter than when that transcript was last read is read from its first byte.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read ends at the last line end rather than part way through a line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stretch of transcript holding no answer leaves the turn reading unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The byte a transcript was read to is kept beside the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A background command starts a task the transcript names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A background command is the only task read here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No subagent is read out of a transcript here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent is read from the page put up for that subagent instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A task is live from the record starting the task until the notification naming the task.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task the seat stopped is live no longer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task started again after its notification is live again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which tasks are live is kept beside the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading kept before tasks were read is read again from the first byte.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading kept in an unknown shape is unread.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A task in a replaced transcript is live to nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task runs inside the client the transcript belongs to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A client spawned in place of an earlier client runs no task already open.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The client running a task writes the notice closing the task.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A client replaced while a task was open writes nothing closing the task.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The byte the transcript was read to survives the open tasks being taken away.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No hook is asked for a seat's turn state or live tasks.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No process is read to find a task.",
    },
  ],
} as const satisfies Module
