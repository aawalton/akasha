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
      invariantKind: "departure",
      statement: "The help flag is answered rather than handed on to be refused as a word.",
    },
    {
      invariantKind: "departure",
      statement: "Both spellings of the help flag are answered.",
    },
    {
      invariantKind: "departure",
      statement: "The help flag is read as the first word of the call alone.",
    },
    {
      invariantKind: "departure",
      statement: "A help answer opens with the call that reached the command.",
    },
    {
      invariantKind: "departure",
      statement: "The lines under that call are handed in rather than written here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what is piped in.",
    },
  ],
} as const satisfies Module
