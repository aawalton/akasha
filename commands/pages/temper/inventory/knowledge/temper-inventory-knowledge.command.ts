import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryKnowledge = {
  id: "01a0603c-c1d4-7896-b651-fa71ab764327",
  type: "command",
  slug: "temper-inventory-knowledge",
  definition: "the command giving back what each character knows of recipes, motifs and scripts",
  code: "ts",
  taking: [
    { said: "--char <id>", takes: "the one character reported" },
    {
      said: "--item-key <kind>:<args>",
      takes: "ask instead whether each character knows one recipe, motif or script",
    },
    {
      said: "--characters-path <path>",
      takes: "the saved-variables file the characters are read from",
    },
    { said: "--json", takes: "give the answer as JSON rather than as tab-separated rows" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An item key is `recipe:<resultItemId>`, `motif:<styleId>:<chapterId>` or `script:<scriptId>`.",
    },
    {
      invariantKind: "departure",
      statement: "A motif key's chapter is a whole number or the word `master`.",
    },
    {
      invariantKind: "departure",
      statement: "Naming an item key turns the answer into who knows that item.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming no kind this command has refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A character the capture does not hold refuses the call.",
    },
  ],
  name: "knowledge",
} as const satisfies Command
