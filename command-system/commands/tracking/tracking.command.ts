import type { Command } from "../command.page-type.ts"

export const tracking = {
  id: "01a06057-f714-707b-acab-a560208ffcd3",
  pageTypeSlug: "command",
  slug: "tracking",
  definition: "the pages and row files of Alan's tracking, composed by a program and landed",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--file-path <path>", takes: "a path under the tracked trees to write" },
    { said: "--content-file <file>", takes: "the body that lands at the --file-path before it" },
    { said: "--remove <path>", takes: "a path under the tracked trees to take away" },
    { said: "--message <text>", takes: "what the commit is for" },
    { said: "--message-file <file>", takes: "a file the commit message is read from" },
  ],
  helpNotes: [
    "this command is for the tracking funnel, which composes a day, the rows beside it, and a food entry.",
    "the tracked trees are the wake days and the food entries, and a path outside them is refused, so nothing else in akasha is reachable here.",
    "the checks judge what this lands exactly as they judge a write.",
    "no reading is owed, because a program composed the body and no record says a program read.",
    "there is no glass to break: a body this refuses is a fault in the program that composed it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "No call names the kind of change landed here.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the tracked trees is refused.",
    },
    {
      invariantKind: "departure",
      statement: "What a call asks for is read and landed by `write`.",
    },
    {
      invariantKind: "departure",
      statement: "The kind named here runs no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "No reading is owed for a path landed here.",
    },
    {
      invariantKind: "departure",
      statement: "Every check that judges a write judges what lands here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here breaks the glass.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a path an agent chose.",
    },
  ],
} as const satisfies Command
