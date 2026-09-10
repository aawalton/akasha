import type { Command } from "../../../command.page-type.types.ts"

export const initiativeMoveIntent = {
  id: "01a081e5-4603-78f0-8295-3ee2947edb01",
  pageTypeSlug: "command",
  type: "command",
  slug: "initiative-move-intent",
  definition:
    "the command carrying one intent onto the place another intent of its initiative holds",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<initiative>", takes: "the initiative whose intents are being ordered" },
    { said: "<statement>", takes: "the statement the intent being moved states" },
    { said: "<onto>", takes: "the statement the intent it is moved onto states" },
  ],
  helpNotes: [
    "an intent is named by its statement, which is the label the work tree draws it under.",
    "both intents are found in the page as the change lands, so no place is named here.",
    "the intent moved takes the place the intent moved onto holds.",
    "moving onto an intent above it puts it before that intent, and below it, after.",
    "the last place is reached by moving onto the last intent from above it.",
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
      statement: "An intent is named by the statement that intent states rather than by its place.",
    },
    {
      invariantKind: "departure",
      statement: "The place the intent is moved onto is named by the intent already holding it.",
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
      statement: "An intent moved onto one above it sits before that intent.",
    },
    {
      invariantKind: "departure",
      statement: "An intent moved onto one below it sits after that intent.",
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
      statement: "A statement of no text is refused, whichever intent it names.",
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
        "An intent moved onto one the page no longer states is refused rather than placed.",
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
