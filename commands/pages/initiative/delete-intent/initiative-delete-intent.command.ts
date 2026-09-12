import type { Command } from "akasha/commands/command.page-type.types.ts"

export const initiativeDeleteIntent = {
  id: "01a08c4e-4825-7f65-b321-e81787848de8",
  type: "command",
  slug: "initiative-delete-intent",
  definition: "the command taking one intent out of the initiative stating that intent",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<initiative>", takes: "the initiative stating the intent" },
    { said: "<statement>", takes: "the statement the intent being taken out states" },
  ],

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
  ],
} as const satisfies Command
