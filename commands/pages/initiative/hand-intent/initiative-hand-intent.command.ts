import type { Command } from "akasha/commands/command.page-type.types.ts"

export const initiativeHandIntent = {
  id: "01a08c64-750b-7bb5-b491-551e9cca63dd",
  type: "command",
  slug: "initiative-hand-intent",
  definition: "the command handing one intent from the initiative stating it to another initiative",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<from>", takes: "the initiative stating the intent now" },
    { said: "<statement>", takes: "the statement the intent being handed over states" },
    { said: "<to>", takes: "the initiative taking the intent" },
  ],
  helpNotes: [
    "an intent is named by its statement, which is the label the work tree draws it under.",
    "the intent's working memory is handed over with the intent.",
    "the intent lands after the intents the initiative taking it already states.",
    "both pages are written by one change, so the intent is never held by neither.",
    "an initiative handing an intent to itself is refused.",
    "a run lands one commit and runs no check.",
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
      invariantKind: "absence",
      statement: "Nothing here asks Alan to confirm.",
    },
    {
      invariantKind: "absence",
      statement: "No check runs over the change a run lands.",
    },
  ],
} as const satisfies Command
