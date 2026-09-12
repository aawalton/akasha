import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimType = {
  id: "01a0685d-ceae-700f-89c3-712a8a6e7252",
  type: "command",
  slug: "mobile-sim-type",
  definition: "the command typing text into the simulator's webview",
  code: "ts",
  taking: [
    { said: "--text <text>", takes: "the text to type" },
    { said: "--text -", takes: "the text to type, read from what is piped in" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "An element named is tapped before anything is typed into that element.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no element types into the element already focused.",
    },
    {
      invariantKind: "departure",
      statement: "How many characters went in is the answer rather than the text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
  name: "type",
  arguments: [{ argument: "argument/selector" }],
} as const satisfies Command
