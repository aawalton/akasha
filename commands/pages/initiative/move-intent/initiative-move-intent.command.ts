import type { Command } from "../../../command.page-type.types.ts"

export const initiativeMoveIntent = {
  id: "01a081e5-4603-78f0-8295-3ee2947edb01",
  pageTypeSlug: "command",
  type: "command",
  slug: "initiative-move-intent",
  definition: "the command carrying one intent to another place in the initiative with it",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<initiative>", takes: "the initiative whose intents are being ordered" },
    { said: "<from>", takes: "the place the intent sits at now" },
    { said: "<to>", takes: "the place the intent is to sit at" },
  ],
  helpNotes: [
    "a place is counted from one, as the work tree keys an intent.",
    "the places count the intents the page states rather than the intents the panel drew.",
    "the order the page states is the order the panel draws, so this run orders the panel.",
    "a run lands one commit and runs no check.",
    "an initiative is named by the slug it declares rather than by the name of its file.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative is named by the slug the initiative declares.",
    },
    {
      invariantKind: "departure",
      statement: "A place is counted from one.",
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
      statement: "A word that is no place counted from one is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A place the page's intents do not reach is refused by the change rather than here.",
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
      invariantKind: "absence",
      statement: "Nothing here writes a body.",
    },
    {
      invariantKind: "absence",
      statement: "No check runs over what a run lands.",
    },
  ],
} as const satisfies Command
