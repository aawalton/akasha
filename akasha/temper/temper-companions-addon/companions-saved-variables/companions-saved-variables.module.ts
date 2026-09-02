import type { Module } from "@akasha/code-system/module"

export const companionsSavedVariables = {
  id: "01a0611d-84df-7d7e-8754-8460553e63d0",
  pageTypeSlug: "module",
  slug: "companions-saved-variables",
  definition: "what the companion add-on keeps between sessions, and how a session opens it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A companion entry is made on first touch rather than declared up front.",
    },
  ],
} as const satisfies Module
