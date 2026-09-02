import type { Module } from "@akasha/code-system/module"

export const knowledgeRegisterStrings = {
  id: "01a0621c-5173-7987-89b7-b1202e2f7211",
  pageTypeSlug: "module",
  slug: "knowledge-register-strings",
  definition: "the text put where the game reads it, in the client's tongue",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tongue the library carries no text for falls back to English.",
    },
  ],
} as const satisfies Module
