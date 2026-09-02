import type { Module } from "@akasha/code-system/module"

export const transportLog = {
  id: "01a062be-c8b4-7000-b087-7fa57405121c",
  pageTypeSlug: "module",
  slug: "transport-log",
  definition: "what a gateway writes down about a stream once that stream has ended",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is built from the state a stream ended in.",
    },
    {
      invariantKind: "departure",
      statement: "A row is stamped with the millisecond the stream ended at.",
    },
    {
      invariantKind: "departure",
      statement: "The elapsed span is the end millisecond less the start millisecond.",
    },
    {
      invariantKind: "departure",
      statement: "The last frame's age is the end millisecond less the last frame's millisecond.",
    },
    {
      invariantKind: "departure",
      statement: "An `Error` is split into its constructor's name and its message.",
    },
    {
      invariantKind: "departure",
      statement: "Anything thrown that is no `Error` is split into its typeof and its string.",
    },
    {
      invariantKind: "departure",
      statement: "A stream that ended with nothing thrown carries a null error class.",
    },
    {
      invariantKind: "departure",
      statement: "A stream that ended with nothing thrown carries a null error message.",
    },
    {
      invariantKind: "departure",
      statement: "A held span the state leaves out is written as null rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "An empty pool reason the state leaves out is written as null.",
    },
    {
      invariantKind: "departure",
      statement: "The last `event:` line a chunk holds names that chunk's event type.",
    },
    {
      invariantKind: "departure",
      statement: "A chunk holding no `event:` line leaves the event type as that type stood.",
    },
    {
      invariantKind: "departure",
      statement: "An `event:` line naming nothing sets the event type to the empty string.",
    },
    {
      invariantKind: "departure",
      statement: "A chunk is decoded once for both the event type and the stop.",
    },
    {
      invariantKind: "departure",
      statement: "One decoder serves every chunk this process carries.",
    },
    {
      invariantKind: "departure",
      statement: "A chunk of no bytes is read no further.",
    },
    {
      invariantKind: "departure",
      statement: "An `event: message_stop` line anywhere in a chunk sets the stop.",
    },
    {
      invariantKind: "departure",
      statement: "A stream terminates once.",
    },
    {
      invariantKind: "departure",
      statement: "The first termination is the one written down.",
    },
    {
      invariantKind: "departure",
      statement: "Arming a terminal callback after the termination runs that callback at once.",
    },
    {
      invariantKind: "departure",
      statement: "A stream that terminates leaves the shutdown flush before the row is built.",
    },
    {
      invariantKind: "departure",
      statement: "A shutdown flush ends every stream still entered.",
    },
    {
      invariantKind: "departure",
      statement: "A shutdown flush leaves the set holding nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The clock a shutdown flush stamps by is handed in so a test needs no real time.",
    },
    {
      invariantKind: "departure",
      statement: "The file a row lands beside is handed in rather than looked up.",
    },
    {
      invariantKind: "departure",
      statement: "A row is written through `page-entry-queue`.",
    },
    {
      invariantKind: "departure",
      statement: "A row handed over after a refusal is written rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "Writing a row answers the refusal last met or null.",
    },
    {
      invariantKind: "departure",
      statement: "A row is written only where the caller handed a file in.",
    },
    {
      invariantKind: "departure",
      statement: "Anything thrown while a row is written is answered as a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "`transportLogFlushed` resolves once every row handed over is on the disk.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller hands in the path of a page file that is already there.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller going down waits on `transportLogFlushed` before that caller goes down.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a seat's name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes the page a row lands beside.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here waits on the disk while a row is handed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a row against the shape declaring that row.",
    },
    {
      invariantKind: "gap",
      statement: "A file that is not there is opened again for every row until that file is there.",
    },
    {
      invariantKind: "gap",
      statement: "A refusal is answered to the caller rather than kept.",
    },
    {
      invariantKind: "gap",
      statement: "A row not waited on reaches no file where the process goes down first.",
    },
    {
      invariantKind: "gap",
      statement: "A queue opened for a file is held for the life of the process.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here holds a lock against another writer of the same file.",
    },
    {
      invariantKind: "gap",
      statement: "An `event:` line divided across two chunks is read in neither chunk.",
    },
    {
      invariantKind: "gap",
      statement: "A chunk opening partway through a line is read as opening a line.",
    },
    {
      invariantKind: "gap",
      statement: "A shutdown flush stamps every row that flush ends with the one millisecond.",
    },
  ],
} as const satisfies Module
