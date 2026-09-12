import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const changeArguing = {
  id: "01a08174-78c9-7fb4-91e3-ca3e56c1323c",
  type: "module",
  slug: "change-arguing",
  definition: "what a command under `akasha change` makes of the words on its command line",
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
    {
      invariantKind: "absence",
      statement: "No help flag reaches a command under `akasha change`, so none is answered here.",
    },
  ],
} as const satisfies Module
