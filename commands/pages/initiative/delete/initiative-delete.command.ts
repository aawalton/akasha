import type { Command } from "akasha/commands/command.page-type.types.ts"

export const initiativeDelete = {
  id: "01a08c55-e316-7936-bc74-abba6173f7b7",
  type: "command",
  slug: "initiative-delete",
  definition: "the command taking one initiative's page away with the files beside that page",
  code: "ts",
  test: "ts",
  taking: [{ said: "<initiative>", takes: "the initiative being taken away" }],

  invariants: [
    {
      invariantKind: "departure",
      statement: "An initiative is named by the slug the initiative declares.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no initiative is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming other than one word is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Taking the page away is left to the mechanical change taking away a file.",
    },
    {
      invariantKind: "departure",
      statement: "The intents the initiative held go with the initiative's page.",
    },
    {
      invariantKind: "departure",
      statement: "The pages naming the initiative are read before the page goes.",
    },
    {
      invariantKind: "departure",
      statement: "Every page still naming the initiative is named in what a run says.",
    },
    {
      invariantKind: "departure",
      statement: "A run says under which property each of those pages names the initiative.",
    },
    {
      invariantKind: "departure",
      statement: "A run naming an initiative a seat is assigned is not refused for that seat.",
    },
    {
      invariantKind: "departure",
      statement: "A run says the index files those names until a refresh runs.",
    },
    {
      invariantKind: "departure",
      statement: "A run says the commit that run landed.",
    },
    {
      invariantKind: "absence",
      statement: "No run refreshes the index.",
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
      statement: "No check runs over what a run lands.",
    },
  ],
  name: "delete",
} as const satisfies Command
