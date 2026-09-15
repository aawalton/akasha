import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transportLog = {
  id: "01a062be-c8b4-7000-b087-7fa57405121c",
  type: "module",
  slug: "transport-log",
  definition: "what a gateway writes down about a stream once that stream has ended",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is built from the state a stream ended in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is stamped with the millisecond the stream ended at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The elapsed span is the end millisecond less the start millisecond.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The last frame's age is the end millisecond less the last frame's millisecond.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `Error` is split into its constructor's name and its message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything thrown that is no `Error` is split into its typeof and its string.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stream that ended with nothing thrown carries a null error class.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stream that ended with nothing thrown carries a null error message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A held span the state leaves out is written as null rather than left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty pool reason the state leaves out is written as null.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The last `event:` line a chunk has names that chunk's event type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chunk with no `event:` line leaves the event type as that type was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `event:` line naming nothing sets the event type to the empty string.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chunk is decoded once for both the event type and the stop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One decoder serves every chunk this process has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chunk of no bytes is read no further.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `event: message_stop` line anywhere in a chunk sets the stop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stream terminates once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first termination is the termination written down.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Arming a terminal callback after the termination runs that callback at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stream that terminates leaves the shutdown flush before the row is built.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shutdown flush ends every stream still entered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shutdown flush leaves the set with nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The clock a shutdown flush stamps by is handed in so a test needs no real time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file a row lands beside is handed in rather than looked up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is written through `page-entry-queue`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row handed over after a refusal is written rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Writing a row answers the refusal last met or null.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is written only where the caller handed a file in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything thrown while a row is written is answered as a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`transportLogFlushed` resolves once every row handed over is on the disk.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller hands in the path of a page file that is already there.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller going down waits on `transportLogFlushed` before that caller goes down.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a seat's name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here makes the page a row lands beside.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here waits on the disk while a row is handed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges a row against the shape declaring that row.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A file that is not there is opened again for every row until that file is there.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A refusal is answered to the caller rather than kept.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A row not waited on reaches no file where the process goes down first.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A queue opened for a file is held for the life of the process.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A file this module opens beside a page reaches the listing at the next settle over that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No repository root reaches this module, so no index is named from here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Nothing here has a lock against another writer of the same file.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An `event:` line divided across two chunks is read in neither chunk.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A chunk opening partway through a line is read as opening a line.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A shutdown flush stamps every row that flush ends with the one millisecond.",
    },
  ],
} as const satisfies Module
