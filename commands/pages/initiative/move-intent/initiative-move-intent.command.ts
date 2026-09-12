import type { Command } from "akasha/commands/command.page-type.types.ts"

export const initiativeMoveIntent = {
  id: "01a081e5-4603-78f0-8295-3ee2947edb01",
  type: "command",
  slug: "initiative-move-intent",
  definition:
    "the command carrying one intent onto the place another intent of its initiative holds",
  code: "ts",
  test: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative is named by the slug the initiative declares.",
    },
    {
      invariantKind: "departure",
      statement: "An intent is named by the statement that intent states rather than by its place.",
    },
    {
      invariantKind: "departure",
      statement:
        "The place the intent is moved onto is named by the intent already holding that place.",
    },
    {
      invariantKind: "departure",
      statement: "Both places are read off the page as the change lands rather than named here.",
    },
    {
      invariantKind: "departure",
      statement: "The intent moved takes the place the intent moved onto holds.",
    },
    {
      invariantKind: "departure",
      statement: "An intent moved onto a higher intent sits before that intent.",
    },
    {
      invariantKind: "departure",
      statement: "An intent moved onto a lower intent sits after that intent.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no initiative is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming other than three words is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A statement of no text is refused whichever intent that statement names.",
    },
    {
      invariantKind: "departure",
      statement: "An intent moved onto itself is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A statement no intent of that initiative states is refused by the change rather than here.",
    },
    {
      invariantKind: "departure",
      statement:
        "An intent moved onto an intent the page no longer states is refused rather than placed.",
    },
    {
      invariantKind: "departure",
      statement: "Carrying the intent is left to the mechanical change with one value.",
    },
    {
      invariantKind: "departure",
      statement: "A run says the commit that run landed.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A change that refused is a fault of the data.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a body.",
    },
    {
      invariantKind: "absence",
      statement: "No check runs over the change a run lands.",
    },
    {
      invariantKind: "departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "move-intent",
  arguments: [
    { argument: "argument/initiative", required: true, saidAs: "word" },
    { argument: "argument/statement", required: true, saidAs: "word" },
    { argument: "argument/onto", required: true, saidAs: "word" },
  ],
} as const satisfies Command
