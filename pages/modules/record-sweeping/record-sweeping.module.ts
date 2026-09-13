import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const recordSweeping = {
  id: "01a09b2f-70d4-7d54-b9cf-7c956b1ce890",
  type: "module",
  slug: "record-sweeping",
  definition: "every line beside a page past the window its property states taken away",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The window swept by is the one the file property states rather than one here.",
    },
    {
      invariantKind: "departure",
      statement: "A property stating no window is reached by no sweep.",
    },
    {
      invariantKind: "departure",
      statement: "The streams are what the index answers rather than a folder listed.",
    },
    {
      invariantKind: "departure",
      statement: "The page a file belongs to is what the path index says names that file.",
    },
    {
      invariantKind: "departure",
      statement: "A line is judged by the instant that line states it ran at.",
    },
    {
      invariantKind: "departure",
      statement: "A line stating no instant this can read is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A line that will not read as json is kept.",
    },
    {
      invariantKind: "departure",
      statement: "The lines left are written again from the first part up.",
    },
    {
      invariantKind: "departure",
      statement: "A part left holding nothing goes and is unfiled from the path index.",
    },
    {
      invariantKind: "departure",
      statement: "The first part goes too where the window leaves no line at all.",
    },
    {
      invariantKind: "departure",
      statement: "A writer opens the first part again, so taking it away stops no recording.",
    },
    {
      invariantKind: "departure",
      statement: "A stream is swept under the turn its writer takes over that stream's first part.",
    },
    {
      invariantKind: "departure",
      statement: "A stream whose parts cannot all be read is left as that stream is.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is taken away unless the sweep is asked to.",
    },
  ],
} as const satisfies Module
