import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatSupervisorRestart = {
  id: "01a0797a-9a55-76c0-be3e-c9b1dfbef462",
  type: "page-type/command",
  slug: "seat-supervisor-restart",
  definition: "the command restarting every seat's supervisor onto the code standing now",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ask is written and the signal sent in one motion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A supervisor is signalled only where the start time read now matches the start time held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no readable process is reported rather than signalled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose supervisor is gone is reported rather than signalled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A signal that could not be sent is reported against the seat the signal was meant for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every seat is acted on rather than the run stopping at the first that refuses.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fleet answered as holding no seat is the pages being wrong.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restart reaches every seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seats reached are the seats the index files, whatever folder they sit in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each seat is named as soon as that seat has been asked and signalled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restart that threw part way names those seats in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The restarting this runs is handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here restarts a client.",
    },
  ],
  name: "restart",
  arguments: [{ argument: "argument/every-seat", required: true }],
} as const satisfies Command
