import type { Module } from "../../code-system/module/module.page-type.ts"

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
      statement: "A command line carries several calls, and one refused call refuses the line.",
    },
    {
      invariantKind: "departure",
      statement: "Judging stops at the first refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A line carrying no call at all is refused for nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hook judging every call it cuts the same way binds this rather than spelling the loop.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here knows what a call is or why one would be refused. A hook hands in the calls it cut and the judgement it makes, and is handed back the one refusal or none.",
    },
  ],
} as const satisfies Module
