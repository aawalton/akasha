import type { Module } from "@akasha/code/module"

export const changeArguing = {
  id: "01a08174-78c9-7fb4-91e3-ca3e56c1323c",
  pageTypeSlug: "module",
  type: "module",
  slug: "change-arguing",
  definition: "the words a command under `akasha change` takes on the command line",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is named as a bare word rather than as the value of a flag.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no subagent is answered with no name rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming more than one word is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag where the subagent would be is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the act the caller was making.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here looks for the subagent named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what is piped in.",
    },
  ],
} as const satisfies Module
