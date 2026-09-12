import type { Command } from "akasha/commands/command.page-type.types.ts"

export const seatStart = {
  id: "01a0797a-9abe-7b18-818a-cf3e59985937",
  type: "command",
  slug: "seat-start",
  definition: "the command composing a fresh seat from the slots named after it",
  code: "ts",
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
      statement: "Every word said here but the help flag is handed to the code unread.",
    },
    {
      invariantKind: "departure",
      statement: "A help flag is answered from this page rather than by the code.",
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
    {
      invariantKind: "departure",
      statement: "A start refused after it bound the name names each write it finished.",
    },
    {
      invariantKind: "departure",
      statement: "A start refused before it wrote anything is refused as the fault alone.",
    },
    {
      invariantKind: "departure",
      statement: "A headless start naming no prompt and no prompt file is refused.",
    },
  ],
  name: "start",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/start-mode" },
    { argument: "argument/prompt-file" },
    { argument: "argument/seat-prompt" },
    { argument: "argument/persona" },
    { argument: "argument/role" },
    { argument: "argument/seat-domain" },
    { argument: "argument/principal" },
    { argument: "argument/flex" },
    { argument: "argument/initiative" },
    { argument: "argument/account" },
    { argument: "argument/seat-model" },
    { argument: "argument/anthropic-base-url" },
    { argument: "argument/anthropic-auth-token" },
  ],
} as const satisfies Command
