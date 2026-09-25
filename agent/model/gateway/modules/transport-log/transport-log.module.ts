import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transportLog = {
  id: "01a062be-c8b4-7000-b087-7fa57405121c",
  type: "page-type/module",
  slug: "transport-log",
  definition: "what a gateway writes down about a stream once that stream has ended",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is built from the state a stream ended in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is stamped with the millisecond the stream ended at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The elapsed span is the end millisecond less the start millisecond.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last frame's age is the end millisecond less the last frame's millisecond.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An `Error` is split into its constructor's name and its message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything thrown that is no `Error` is split into its typeof and its string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream that ended with nothing thrown carries a null error class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream that ended with nothing thrown carries a null error message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held span the state leaves out is written as null rather than left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty pool reason the state leaves out is written as null.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last `event:` line a chunk has names that chunk's event type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chunk with no `event:` line leaves the event type as that type was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An `event:` line naming nothing sets the event type to the empty string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chunk is decoded once for both the event type and the stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One decoder serves every chunk this process has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chunk of no bytes is read no further.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An `event: message_stop` line anywhere in a chunk sets the stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream terminates once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first termination is the termination written down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Arming a terminal callback after the termination runs that callback at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stream that terminates leaves the shutdown flush before the row is built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shutdown flush ends every stream still entered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shutdown flush leaves the set with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The clock a shutdown flush stamps by is handed in so a test needs no real time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The log a row is written to is handed in rather than looked up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is written only where the caller handed a transport log in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anything thrown while a row is written is swallowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows reach the log in the order they are handed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carries the fields the transport event declares and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carries no token, no header and no body a request or a response had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row names the account a stream was sent under by the account's name alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row names the path it was handed rather than a whole url.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error message a row carries is the message the error was thrown with.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A caller going down waits on the transport log's flush before that caller goes down.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a seat's name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the page a row lands beside.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits on the disk while a row is handed over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a row against the shape declaring that row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row not waited on reaches no file where the process goes down first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No repository root reaches this module, so no index is named from here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An `event:` line divided across two chunks is read once the line is whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chunk opening partway through a line is read from the next line on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shutdown flush stamps every row that flush ends with the one millisecond.",
    },
  ],
} as const satisfies Module
