import type { Module } from "../../code-system/modules/module.page-type.ts"

export const exitCode = {
  id: "01a05c48-deeb-7015-8c70-41f6bb46fd62",
  pageTypeSlug: "module",
  slug: "exit-code",
  definition: "the code a command exits with, and the error types that carry one",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An error this module did not classify exits seventy.",
    },
    {
      invariantKind: "departure",
      statement: "A command exits with a code this module states.",
    },
    {
      invariantKind: "departure",
      statement: "A command wanting another exit declares its own at four or above.",
    },
    {
      invariantKind: "departure",
      statement: "A code this module states is never given a second meaning.",
    },
    {
      invariantKind: "departure",
      statement: "No command chooses seventy.",
    },
    {
      invariantKind: "departure",
      statement: "The catch above every command answers seventy.",
    },
  ],
} as const satisfies Module
