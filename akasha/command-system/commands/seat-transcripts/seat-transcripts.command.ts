import type { Command } from "../command.page-type.ts"

export const seatTranscripts = {
  id: "01a06934-ff28-7819-ad05-c50a0471362c",
  pageTypeSlug: "command",
  slug: "seat-transcripts",
  definition: "the command saying where each seat's transcript file stands",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "it takes no word at all, and every word it is given is refused.",
    "it prints one JSON object carrying a `seats` list, and nothing else.",
    "each seat in that list carries its agent id, its seat name, and where its transcript stands.",
    "a seat is named by the index, so a seat kept only in akasha is answered here like any other.",
    "a transcript is read from the values kept beside a seat's page rather than from the page itself.",
    "a seat holding no transcript, or holding an empty one, is left out rather than answered with an empty path.",
    "the editor's agent tree and transcript panel read this, because the read reaches an uncommitted page body.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "It takes no word, and a word it is given is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The seats are named by the index rather than by a walk of a directory.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's transcript is read from the values kept beside that seat's page.",
    },
    {
      invariantKind: "departure",
      statement: "A seat holding no transcript is left out rather than answered an empty path.",
    },
    {
      invariantKind: "departure",
      statement: "A seat holding an empty transcript path is left out the same way.",
    },
    {
      invariantKind: "departure",
      statement: "Every seat is answered in one call rather than one seat at a time.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a transcript.",
    },
  ],
} as const satisfies Command
