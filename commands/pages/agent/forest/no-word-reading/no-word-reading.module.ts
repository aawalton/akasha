import type { Module } from "@akasha/code/module"

export const noWordReading = {
  id: "01a081e9-0f95-73af-911a-922ce68fb62c",
  pageTypeSlug: "module",
  type: "module",
  slug: "no-word-reading",
  definition: "the reading of a call by a command taking no word",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call saying no word is read as asked.",
    },
    {
      invariantKind: "departure",
      statement: "A word a call says is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every word a call says draws a refusal of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the word that drew that refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The refusals are answered in the order the call said those words.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here tells a flag from a name.",
    },
  ],
} as const satisfies Module
