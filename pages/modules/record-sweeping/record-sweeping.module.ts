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
      statement: "The page types swept are the ones declaring a property that states a window.",
    },
    {
      invariantKind: "departure",
      statement: "A page type declares such a property through what that page type extends too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property a file property group carries is swept under the group's slug and then its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pages a page type has is what the index answers rather than a folder listed.",
    },
    {
      invariantKind: "departure",
      statement: "A record file's path is composed out of its page's path and its section.",
    },
    {
      invariantKind: "departure",
      statement: "A stream is there where the file that path names is there.",
    },
    {
      invariantKind: "departure",
      statement: "A stream whose first part is gone is found by the part beside it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the path of every file the repository holds.",
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
      statement: "A part left holding nothing goes rather than being left empty.",
    },
    {
      invariantKind: "departure",
      statement: "The first part goes too where the window leaves no line at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "A writer appends to the highest part there is, and makes the first part again where none is.",
    },
    {
      invariantKind: "departure",
      statement: "A stream is swept under the turn its writer takes over that stream's first part.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stream is left as that stream is where a part of it is absent or will not read.",
    },
    {
      invariantKind: "gap",
      statement:
        "A stream whose first part alone is gone is swept by nothing while its writer still appends.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is taken away unless the sweep is asked to.",
    },
    {
      invariantKind: "departure",
      statement: "A stream whose turn does not come is left as that stream is and counted.",
    },
  ],
} as const satisfies Module
