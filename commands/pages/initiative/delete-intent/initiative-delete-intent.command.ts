import type { Command } from "akasha/commands/command.page-type.types.ts"

export const initiativeDeleteIntent = {
  id: "01a08c4e-4825-7f65-b321-e81787848de8",
  type: "command",
  slug: "initiative-delete-intent",
  definition: "the command taking one intent out of the initiative stating that intent",
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
      statement: "A name that is no initiative is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming other than two words is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A statement of no text is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A statement the initiative's intents do not state is refused by the change rather than here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A statement more than one intent states is refused by the change rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "Taking the intent out is left to the mechanical change of that name.",
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
  name: "delete-intent",
  arguments: [
    { argument: "argument/initiative", required: true, saidAs: "word" },
    { argument: "argument/statement", required: true, saidAs: "word" },
  ],
} as const satisfies Command
