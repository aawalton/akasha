import type { Module } from "@akasha/code-system/module"

export const chainRefusal = {
  id: "01a04f71-0570-763b-ac55-da9d9fca21da",
  pageTypeSlug: "module",
  slug: "chain-refusal",
  definition: "one refusal standing for the whole command line it was found in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command line carries several calls.",
    },
    {
      invariantKind: "departure",
      statement: "Judging stops at the first refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A line carrying no call of any kind is refused for nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hook judging every call it cuts the same way binds this module rather than spelling the loop.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a call is or why a call would be refused.",
    },
    {
      invariantKind: "absence",
      statement: "A hook hands in the calls the hook cut and the judgement the hook makes.",
    },
    {
      invariantKind: "absence",
      statement: "A hook is handed back the one refusal or none.",
    },
  ],
} as const satisfies Module
