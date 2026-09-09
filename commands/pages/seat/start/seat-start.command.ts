import type { Command } from "../../../command.page-type.ts"

export const seatStart = {
  id: "01a0797a-9abe-7b18-818a-cf3e59985937",
  pageTypeSlug: "command",
  slug: "seat-start",
  definition: "the command composing a fresh seat from the slots named after it",
  code: "ts",
  changeKind: "change-mechanical",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A start is given the slots a seat's name is composed from rather than a name.",
    },
    {
      invariantKind: "departure",
      statement: "The slots compose the name a fresh seat takes.",
    },
    {
      invariantKind: "departure",
      statement: "Every word said here is handed to the code unread.",
    },
    {
      invariantKind: "departure",
      statement: "A help flag is answered by the code rather than from this page.",
    },
    {
      invariantKind: "departure",
      statement: "The code a start runs is reached only once a start is read.",
    },
    {
      invariantKind: "departure",
      statement: "The output a start prints is written where the start runs.",
    },
    {
      invariantKind: "departure",
      statement: "A start prints the agent's id on the output stream.",
    },
  ],
} as const satisfies Command
