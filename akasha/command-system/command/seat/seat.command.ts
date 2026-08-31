import type { Command } from "../command.page-type.ts"

export const seat = {
  id: "01a0598f-192d-7685-a97f-09ad82181a61",
  pageTypeSlug: "command",
  slug: "seat",
  definition: "the command acting on the seats akasha carries and what runs them",
  code: "ts",
  test: "ts",
  taking: [
    { said: "supervisor", takes: "what to act on, which is the process running a seat" },
    {
      said: "restart",
      takes: "the act, which is to restart that process onto the code standing now",
    },
    { said: "--all", takes: "every seat akasha carries, which is the only reach there is" },
  ],
  helpNotes: [
    "the words stand in order, and one call names one act.",
    "a restart is asked and signalled in one motion: the ask alone is taken up by the next turn and comes to nothing.",
    "a supervisor takes the ask as it shuts down and re-execs in place, carrying the client it holds across.",
    "the session in the seat outlives the restart, which is the whole reason this is not a seat restart.",
    "a seat naming no supervisor still standing is reported and left alone.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What to act on is the first word and the act is the second.",
    },
    {
      invariantKind: "departure",
      statement: "The ask is written and the signal sent in one motion.",
    },
    {
      invariantKind: "departure",
      statement:
        "A supervisor is signalled only where the start time read now matches the one held.",
    },
    {
      invariantKind: "departure",
      statement: "A seat holding no readable process is reported rather than signalled.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose supervisor is gone is reported rather than signalled.",
    },
    {
      invariantKind: "departure",
      statement: "A signal that could not be sent is reported against the seat it was meant for.",
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
      invariantKind: "absence",
      statement: "Nothing here restarts a client.",
    },
  ],
} as const satisfies Command
