import type { Module } from "@akasha/code-system/module"

export const commandDeclaring = {
  id: "01a06958-32a2-7c06-9b74-f48fe681a5bd",
  pageTypeSlug: "module",
  slug: "command-declaring",
  definition: "the shapes a command and the dispatcher reaching it share",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command declares what the command takes rather than parsing the arguments.",
    },
    {
      invariantKind: "departure",
      statement: "One reader parses the declaration and one printer prints the declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A flag carrying a value names the value and says what shape the value has.",
    },
    {
      invariantKind: "departure",
      statement: "A flag carrying no value names no value label.",
    },
    {
      invariantKind: "departure",
      statement: "The words reaching a command and the code the command loads are one entry.",
    },
    {
      invariantKind: "departure",
      statement: "A command document is one `ops-command` page read back out of the index.",
    },
    {
      invariantKind: "departure",
      statement: "A command document names the file the command runs.",
    },
    {
      invariantKind: "gap",
      statement: "A command page carries this declaration as data rather than as prose.",
    },
  ],
} as const satisfies Module
