import type { Command } from "akasha/commands/command.page-type.types.ts"

export const initiativeHandIntent = {
  id: "01a08c64-750b-7bb5-b491-551e9cca63dd",
  type: "command",
  slug: "initiative-hand-intent",
  definition: "the command handing one intent from the initiative stating it to another initiative",
  code: "ts",
  test: "ts",

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
      statement: "The intent's working memory is handed over with the intent.",
    },
    {
      invariantKind: "departure",
      statement:
        "The intent is put after the intents the initiative taking that intent already states.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming other than three words is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A statement of no text is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no initiative is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative handing an intent to itself is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A statement no intent of the initiative handing that intent states is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A statement more than one intent states is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A statement the initiative taking that intent already states is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Both pages are written by one change.",
    },
    {
      invariantKind: "departure",
      statement: "The two land together or neither lands.",
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
      statement: "Nothing here asks Alan to confirm.",
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
  name: "hand-intent",
  arguments: [
    { argument: "argument/from-initiative", required: true, saidAs: "word" },
    { argument: "argument/statement", required: true, saidAs: "word" },
    { argument: "argument/to-initiative", required: true, saidAs: "word" },
  ],
} as const satisfies Command
