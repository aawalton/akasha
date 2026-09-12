import type { Command } from "akasha/commands/command.page-type.types.ts"

export const seatSupervisorRestart = {
  id: "01a0797a-9a55-76c0-be3e-c9b1dfbef462",
  type: "command",
  slug: "seat-supervisor-restart",
  definition: "the command restarting every seat's supervisor onto the code standing now",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--all", takes: "every seat akasha carries, which is the only reach a restart has" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "The ask is written and the signal sent in one motion.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supervisor is signalled only where the start time read now matches the start time held.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no readable process is reported rather than signalled.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose supervisor is gone is reported rather than signalled.",
    },
    {
      invariantKind: "departure",
      statement:
        "A signal that could not be sent is reported against the seat the signal was meant for.",
    },
    {
      invariantKind: "departure",
      statement: "Every seat is acted on rather than the run stopping at the first that refuses.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet answered as holding no seat is the pages being wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A restart reaches every seat.",
    },
    {
      invariantKind: "departure",
      statement: "The seats reached are the seats the index files, whatever folder they sit in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here restarts a client.",
    },
  ],
  name: "restart",
} as const satisfies Command
