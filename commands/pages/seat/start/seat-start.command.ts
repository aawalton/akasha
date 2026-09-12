import type { Command } from "akasha/commands/command.page-type.types.ts"

export const seatStart = {
  id: "01a0797a-9abe-7b18-818a-cf3e59985937",
  type: "command",
  slug: "seat-start",
  definition: "the command composing a fresh seat from the slots named after it",
  code: "ts",
  taking: [
    { said: "--prompt <text>", takes: "the first turn's prompt, which a headless start needs" },
    {
      said: "--persona <slug>",
      takes: "who this seat is, filling the role and the domain neither of which is said",
    },
    { said: "--role <slug>", takes: "what this seat does, outranking the persona's own role" },
    {
      said: "--domain <slug>",
      takes: "where this seat works, outranking the persona's own domain",
    },
    {
      said: "--principal <slug>",
      takes: "who this seat's output is for — a person, or `agent` for the fleet",
    },
    {
      said: "--flex <flex-n>",
      takes: "`flex-` and a number, which is what keeps it out of every vocabulary",
    },
    { said: "--initiative <slug>", takes: "the initiative this seat carries" },
    { said: "--account <account>", takes: "the claude account the seat is stamped with" },
    { said: "--model <id>", takes: "the model the seat launched here runs on" },
    { said: "--anthropic-base-url <url>", takes: "the base address the seat launched here calls" },
    {
      said: "--anthropic-auth-token <token>",
      takes: "the token the seat launched here signs in with",
    },
  ],
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
  ],
  name: "start",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/start-mode" },
    { argument: "argument/prompt-file" },
  ],
} as const satisfies Command
