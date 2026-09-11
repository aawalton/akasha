import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const changeArguing = {
  id: "01a08174-78c9-7fb4-91e3-ca3e56c1323c",
  pageTypeSlug: "module",
  type: "module",
  slug: "change-arguing",
  definition: "whether a command under `akasha change` was named a word it takes none of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command under `akasha change` takes no word on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no word is answered with nothing to refuse.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming a word is refused by the first word that call named.",
    },
    {
      invariantKind: "departure",
      statement: "A word opening with a hyphen is refused as a flag rather than as a word.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the act the caller was making and the word that call named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what is piped in.",
    },
  ],
} as const satisfies Module
