import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatTranscriptList = {
  id: "01a06934-ff28-7819-ad05-c50a0471362c",
  type: "page-type/command",
  slug: "seat-transcript-list",
  definition: "the command saying where each seat's transcript file is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The answer is one JSON object carrying a `seats` list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat in that list carries its agent id, its seat name and where its transcript is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This command takes no word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word this command is given is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seats are named by the index rather than by a walk of a directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's transcript is read from the values kept beside that seat's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat record that would not be read is a fault of the data.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no transcript is left out rather than answered an empty path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with an empty transcript path is left out the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every seat is answered in one call rather than one seat at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The walk over the seats takes its reader as a parameter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The seats are read from the checkout the readers reach rather than from the root `given` names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One test arm calls the command itself rather than a seeded reader.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A module specifier that does not resolve fails that arm at import.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run writes nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a transcript.",
    },
  ],
  name: "transcript-list",
  arguments: [],
} as const satisfies Command
