import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commandDeclaring = {
  id: "01a06958-32a2-7c06-9b74-f48fe681a5bd",
  type: "module",
  slug: "command-declaring",
  definition: "the shapes a command and the dispatcher reaching it share",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A command declares the arguments the command takes rather than parsing the arguments.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One reader parses the declaration and one printer prints the declaration.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag carrying a value names the value and says what shape the value has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag with no value names no value label.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The words reaching a command and the code the command loads are one entry.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A command page has this declaration as data rather than as prose.",
    },
  ],
} as const satisfies Module
