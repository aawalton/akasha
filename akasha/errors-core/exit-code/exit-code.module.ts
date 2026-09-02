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
  ],
} as const satisfies Module
