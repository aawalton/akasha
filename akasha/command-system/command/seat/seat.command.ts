import type { Command } from "../command.page-type.ts"

export const seat = {
  id: "01a0598f-192d-7685-a97f-09ad82181a61",
  pageTypeSlug: "command",
  slug: "seat",
  definition: "the command acting on the seats akasha carries and what runs them",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "supervisor", takes: "what to act on, which is the process running a seat" },
    {
      said: "restart",
      takes: "the act, which is to restart that process onto the code standing now",
    },
    { said: "--all", takes: "every seat akasha carries, which is the only reach a restart has" },
    { said: "stop", takes: "the act, which is to end that process and take the page it held" },
    { said: "<name>", takes: "the seat to stop, named as its page is named" },
    { said: "--force", takes: "stop it though subagents are working, ending them with it" },
  ],
  helpNotes: [
    "the words stand in order, and one call names one act.",
    "a restart is asked and signalled in one motion: the ask alone is taken up by the next turn and comes to nothing.",
    "a supervisor takes the ask as it shuts down and re-execs in place, carrying the client it holds across.",
    "the session in the seat outlives the restart, which is the whole reason this is not a seat restart.",
    "a seat naming no supervisor still standing is reported and left alone.",
    "a stop names one seat, where a restart reaches every one of them.",
    "a stop ends what the seat dispatched before it ends the seat, so nothing is left orphaned.",
    "a name no seat holds a page for answers as a data refusal, which a caller can tell from a misspelling.",
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
      statement: "A restart reaches every seat and a stop reaches one seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name no seat holds a page for is answered apart from a word this command does not take.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag standing where the seat should be named is refused rather than read as a name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here restarts a client.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here stops a seat by anything but the name its page carries.",
    },
  ],
} as const satisfies Command
