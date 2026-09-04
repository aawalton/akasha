import type { Module } from "../../code-system/modules/module.page-type.ts"

export const runSync = {
  id: "01a05c22-7bc9-7007-bae2-cd4e94fd6035",
  pageTypeSlug: "module",
  slug: "run-sync",
  definition: "what a command line says a sync is to do",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source named on the command line narrows the sync to that one source.",
    },
    {
      invariantKind: "absence",
      statement: "Importing the module starts nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A sync that fails leaves a status the runner reads as failure.",
    },
  ],
} as const satisfies Module
