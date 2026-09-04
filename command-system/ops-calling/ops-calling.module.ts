import type { Module } from "@akasha/code-system/module"

export const opsCalling = {
  id: "01a0697b-37f7-7000-a1fa-9526b1a392cc",
  pageTypeSlug: "module",
  slug: "ops-calling",
  definition: "the words after `ops` answered by the file the page for them names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commands are the `ops-command` pages.",
    },
    {
      invariantKind: "departure",
      statement: "The words a command carries are the page's own.",
    },
    {
      invariantKind: "departure",
      statement: "The file a command runs is the one its page names.",
    },
    {
      invariantKind: "departure",
      statement: "A file declaring a default export runs in the dispatcher's own process.",
    },
    {
      invariantKind: "departure",
      statement: "A file declaring no default export is run as a child inheriting the streams.",
    },
    {
      invariantKind: "departure",
      statement: "Which of the two a file is is read off its text rather than by importing it.",
    },
    {
      invariantKind: "departure",
      statement: "A child's exit code is passed back unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "What a command running here throws says which kind of thing went wrong.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming a file that is not there is answered by naming that file.",
    },
    {
      invariantKind: "departure",
      statement: "A write to a consumer that has closed is let go rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is out on the error stream before the exit code ends the process.",
    },
    {
      invariantKind: "departure",
      statement: "The listing and the help are composed apart from what runs a command.",
    },
    {
      invariantKind: "departure",
      statement: "What runs a command is handed in rather than reached from the command.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is scanned for a command.",
    },
    {
      invariantKind: "departure",
      statement: "What a command writes reaches the dispatcher's own stream with nothing between.",
    },
    {
      invariantKind: "absence",
      statement: "No child stands between a command's writing and the consumer.",
    },
    {
      invariantKind: "absence",
      statement: "No pipe carries a command's writing to the consumer.",
    },
    {
      invariantKind: "absence",
      statement: "No copy of that writing is taken on the way.",
    },
    {
      invariantKind: "constraint",
      statement: "A live service builds the words `seat resume`.",
    },
    {
      invariantKind: "constraint",
      statement: "Misrouting `seat resume` costs a seat.",
    },
    {
      invariantKind: "gap",
      statement: "The code an ops command runs is in akasha.",
    },
  ],
} as const satisfies Module
