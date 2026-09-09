import type { Command } from "../../../../command.page-type.ts"

export const seatSupervisorRestart = {
  id: "01a0797a-9a55-76c0-be3e-c9b1dfbef462",
  pageTypeSlug: "command",
  type: "command",
  slug: "seat-supervisor-restart",
  definition: "the command restarting every seat's supervisor onto the code standing now",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--all", takes: "every seat akasha carries, which is the only reach a restart has" },
  ],
  helpNotes: [
    "a restart is asked and signalled in one motion: the ask alone is taken up by the next turn and comes to nothing.",
    "a supervisor takes the ask as it shuts down and re-execs in place, carrying the client it holds across.",
    "the session in the seat outlives the restart, which is the whole reason this is not a seat restart.",
    "a seat naming no supervisor still standing is reported and left alone.",
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
      invariantKind: "absence",
      statement: "Nothing here restarts a client.",
    },
  ],
} as const satisfies Command
