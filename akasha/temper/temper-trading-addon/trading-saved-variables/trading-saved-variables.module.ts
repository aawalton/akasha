import type { Module } from "@akasha/code-system/module"

export const tradingSavedVariables = {
  id: "01a06160-2a5c-7b38-bdfd-3a991e050619",
  pageTypeSlug: "module",
  slug: "trading-saved-variables",
  definition: "what the listings add-on keeps between sessions, and how a session opens it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A guild entry is made on first touch rather than declared up front.",
    },
  ],
} as const satisfies Module
